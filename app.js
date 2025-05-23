require("dotenv").config();

const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Feedback = require('./models/feedback.js');

const dbUrl = process.env.MONGO_URI;

main().then(()=>
{
    console.log("connected");
}).catch((err)=>
{
    console.error("err");
})


async function main()
{
   await mongoose.connect(dbUrl);
}

const PORT = 1000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Serve static files from React
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors(
    { 
        origin: process.env.FRONTEND_URL,
        credentials:true,
    }
));

app.listen(PORT, (req, res) => {
    console.log("listening");
})

app.post("/send-notification", async(req, res) => {
    console.log("hello");
    const { name, email, subject, message } = req.body;
    const newFeedback = new Feedback({name,email,subject,message});
    await newFeedback.save();
    res.sendStatus(200);
})

app.get("/about",(req,res)=>
{
    res.send("Hello about");
})

// This should be the last route:
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
