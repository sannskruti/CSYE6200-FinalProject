import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import OrdersTable from './OrdersTable';

const OrdersTableProvider = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <OrdersTable />
    </LocalizationProvider>
);

export default OrdersTableProvider;
