import { useState } from 'react';
import Aside from '../dashboard/Aside';
import '../../styles/dashboard/dashboard.css';
import HorizontalNavBar from '../dashboard/HoriantalNavBar';
import CustomerTableProvider from './CustomersTableProvider';
import CustomerOpenForm from './CustomerOpenForm'; // Import the new component

export default function CustomersView() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    return (
        <div className='Dashboard'>
            <HorizontalNavBar />
            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    <button className='formButton' onClick={handleOpenPopup}> Add Customer Details</button>
                    {isPopupOpen && <CustomerOpenForm onClose={handleClosePopup} />}
                    <CustomerTableProvider />
                </div>
            </div>
        </div>
    );
}
