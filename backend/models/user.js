const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'parent', 'student'], // Define allowed roles
        required: true
    },
    path: String,
    cin: { type: Number, unique: true }, // Assuming CIN is a unique identifier
    parent: String,
    telParent: Number,
    emailParent: String,
    emailChild: String,
    status: String,
    speciality: String,
    experience: String,
    img: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array for multiple courses
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }]
});

// Define a model with the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;