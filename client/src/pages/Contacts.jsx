import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAllContacts = async () => {
            try {
                const res = await axios.get('http://localhost:8800/contacts');
                setContacts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/contacts/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowModal = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    const filteredContacts = contacts.filter(contact => 
        contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.includes(search)
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <Link to="/add" className="btn btn-primary">
                    <FaPlus /> Add Contact
                </Link>
            </div>
            <div className="row">
                {filteredContacts.map(contact => (
                    <div className="col-md-4 mb-4" key={contact.id}>
                        <div 
                            className="card shadow border-0 cursor-pointer" 
                            onClick={() => handleShowModal(contact)} 
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{contact.first_name} {contact.last_name}</h5>
                                <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                                <p className="card-text"><strong>Phone:</strong> {contact.phone}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/update/${contact.id}`} className="btn btn-warning btn-sm" onClick={(e) => e.stopPropagation()}>
                                        <FaEdit /> Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedContact && (
                        <>
                            <p><strong>Name:</strong> {selectedContact.first_name} {selectedContact.last_name}</p>
                            <p><strong>Email:</strong> {selectedContact.email}</p>
                            <p><strong>Phone:</strong> {selectedContact.phone}</p>
                            <p><strong>Address:</strong> {selectedContact.address || "N/A"}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Contacts;
