
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MedicinesTable from './MedicinesTable';

const MedicinesTableProvider = () => (
    //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MedicinesTable />
    </LocalizationProvider>
);

export default MedicinesTableProvider;