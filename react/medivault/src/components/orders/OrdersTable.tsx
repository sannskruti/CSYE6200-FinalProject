import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import '../../styles/tables/Tables.css';
import { toast } from 'react-toastify';
import { OrdersListModel } from '../../types/types';

export const OrdersTable = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const toastShown = useRef<boolean>(false);

    const userId: any = localStorage.getItem('userId');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:9999/orders", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userhashid': userId,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result: any = await response.json();
            setData(result?.data);
            console.log(result?.data);

            if (response.ok && !toastShown.current) {
                toast.success('Orders fetched successfully');
                toastShown.current = true;
            } else if (!response.ok && !toastShown.current) {
                toast.error(result.message || 'Fetch failed. Please try again.');
                setError(result.message || 'Fetch failed. Please try again.');
                toastShown.current = true;
            }

        } catch (error) {
            if (!toastShown.current) {
                toast.error('An error occurred. Please try again later.');
                setError('An error occurred. Please try again later.');
                console.error('Error during API call:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const columns = useMemo<MRT_ColumnDef<OrdersListModel>[]>(() => [
        {
            accessorKey: 'customers.0.name',
            header: 'Customer Name',
            filterVariant: 'text',
        },
        {
            accessorKey: 'customers.0.phoneNumber',
            header: 'Customer Mobile',
            filterVariant: 'text',
            size: 200,
        },
        {
            accessorKey: 'cars.0.brand',
            header: 'Car Brand',
            filterVariant: 'text',
        },
        {
            accessorKey: 'cars.0.model',
            header: 'Car Model',
            filterVariant: 'text',
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            filterVariant: 'text',
        },
        {
            accessorKey: 'orderTotal',
            header: 'Order Total',
            filterVariant: 'text',
        },
        {
            accessorFn: (originalRow) => {
                const date = new Date(originalRow.createdDate);
                const formattedDate = date.toLocaleDateString("en-GB", {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });
                const formattedTime = date.toLocaleTimeString("en-GB", {
                    timeStyle: "medium",
                    hour12: true,
                });
                return (
                    <div>
                        {formattedDate} <br />
                        {formattedTime}
                    </div>
                );
            },
            id: 'createdDate',
            header: 'Created Time',
        },
    ], []);

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

export default OrdersTable;
