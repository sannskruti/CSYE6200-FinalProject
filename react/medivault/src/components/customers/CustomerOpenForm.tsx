// import React, { useState } from 'react';
import "../../styles/dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomerModel } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CustomerPopupForm({ onClose }: any) {
  const navigate = useNavigate(); // Initialize the navigate function
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors },
  } = useForm<CustomerModel>();

  const onSubmit: SubmitHandler<CustomerModel> = async (data) => {
    const userId: any = localStorage.getItem("userHashId");
    try {
      const response = await fetch("http://localhost:9999/customer", {
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
        toast.success("Customer created successfully");
      } else {
        console.log(updatedResponse?.message);
        toast.error("Customer Creation failed. Please try again.");
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
    navigate("/dashboard/customers"); // Navigate back to the dashboard after closing the popup
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button className="closebutton" onClick={closePopup}>
            X
          </button>
          <input
            placeholder="Full Name"
            {...register("name", {
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Invalid input",
              },
            })}
          />
          {errors?.name && <p className='form-errors'>{errors.name.message}</p>}


          <input placeholder="City" {...register("city", {
            required: "City is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Invalid input",
            },
          })} />
          {errors?.city && <p className='form-errors'>{errors.city.message}</p>}

          <input placeholder="Address" {...register("address", {
            required: "Address is required",
            pattern: {
              value: /^[A-Za-z0-9\s,.-]+$/,
              message: "Invalid input",
            },
          })} />
          {errors?.address && <p className='form-errors'>{errors.address.message}</p>}

          <input placeholder="Phone Number" {...register("phoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Invalid input",
            },
            maxLength: {
              value: 10,
              message: "Invalid input"
            }
          })} />
          {errors?.phoneNumber && <p className='form-errors'>{errors.phoneNumber.message}</p>}
          <input type="submit" className="btn" />
        </form>
      </div>
    </div>
  );
}
