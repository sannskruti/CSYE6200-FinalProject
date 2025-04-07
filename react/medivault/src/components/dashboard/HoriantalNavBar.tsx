// import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HorizontalNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      navigate('/');
      toast.success("Logged out successfully");
    } catch (err) {
      console.log(err);
      toast.error("SOMETHING WENT WRONG");
    }
  };

  return (
    <div className="NavigationBar">
      <img src="../src/assets/images/carwiseLogo.jpg" alt="CarWise Logo" />
      <h1 className="nav-title">CarWise</h1>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default HorizontalNavBar;
