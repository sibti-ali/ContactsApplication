import express from "express";
import { createConnection } from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

app.use(express.json());
app.use(cors());

app.get("/contacts", (req, res) => {
    const getContacts = "SELECT * FROM contacts";
    db.query(getContacts, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
    const contactId = req.params.id;
    const q = "SELECT * FROM contacts WHERE id = ?";
    
    db.query(q, [contactId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Contact not found" });
        return res.json(data[0]);
    });
});

app.post("/contacts", (req, res) => {
    const createContact = "INSERT INTO contacts (`first_name`, `last_name`, `phone`, `email`, `address`) VALUES (?)";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        req.body.email,
        req.body.address
    ];
    db.query(createContact, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Contact has been created successfully");
    });
});

app.delete("/contacts/:id", (req, res) => {
    const contactID = req.params.id;
    const deleteQ = "DELETE FROM contacts WHERE id = ?";

    db.query(deleteQ, [contactID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Contact has been deleted successfully");
    });
});

app.put("/contacts/:id", (req, res) => {
    const contactID = req.params.id;
    const updateQ = "UPDATE contacts SET `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ?, `address` = ? WHERE id = ?";

    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        req.body.email,
        req.body.address
    ];
    db.query(updateQ, [...values, contactID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Contact has been updated successfully");
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
