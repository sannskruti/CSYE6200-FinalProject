import { ToastContainer } from 'react-toastify';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/login/SignupPage';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarsView from './components/medicines/CarsView'; // renamed MedicinesView to CarsView
import CustomersView from './components/customers/CustomersView';
import OrdersView from './components/orders/OrdersView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard/cars" element={<CarsView />} />
        <Route path="/dashboard/customers" element={<CustomersView />} />
        <Route path="/dashboard/orders" element={<OrdersView />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeButton={true}
        className="Toastify__toast-container"
      />
    </Router>
  );
}

export default App;
