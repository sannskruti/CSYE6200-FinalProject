import React, { useState } from 'react'
import '../../styles/login/LoginPage.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export interface UserDetails {
    data: {
        id: string,
        token: string
    }
    message: string,
    date: Date
}

export default function LoginPage() {

    const [username, setusername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();  // Initialize the navigate function

    const navigateToSingnUp = () => {
        navigate('/signup')
    }


    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission

        // Validate form data
        if (!username || !password) {
            setError('Please fill in both fields.');
            toast.error('Please fill in both fields.'); // Show toast for missing fields
            return;
        }

        const userData = {
            username,
            password,
        };

        setLoading(true); // Start loading

        try {
            // Send POST request to the API
            const response = await fetch('http://localhost:9999/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data: UserDetails = await response.json();
            console.log(data.data.token);

            console.log(data?.data.id);
            localStorage.setItem('userHashId', data?.data?.id);
            localStorage.setItem('token', data?.data?.token);


            if (response.ok) {
                // Handle successful login
                toast.success('Login successful!');
                // const successResponse: UserDetails = data;
                localStorage.setItem("userId", data?.data?.id);
                navigate('/dashboard/customers')
            } else {
                // Handle login failure
                toast.error(data.message || 'Login failed. Please try again.');
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            setError('An error occurred. Please try again later.');
            console.error('Error during API call:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='loginPage'>
            <div className='left'>
                <div>MEDI-VAULT</div>
                <div><img src="..\src\assets\images\pharmaImage.jpg" alt="aaa" /></div>
            </div>
            <div className='right'>
                <form onSubmit={handleSubmit}>
                    <div className='signIn'>LOG IN </div>
                    <div className='loginCredentials'>
                        <label htmlFor="username">Email</label>
                        <input type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            required />
                    </div>
                    <div className='loginCredentials'>
                        <label htmlFor="Password">Password</label>
                        <input type="password"
                            id="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    {/* <input type="submit" /> */}
                    <button type='submit' className='btn'>Log in</button>
                    <p> New user? <a onClick={navigateToSingnUp}>SIGNUP</a></p>
                </form>
            </div>
        </div>
    )
}
