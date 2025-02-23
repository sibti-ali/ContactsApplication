import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Add = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contacts`, contact);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container mt-4'>
            <div className='card shadow-sm border-0 p-4'>
                <h2 className='mb-4 text-center'>Add New Contact</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input type='text' className='form-control' placeholder='Enter first name' onChange={handleChange} name='first_name' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input type='text' className='form-control' placeholder='Enter last name' onChange={handleChange} name='last_name' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone Number</label>
                        <input type='tel' className='form-control' placeholder='Enter phone number' onChange={handleChange} name='phone' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' placeholder='Enter email' onChange={handleChange} name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Address</label>
                        <textarea className='form-control' rows="5" placeholder='Enter address' onChange={handleChange} name='address' />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Add Contact</button>
                </form>
            </div>
        </div>
    );
};

export default Add;
