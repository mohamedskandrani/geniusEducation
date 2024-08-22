//import mongoose model
const mongoose = require("mongoose")
const assessmentSchema = mongoose.Schema({
    score: Number,
    feedback: String,
    date: { type: Date, default: Date.now }, // Optional: to track when the assessment was added
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }

});


// affect name to courseSchema
const assessment = mongoose.model("Assessment", assessmentSchema)
    //make model exportable
module.exports = assessment;