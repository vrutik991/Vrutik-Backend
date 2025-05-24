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

// Serve static files from React
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors(
    // { 
    //     origin: process.env.FRONTEND_URL,
    //     credentials:true,
    // }
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

// This should be the last route:

app.use((req, res, next) => {
  console.log("Incoming request for:", req.path);
  next();
});


// app.get('*', (req, res) => {
app.get(/.*/, (req, res) => {
    try {
      res.sendFile('index.html', { root: path.join(__dirname, 'dist') });
    //   console.log('index.html', { root: path.join(__dirname, 'dist') });
  } catch (err) {
    console.error("Error sending index.html:", err);
    res.status(500).send("Error serving frontend");
  }
});
