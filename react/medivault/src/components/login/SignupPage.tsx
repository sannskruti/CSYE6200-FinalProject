import React, { useState } from 'react';
import '../../styles/login/LoginPage.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export interface UserDetails {
  data: {
    id: string;
    token: string;
  };
  message: string;
  date: Date;
}

export default function SignupPage() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }

    const userData = { name, email, password };
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9999/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data: UserDetails = await response.json();

      if (response.ok) {
        localStorage.setItem('userHashId', data?.data?.id);
        localStorage.setItem('token', data?.data?.token);
        localStorage.setItem('userId', data?.data?.id);
        toast.success('Registered successfully!');
        navigate('/');
      } else {
        toast.error(data.message || 'Signup failed. Please try again.');
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginPage'>
      <div className='left'>
        <div className='brand-name'>CARWISE</div>
        <div><img src="/src/assets/images/carwiseLogin.jpg" alt="CarWise Signup" /></div>
      </div>
      <div className='right'>
        <form onSubmit={handleSubmit}>
          <div className='signIn'>SIGN UP</div>
          <div className='loginCredentials'>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='loginCredentials'>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='loginCredentials'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn'>Sign Up</button>
          <p>Already a user? <span className='signup-link' onClick={() => navigate('/')}>LOG IN</span></p>
        </form>
      </div>
    </div>
  );
}
