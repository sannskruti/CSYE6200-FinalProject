import { useState } from 'react';
import Aside from '../dashboard/Aside';
import '../../styles/dashboard/dashboard.css';
import HorizontalNavBar from '../dashboard/HoriantalNavBar';
import CarsTableProvider from './CarsTableProvider';
import CarPopupForm from './CarPopupForm';

export default function CarsView() {
  const [isCarPopupOpen, setIsCarPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsCarPopupOpen(true);
  const handleClosePopup = () => setIsCarPopupOpen(false);

  return (
    <div className='Dashboard'>
      <HorizontalNavBar />
      <div className='content'>
        <Aside />
        <div className='MainContent'>
          <button className='formButton' onClick={handleOpenPopup}>
            Add Car Details
          </button>
          {isCarPopupOpen && <CarPopupForm onClose={handleClosePopup} />}
          <CarsTableProvider />
        </div>
      </div>
    </div>
  );
}
