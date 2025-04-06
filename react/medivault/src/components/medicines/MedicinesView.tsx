import React, { useState } from 'react'
import Aside from '../dashboard/Aside'
import '../../styles/dashboard/dashboard.css'
import HorizontalNavBar from '../dashboard/HoriantalNavBar'
import MedicinesTableProvider from '../medicines/MedicinesTableProvider'
import MedicinePopupForm from './MedicineOpenForm'

export default function MedicinesView() {

    const [isMedicinePopupOpen, setIsMedicinePopupOpen] = useState(false);

    const handleOpenPopup = () => setIsMedicinePopupOpen(true);
    const handleClosePopup = () => setIsMedicinePopupOpen(false);
    return (
        <div className='Dashboard'>
            <HorizontalNavBar />
            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    <button className='formButton' onClick={handleOpenPopup}>Add Medicine Details</button>
                    {isMedicinePopupOpen && <MedicinePopupForm onClose={handleClosePopup} />}
                    <MedicinesTableProvider />
                </div>
            </div>
        </div>
    )
}
