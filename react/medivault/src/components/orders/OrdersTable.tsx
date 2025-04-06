import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import '../../styles/tables/Tables.css'
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
        setLoading(true); // Start loading
        try {
            // Send GET request to the API
            const response = await fetch("http://localhost:9999/orders", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userhashid': userId,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data: any = await response.json();
            setData(data?.data)
            console.log(data?.data);



            if (response.ok) {
                if (!toastShown.current) {
                    // Handle successful
                    toast.success('Orders fetched successfully');
                    toastShown.current = true
                }

            } else {
                if (!toastShown.current) {
                    // Handle login failure
                    toast.error(data.message || 'Fetch failed. Please try again.');
                    setError(data.message || 'Fetch failed. Please try again.');
                    toastShown.current = true
                }
            }
        } catch (error) {
            if (!toastShown) {
                toast.error('An error occurred. Please try again later.');
                setError('An error occurred. Please try again later.');
                console.error('Error during API call:', error);
            }
        } finally {
            if (!toastShown) {
                setLoading(false);
            } // Stop loading
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const columns = useMemo<MRT_ColumnDef<OrdersListModel>[]>(
        () => [
            {
                accessorKey: 'customers.0.name',
                header: 'Customer Name',
                filterVariant: 'text',
                // filterSelectOptions: "text", //custom options list (as opposed to faceted list) 
            },
            {
                accessorKey: 'customers.0.phoneNumber',
                header: 'Customer Mobile',
                filterVariant: 'text', // default
                size: 200,
            },
            {
                accessorFn(originalRow) {
                    const date = new Date(originalRow.createdDate);
                    const formattedDate = date.toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })
                    const formattedTime = date.toLocaleTimeString("en-GB", {
                        timeStyle: "medium",
                        hour12: true,  // Use 24-hour format, set to true for 12-hour format with AM/PM
                    });
                    return (
                        <div>
                            {formattedDate} <br />
                            {formattedTime}
                        </div>
                    )
                },
                id: 'createdDate',
                header: 'Created Time',
                // filterVariant: 'datetime-range'
            },
            {
                accessorKey: 'orderTotal',
                header: 'Order Total',
                filterVariant: 'text', // default
                size: 200,
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
                filterVariant: 'text', // default
                size: 200,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: { showColumnFilters: true },
        enablePagination: false,
    });

    return <>
        <MaterialReactTable table={table} />
    </>;
};

export default OrdersTable;
