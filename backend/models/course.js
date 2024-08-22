//import mongoose model
const mongoose = require("mongoose")
const courseSchema = mongoose.Schema({
    domaine: String,
    title: String,
    nbrOfHour: String,
    price: Number,
    file: String,
    img: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


// affect name to courseSchema
const course = mongoose.model("Course", courseSchema)
    //make model exportable
module.exports = course;