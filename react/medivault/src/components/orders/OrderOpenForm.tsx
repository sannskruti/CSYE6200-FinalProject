import React, { useState } from 'react';
import '../../styles/dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateOrderType } from '../../types/types';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function OrderPopupForm({ onClose }: any) {

    const navigate = useNavigate();  // Initialize the navigate function


    const {
        register,
        handleSubmit,
        // watch,
        // reset,
        formState: { errors },
    } = useForm<CreateOrderType>();


    console.log("errors", errors);




    const onSubmit: SubmitHandler<CreateOrderType> = async (data) => {
        const userId: any = localStorage.getItem('userHashId');
        try {
            const response = await fetch('http://localhost:9999/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'userHashId': userId,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const updatedResponse: any = await response.json();

            if (updatedResponse?.status === 'SUCCESS') {
                toast.success('Order created successfully');
            }
            else {
                console.log(updatedResponse?.message);
                toast.error('Order Creation failed');
            }
        }
        catch (error) {
            console.log(error);
            toast.error("SOMETHING WENT WRONG")
        }
        finally {
            onClose();
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
        // window.location.reload();
    }

    const closePopup = () => {
        onClose();
        navigate("/dashboard/orders"); // Navigate back to the dashboard after closing the popup
    };

    return (
        <div className='popup'>
            <div className='popup-content'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <button className="closebutton" onClick={closePopup}>
                        X
                    </button>
                    <input placeholder='Customer Mobile'  {...register("customerMobileNumber", {
                        required: {
                            value: true,
                            message: "Customer Mobile cannot be empty"
                        }
                    })} />
                    {errors?.customerMobileNumber && <p className='form-errors'>{errors.customerMobileNumber.message}</p>}

                    <input placeholder='Medicine Name' {...register("medicineName", {
                        required: {
                            value: true,
                            message: "Medicine Name should not be empty"
                        }
                    })} />
                    {errors?.medicineName && <p className='form-errors'>{errors.medicineName.message}</p>}


                    <input placeholder='Medicine Quantity' type='number' {...register("quantity", {
                        required: {
                            value: true,
                            message: "Quantity should not be empty"
                        }
                    })} />
                    {errors?.quantity && <p className='form-errors'>{errors?.quantity?.message}</p>}
                    <input type="submit" className="btn" />
                </form>
            </div>
        </div>
    );
}
