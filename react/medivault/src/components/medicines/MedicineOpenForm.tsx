import React, { useState } from "react";
import "../../styles/dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomerModel, MedicineListModel } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MedicinePopupForm({ onClose }: any) {
  const navigate = useNavigate(); // Initialize the navigate function

  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors },
  } = useForm<MedicineListModel>();

  const onSubmit: SubmitHandler<MedicineListModel> = async (data) => {
    const userId: any = localStorage.getItem("userHashId");
    try {
      const response = await fetch("http://localhost:9999/medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userHashId: userId,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const updatedResponse: any = await response.json();

      if (updatedResponse?.status === "SUCCESS") {
        toast.success("Medicine created successfully");
      } else {
        console.log(updatedResponse?.message);
        toast.error("Medicine Creation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("SOMETHING WENT WRONG");
    } finally {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  const closePopup = () => {
    onClose();
    navigate("/dashboard/medicines"); // Navigate back to the dashboard after closing the popup
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button className="closebutton" onClick={closePopup}>
            X
          </button>
          <input placeholder="Medicine Name" {...register("name", {
            required: "Medicine name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Invalid input",
            },
          })} />
          {errors?.name && <p className='form-errors'>{errors.name.message}</p>}

          <input placeholder="Medicine Content" {...register("content", {
            required: "Medicine Content is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Invalid input",
            },
          })} />
          {errors?.content && <p className='form-errors'>{errors.content.message}</p>}

          <input placeholder="Price" type="number" {...register("price", {
            required: "Price is required",
            min: {
              value: 1,
              message: "Invalid input",
            },
          })} />
          {errors?.price && <p className='form-errors'>{errors.price.message}</p>}
          <input type="submit" className="btn" />
        </form>
      </div>
    </div>
  );
}
