import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CarsTable from './CarsTable';

const CarsTableProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CarsTable />
  </LocalizationProvider>
);

export default CarsTableProvider;
