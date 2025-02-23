import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [contact, setContact] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/contacts/${id}`);
                setContact(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchContact();
    }, [id]);

    const handleChange = (e) => {
        setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/contacts/${id}`, contact);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container mt-4'>
            <div className='card shadow-sm border-0 p-4'>
                <h2 className='mb-4 text-center'>Update Contact</h2>
                <form onSubmit={handleClick}>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input type='text' className='form-control' placeholder='Enter first name' onChange={handleChange} name='first_name' value={contact.first_name} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input type='text' className='form-control' placeholder='Enter last name' onChange={handleChange} name='last_name' value={contact.last_name} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone Number</label>
                        <input type='tel' className='form-control' placeholder='Enter phone number' onChange={handleChange} name='phone' value={contact.phone} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' placeholder='Enter email' onChange={handleChange} name='email' value={contact.email} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Address</label>
                        <textarea className='form-control'rows="5" placeholder='Enter address' onChange={handleChange} name='address' value={contact.address}/>
                    </div>
                    <button className='btn btn-primary w-100'>Update Contact</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
