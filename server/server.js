const express = require("express");
const cors = require("cors");
const Student = require("./models/Students");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:" ,error);
    })

app.get("/",(req,res)=>{
    res.send("Server is Running");
});

app.get("/students", async (req,res)=>{
    const students = await Student.find();
    
    res.json(students);
});

app.post("/students", async (req,res)=>{
    const {name, age, course} = req.body;
    const student = new Student({
        name, 
        age,
        course
    });
    await student.save();
    console.log("saved data", student);
    res.status(201).json(student);
})
app.put("/students/:id", async (req,res)=>{
    const {id} =req.params;
    const {name,age,course} = req.body;
    const update = await Student.findByIdAndUpdate(
        id,
        {name, course, age},
        {new: true},
    )
})

app.delete("/students/:id", async (req,res)=>{
    const {id} = req.params;
    await Student.findByIdAndDelete(id);
    res.json({message: "Student data deleted successfully!"});
})


app.listen(5000, () =>{
    console.log("Server running on port 5000");
});