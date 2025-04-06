import React, { useState } from 'react'
import Aside from '../dashboard/Aside'
import '../../styles/dashboard/dashboard.css'
import HorizontalNavBar from '../dashboard/HoriantalNavBar'
import OrdersTableProvider from '../orders/OrdersTableProvider'
import OrderPopupForm from './OrderOpenForm'

export default function OrdersView() {

    const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

    const handleOrderOpenPopup = () => setIsOrderPopupOpen(true);
    const handleOrderClosePopup = () => setIsOrderPopupOpen(false);

    return (
        <div className='Dashboard'>
            <HorizontalNavBar />
            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    <button className='formButton' onClick={handleOrderOpenPopup}>Create Order</button>
                    {isOrderPopupOpen && <OrderPopupForm onClose={handleOrderClosePopup} />}
                    <OrdersTableProvider />
                </div>
            </div>
        </div>
    )
}
