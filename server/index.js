import express from "express"
import { createConnection } from "mysql"
import cors from "cors"


const app = express()

const db = createConnection({
    host:"localhost",
    user:"root",
    password:"Letmein@123",
    database: "myapplication"

})

app.use(express.json())
app.use(cors())

app.get("/contacts", (req,res)=>{
    const getContacts = "SELECT * FROM contacts"
    db.query(getContacts, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
    const contactId = req.params.id;
    const q = "SELECT * FROM contacts WHERE id = ?";
    
    db.query(q, [contactId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Contact not found" });
        return res.json(data[0]); // Send only the first result
    });
});

app.post("/contacts", (req, res)=>{
    const createContact = "INSERT into contacts (`first_name`, `last_name`, `phone`, `email`, `address`) VALUES (?)"
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        req.body.email,
        req.body.address
    ];
    db.query(createContact, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Contact has been created successfully")
    })
})

app.delete("/contacts/:id", (req,res)=>{
    const contactID = req.params.id;
    const deleteQ = "DELETE FROM contacts WHERE id = ?"

    db.query(deleteQ, [contactID], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })

})

app.put("/contacts/:id", (req,res)=>{
    const contactID = req.params.id;
    const updateQ = "UPDATE contacts SET `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ?, `address` = ? WHERE id = ?";

    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        req.body.email,
        req.body.address
    ]
    db.query(updateQ, [...values,contactID], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been Updated successfully")
    })

})




app.listen(8800, ()=>{
    console.log("Server is up!!")
})

