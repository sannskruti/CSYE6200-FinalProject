// import React from "react";
import "../../styles/dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

interface CarFormModel {
  brand: string;
  model: string;
  year: number;
  color: string;
  fuelType: string;
  mileage: number;
  price: number;
  description?: string;
  isUsed: boolean;
  available: boolean;
  engineType: string;
  seatingCapacity: number;
  location: string;
  imageUrl?: string;
}

export default function CarPopupForm({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormModel>();

  const onSubmit: SubmitHandler<CarFormModel> = async (data) => {
    const userId = localStorage.getItem("userHashId");

    try {
      const response = await fetch("http://localhost:9999/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userHashId: userId ?? '',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const updatedResponse = await response.json();

      if (updatedResponse?.status === "SUCCESS") {
        toast.success("Car added successfully");
      } else {
        console.log(updatedResponse?.message);
        toast.error("Car creation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("SOMETHING WENT WRONG");
    } finally {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const closePopup = () => {
    onClose();
    navigate("/dashboard/cars");
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button className="closebutton" onClick={closePopup}>
            X
          </button>

          <input placeholder="Brand" {...register("brand", { required: "Brand is required" })} />
          {errors?.brand && <p className="form-errors">{errors.brand.message}</p>}

          <input placeholder="Model" {...register("model", { required: "Model is required" })} />
          {errors?.model && <p className="form-errors">{errors.model.message}</p>}

          <input type="number" placeholder="Year" {...register("year", { min: 1886, required: "Year is required" })} />
          {errors?.year && <p className="form-errors">{errors.year.message}</p>}

          <input placeholder="Color" {...register("color", { required: "Color is required" })} />
          {errors?.color && <p className="form-errors">{errors.color.message}</p>}

          <input placeholder="Fuel Type" {...register("fuelType", { required: "Fuel type is required" })} />
          {errors?.fuelType && <p className="form-errors">{errors.fuelType.message}</p>}

          <input type="number" placeholder="Mileage" {...register("mileage", { min: 0, required: "Mileage is required" })} />
          {errors?.mileage && <p className="form-errors">{errors.mileage.message}</p>}

          <input type="number" placeholder="Price" {...register("price", { min: 1, required: "Price is required" })} />
          {errors?.price && <p className="form-errors">{errors.price.message}</p>}

          <input placeholder="Description" {...register("description")} />

          <input placeholder="Engine Type" {...register("engineType", { required: "Engine type is required" })} />
          {errors?.engineType && <p className="form-errors">{errors.engineType.message}</p>}

          <input type="number" placeholder="Seating Capacity" {...register("seatingCapacity", { min: 1, required: "Seating capacity is required" })} />
          {errors?.seatingCapacity && <p className="form-errors">{errors.seatingCapacity.message}</p>}

          <input placeholder="Location" {...register("location", { required: "Location is required" })} />
          {errors?.location && <p className="form-errors">{errors.location.message}</p>}

          <input placeholder="Image URL" {...register("imageUrl")} />

          <label>
            <input type="checkbox" {...register("isUsed")} /> Used?
          </label>

          <label>
            <input type="checkbox" {...register("available")} defaultChecked /> Available?
          </label>

          <input type="submit" className="btn" />
        </form>
      </div>
    </div>
  );
}
