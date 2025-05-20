const mongoose = require('mongoose');
const {Schema}= mongoose.Schema();

const feedbackSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
})

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;