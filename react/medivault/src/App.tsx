import { ToastContainer } from 'react-toastify'
import LoginPage from './components/login/LoginPage'
import SignUpPage from './components/login/SignupPage'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicinesView from './components/medicines/MedicinesView';
import CustomersView from './components/customers/CustomersView';
import OrdersView from './components/orders/OrdersView';


function App() {

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" index element={<LoginPage />} />
        <Route path="/dashboard/medicines" index element={<MedicinesView />} />
        <Route path="/dashboard/customers" index element={<CustomersView />} />
        <Route path="/dashboard/orders" index element={<OrdersView />} />
        <Route path="/signup" index element={<SignUpPage />} />
      </Routes>

      {/* Toast container is rendered globally to show toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeButton={true}
        className="Toastify__toast-container"  // Custom class to style it
      />
    </Router>
  )
}

export default App
