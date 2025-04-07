import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import '../../styles/tables/Tables.css';
import { toast } from 'react-toastify';

interface CarModel {
    brand: string;
    model: string;
    year: number;
    color: string;
    fuelType: string;
    mileage: number;
    price: number;
    description?: string;
    isUsed: boolean;
    available: boolean;
    engineType: string;
    seatingCapacity: number;
    location: string;
    imageUrl?: string;
    createdDate: string;
    users: { name: string }[];
}

export const CarsTable = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<CarModel[]>([]);

    const toastShown = useRef<boolean>(false);
    const userId: string | null = localStorage.getItem('userId');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:9999/cars", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    userhashid: userId ?? '',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const resData = await response.json();
            setData(resData?.data || []);
            console.log(resData?.data);

            if (response.ok && !toastShown.current) {
                toast.success('Cars fetched successfully');
                toastShown.current = true;
            } else if (!response.ok && !toastShown.current) {
                toast.error(resData.message || 'Fetch failed. Please try again.');
                setError(resData.message || 'Fetch failed. Please try again.');
                toastShown.current = true;
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            setError('An error occurred. Please try again later.');
            console.error('Error during API call:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const columns = useMemo<MRT_ColumnDef<CarModel>[]>(
        () => [
            { accessorKey: 'brand', header: 'Brand', filterVariant: 'text' },
            { accessorKey: 'model', header: 'Model', filterVariant: 'text' },
            { accessorKey: 'year', header: 'Year' },
            { accessorKey: 'fuelType', header: 'Fuel Type' },
            { accessorKey: 'price', header: 'Price ($)' },
            { accessorKey: 'engineType', header: 'Engine Type' },
            { accessorKey: 'seatingCapacity', header: 'Seats' },
            { accessorKey: 'color', header: 'Color' },
            { accessorKey: 'location', header: 'Location' },
            {
                accessorFn: (originalRow) => {
                    const date = new Date(originalRow.createdDate);
                    return (
                        <div>
                            {date.toLocaleDateString("en-GB")}<br />
                            {date.toLocaleTimeString("en-GB", { hour12: true })}
                        </div>
                    );
                },
                id: 'createdDate',
                header: 'Created At',
            },
            {
                accessorKey: 'users.0.name',
                header: 'Owner',
                filterVariant: 'text',
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: { showColumnFilters: true },
        enablePagination: false,
    });

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    );
};

export default CarsTable;
