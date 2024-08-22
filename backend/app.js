//import express module
const express = require("express");
//import body parser module
const bodyParser = require("body-parser");
//*********************Importation:mongoose***********************/
const mongoose = require("mongoose");
//footDB=>data base name
mongoose.connect("mongodb://127.0.0.1:27017/education2DB");
//*********************Models Importation*************************/
const Course = require("./models/course");
const User = require("./models/user");
const Assessment = require("./models/assessment");
//create express application
const app = express();
//import b crypt (module de cryptage)
const bcrypt = require("bcrypt");
//import multer module 
const path = require("path")
    //import path module
const multer = require("multer")
    //make app importable
module.exports = app;
//*********************app configuaration*************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//*********************Module d'Importation jsonwebtoken************************/
const jwt = require('jsonwebtoken');
//*********************Module d'Importation express-session************************/
const session = require('express-session');

//*******************Nodemailer********************* */
const nodemailer = require('nodemailer');
const crypto = require('crypto');
app.use(express.json());

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez votre service de messagerie
    auth: {
        user: 'education2projet@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'Education2Education2' // Remplacez par votre mot de passe d'application
    }
});

// Security configuration

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",

        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
//************secret key configuration
const secretKey = 'your-secret-key';
app.use(session({
    secret: secretKey,
}));
//img configuration
app.use('/shortCut', express.static(path.join('backend/photos')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/photos')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// Configuration des types MIME pour les fichiers
const FILE_MIME_TYPE = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
};

// Configuration de Multer pour le stockage des fichiers
const fileStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = FILE_MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/file'); // Le répertoire de destination pour les fichiers
        } else {
            cb(new Error('Invalid file type'), false); // Gestion des types de fichiers non valides
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().replace(/[^a-z0-9]/g, '-'); // Nettoyage du nom de fichier
        const extension = FILE_MIME_TYPE[file.mimetype];
        const fileName = `${name}-${Date.now()}.${extension}`; // Nom de fichier unique
        cb(null, fileName);
    }
});

// Configuration de Multer avec des limites de taille de fichier
const upload = multer({
    storage: fileStorageConfig,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de taille de fichier de 5 Mo
    }
});



let coursesTab = [{ id: 1, domaine: "English", title: "English for Tommorow", nbrOfHour: "50", price: 350, img: "assets/images/course-1.jpg" },
    { id: 2, domaine: "Science", title: "Computer Engineering", nbrOfHour: "50", price: 600, img: "assets/images/course-2.jpg" },
    { id: 3, domaine: "Business", title: "Business Studies", nbrOfHour: "50", price: 200, img: "assets/images/course-3.jpg" },
];
let studentsTab = [{ id: 1, name: "salah", lastName: "bensalah", score: 85, feedback: 'Great job!', emailParent: "bousalah@Salah.com", email: "salah@Salah.com", cin: 85244582, parent: "mohamed ben salah", telParent: 52852852, course: "francais", img: "assets/images/1.jpg" },
    { id: 2, name: "ali", lastName: "benali", score: 90, feedback: 'Mid !', emailParent: "bouali@ali.com", email: "ali@ali.com", cin: 85244582, parent: "bilel ben ali", telParent: 52852852, course: "englais", img: "assets/images/2.jpg" },
    { id: 3, name: "mongi", lastName: "benmongi", score: 60, feedback: 'Low !', emailParent: "boumongi@ali.com", email: "mongi@ali.com", cin: 85244582, parent: "triki ben ali", telParent: 52852852, course: "HTML", img: "assets/images/6.jpg" },
];
let teachersTab = [
    { id: 1, name: "Ivan", lastName: "Jacobson", email: "Ivan@gmail.com", speciality: "French Teacher", experience: "3", img: "assets/images/person_1.jpg" },
    { id: 2, name: "Sarra", lastName: "Maria", email: "Sarra@gmail.com", speciality: "English Teacher", experience: "5", img: "assets/images/person_2.jpg" },
    { id: 3, name: "Sam", lastName: "micon", email: "Sam@gmail.com", speciality: "CSS Teacher", experience: "6", img: "assets/images/person_3.jpg" }
];


function generateId(T) {
    let max = 0;
    if (T.length > 0) {
        for (let i = 0; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;
            }
        }
    }
    return max + 1;
}
//*************************business Logics************************************/
// Fonction pour envoyer l'e-mail de validation au fils
const sendValidationEmailToChild = async(childEmail, validationToken) => {
    const validationLink = `https://votre-domaine.com/validate-child?token=${validationToken}`;

    const mailOptions = {
        from: 'education2projet@gmail.com',
        to: childEmail,
        subject: 'Validation du compte parent',
        text: `Bonjour, veuillez valider le compte de votre parent en cliquant sur ce lien : ${validationLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail de validation envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
};




//*************************business Logics signUp************************************/
// app.post("/api/users/signUp", multer({ storage: storageConfig }).single("img"), (req, res) => {
//     //instructon
//     console.log("here into signup", req.body);
//     User.findOne({ email: req.body.email }).then((response) => {
//         console.log("here response", response);
//         if (!response) {
//             bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
//                 console.log("Here crypted pwd", cryptedPwd);
//                 req.body.pwd = cryptedPwd;
//                 if (req.file) {
//                     req.body.path = `http://localhost:3000/shortCut/${req.file.filename}`
//                 } else {
//                     req.body.path = `http://localhost:3000/shortCut/avatar.png`
//                 }
//                 let user = new User(req.body);
//                 user.save();
//                 res.json({ isAdded: true });
//             });
//         } else {
//             res.json({ isAdded: false });
//         }
//     });
// });
app.post("/api/users/signUp", multer({ storage: storageConfig }).single("img"), async(req, res) => {
    console.log("here into signup", req.body);

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.json({ isAdded: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
        req.body.pwd = hashedPassword;

        if (req.file) {
            req.body.path = `http://localhost:3000/shortCut/${req.file.filename}`;
        } else {
            req.body.path = `http://localhost:3000/shortCut/avatar.png`;
        }

        let user = new User(req.body);
        await user.save();

        // Si le rôle est "parent", envoyez un e-mail de validation au fils
        if (req.body.role === 'parent') {
            const validationToken = crypto.randomBytes(32).toString('hex');
            user.validationToken = validationToken;
            await user.save();

            if (req.body.emailChild) {
                await sendValidationEmailToChild(req.body.emailChild, validationToken);
            }
        }

        res.json({ isAdded: true });

    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ isAdded: false, message: 'Internal server error' });
    }
});
// Route pour valider le compte du parent
app.get('/api/users/validate-child', async(req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ validationToken: token });

        if (!user) {
            return res.status(400).send('Jeton de validation invalide');
        }

        user.status = 'validated';
        user.validationToken = null;
        await user.save();

        res.send('Le compte du parent a été validé avec succès');
    } catch (error) {
        console.error('Erreur lors de la validation :', error);
        res.status(500).send('Erreur lors de la validation.');
    }
});
//*************************business Logics log in************************************/
app.post("/api/users/login", (req, res) => {
    console.log("here user ", req.body);
    //check if user exist by email
    User.findOne({ email: req.body.email }).then((response) => {
        console.log("here response", response);
        if (!response) {
            //user does not exist by email
            res.json({ msg: "check your email" });
        } else if (response.status === "not validated") {
            res.json({ msg: "your account is not validated" });
        } else {
            //user exist =>compaare pwds
            bcrypt.compare(req.body.pwd, response.pwd).then((cryptedResult) => {
                console.log("here cripted result", cryptedResult);
                if (!cryptedResult) {
                    res.json({ msg: "check your password" });
                } else {
                    let userToSend = {
                        role: response.role,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        status: response.status,
                        img: response.path,
                        id: response._id

                    }
                    const token = jwt.sign(userToSend, secretKey, {
                        expiresIn: '1h'
                    });
                    console.log("heretoken", token)
                    res.json({ msg: "welcome", user: token });
                }
            });
        }
    });
});
//**********************business Logics course*****************************/ 
//********************business Logics add course ************************/
app.post('/api/course', upload.single('file'), (req, res) => {
    console.log("Request body:", req.body);
    console.log("req.body.teacher", req.body.teacher);
    console.log("Uploaded file:", req.file);

    if (!req.body.teachers) {
        return res.status(400).json({ msg: "Teacher ID is required" });
    }

    User.findById(req.body.teachers)
        .then(teacher => {
            if (!teacher) {
                return res.status(404).json({ msg: "Teacher not found" });
            }

            // Create a new Course instance with the provided data
            const course = new Course({
                title: req.body.title,
                domaine: req.body.domaine,
                nbrOfHour: req.body.nbrOfHour,
                price: req.body.price,
                file: req.file ? req.file.path : null // Save file path if file uploaded
            });
            course.teachers.push(req.body.teachers);

            // Save the course to the database
            return course.save()
                .then(savedCourse => {
                    // Update the teacher's course list with the new course ID
                    teacher.course.push(savedCourse._id);

                    // Save the updated teacher data
                    return teacher.save();
                })
                .then(() => {
                    res.json({ isAdded: true });
                })
                .catch(err => {
                    console.error("Error saving course or updating teacher:", err);
                    res.status(500).json({ msg: "Server error" });
                });
        })
        .catch(err => {
            console.error("Error finding teacher:", err);
            res.status(500).json({ msg: "Server error" });
        });
});

//*********************business Logics edit course ****************/ 
app.put("/api/course", (req, res) => {
    //instruction
    console.log("here into BL:Edit Course", req.body);
    Course.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ isEdited: "success" });
        } else { res.json({ isEdited: "Echec" }); }
    })
});
//*********************business Logics delete course ****************/
app.delete("/api/course/:id", (req, res) => {
    console.log("Here into BL : delete course By id", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
});
//*********************business Logics get course by id ****************/
app.get("/api/course/:id", async(req, res) => {
    try {
        console.log("here get course By id", req.params.id);
        const course = await Course.findById(req.params.id)
            .populate({
                path: 'students',
                populate: {
                    path: 'assessments', // Peupler les évaluations des étudiants
                    model: 'Assessment' // Nom du modèle des évaluations
                }
            })
            .populate('teachers');

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        res.json({ course });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});



//*********************business Logics get all courses ****************/
app.get("/api/course", (req, res) => {
        //instruction
        Course.find().populate("students").populate("teachers").then((data) => {
            console.log("data", data)
            res.json({ courses: data })
        })
    })
    //*********************business Logics search ****************/
app.post("/api/course/search", (req, res) => {
    console.log("here into BL:course search", req.body);
    Course.find({ domaine: req.body.domaine }).populate("students").populate("teachers").then((response) => {
        console.log("response", response)
        res.json({ courses: response })
    })
});
//************************business Logics teacher ****************************/
//***********************business Logics add teacher ****************/
app.post("/api/teacher", (req, res) => {
    console.log("here into BL:Add teacher", req.body);
    let teacher = new Teacher(req.body);
    teacher.save()
    res.json({ isAdded: true });

});
//*********************business Logics edit teacher ****************/ 
app.put("/api/teacher", (req, res) => {
    //instruction
    console.log("here into BL:Edit teacher", req.body);
    User.updateOne({ _id: req.params._id }, req.body).then((updateDoc) => {
        if (updateDoc.nModified == 1) {
            res.json({ isEdited: "success" });
        } else {
            res.json({ isEdited: "echec" });
        }
    })
});
//*********************business Logics delete teacher ****************/
app.delete("/api/teacher/:id", (req, res) => {
    console.log("Here into BL : delete teacher By id", req.params.id);
    User.deleteOne({ _id: req.params.id }).then((responseDelete) => {
        if (responseDelete.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });

        }
    })
});
//*********************business Logics update status teacher ****************/
app.put('/api/users/:id/validate', (req, res) => {
        const { id } = req.params;
        console.log("tttttttttttt", id)

        // Rechercher l'enseignant par ID et mettre à jour le statut à "validated"
        User.findByIdAndUpdate(id, { status: 'validated' }, { new: true }).then((response) => {
            console.log("response", response)
            if (!response) {
                return res.json({ message: 'Teacher not found' });
            } else { res.json({ isEdited: true, response }); }
        });
    })
    //*********************business Logics update status children ****************/
app.put('/api/users/:id/validateStudent', (req, res) => {

    const { id } = req.params;
    console.log("tttttttttttt", id)

    // Rechercher l'etudiant par ID et mettre à jour le statut à "validated"
    User.findByIdAndUpdate(id, { status: 'validated' }, { new: true }).then((response) => {
        console.log("response", response)
        if (!response) {
            return res.json({ message: 'Teacher not found' });
        } else { res.json({ isEdited: true, response }); }
    });
})



//*********************business Logics get teacher by id ****************/
app.get("/api/teacher/:id", (req, res) => {
    console.log("here get teacher By id", req.params.id);
    User.findById(req.params.id).then((data) => {
        console.log("data", data)
        res.json({ teacher: data })
    })
});




//*********************business Logics get all teachers ****************/
app.get("/api/teacher", (req, res) => {
    //instruction

    console.log("here into BL:Get All teacher");
    User.find({ role: 'teacher' }).then((data) => {
        console.log("data teacher", data)

        res.json({ teachers: data });
    })
});

//**********************business Logics student*****************************/
//********************business Logics add student ************************/
app.post("/api/users/addToCourse", (req, res) => {
    console.log("Received request body:", req.body);

    const courseId = req.body.obj.course;
    const studentId = req.body.obj._id;

    // Rechercher le cours par ID
    Course.findById(courseId).then(course => {
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        // Rechercher l'étudiant par ID
        User.findById(studentId).then(student => {
            if (!student) {
                return res.status(404).json({ msg: "Student not found" });
            }

            // Check if the student is already enrolled in this course
            if (student.course.includes(courseId)) {
                return res.json({ msg: "Student is already enrolled in this course" });
            }

            // Add course ID to student's list of courses
            student.course.push(courseId);

            // Check if the student is already listed in the course's students array
            if (course.students.includes(studentId)) {
                return res.status(400).json({ msg: "Student is already listed in this course" });
            }

            // Add student ID to course's list of students
            course.students.push(studentId);

            // Save the updated student and course documents
            Promise.all([student.save(), course.save()])
                .then(() => {
                    res.json({ msg: "Student added to course successfully" });
                })
                .catch(err => {
                    console.error("Error saving student or course:", err);
                    res.status(500).json({ msg: "Error saving student or course" });
                });
        }).catch(err => {
            console.error("Error finding student:", err);
            res.status(500).json({ msg: "Error finding student" });
        });
    }).catch(err => {
        console.error("Error finding course:", err);
        res.status(500).json({ msg: "Error finding course" });
    });
});



// student.save().then(updatedStudent => {
// // Ajouter l'étudiant au tableau des étudiants du cours
// course.students.push(updatedStudent._id);
// course.save().then(updatedCourse => {
//     // Répondre avec un succès
//     res.json({ msg: "Student added to course successfully" });
// }).catch(err => {
//     console.error("Error saving course:", err);
//     res.status(500).json({ msg: "Error saving course" });
// });
// }).catch(err => {
// console.error("Error saving student:", err);
// res.status(500).json({ msg: "Error saving student" });
// });
// }).catch(err => {
// console.error("Error finding student:", err);
// res.status(500).json({ msg: "Error finding student" });
// });
// }).catch(err => {
// console.error("Error finding course:", err);
// res.status(500).json({ msg: "Error finding course" });
// });

//     let playerObj = new Player({
//         name: req.body.name,
//         nbr: req.body.nbr,
//         age: req.body.age,
//         position: req.body.position,
//         team: doc._id,
//     });
//     playerObj.save(
//         (err, playerObj) => {
//             //playerobj{name,age,nbr..+_id}
//             console.log("Here error after save", err);
//             console.log("Here error document after save", playerObj);
//             if (err) {
//                 res.json({ msg: "player not saved" })
//             } else {
//                 //ajouter _id du player enregistré à l'attribut 
//                 //players de l'objet doc
//                 doc.players.push(playerObj)
//                 doc.save();
//                 res.json({ msg: "player add with success" })

//             }
//         }
//     );
// }







//*********************business Logics edit student ****************/ 
app.put("/api/student", (req, res) => {
    //instruction
    console.log("here into BL:Edit student", req.body);
    User.updateOne({ _id: req.body._id }, req.body).then((response) => {
        console.log("update response", response)
        if (response.nModified == 1) {
            res.json({ isEdited: "success" });
        } else {
            res.json({ isEdited: "echec" });
        }
    })
});
//*********************business Logics delete student ****************/
app.delete("/api/student/:id", (req, res) => {
    console.log("Here into BL : delete student By id", req.params.id);
    User.deleteOne({ _id: req.params.id }).then((responseDelete) => {
        if (responseDelete.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });

        }
    })
});
//*********************business Logics get student by id ****************/
app.get("/api/student/:id", (req, res) => {
    console.log("here get student By id", req.params.id);
    User.findById(req.params.id).populate({
            path: 'assessments',
            populate: {
                path: 'course',
                model: 'Course'
            }
        }).populate({
            path: 'course',
            populate: {
                path: 'student', // Peupler 
                model: 'User' // Nom du modèle 
            }
        })
        .then((response) => {
            console.log("response", response)
            res.json({ student: response })
        })
        .catch((error) => res.status(500).json({ error: 'Error fetching student data' }));
});

//*********************business Logics get all students ****************/Course.find().populate("students")
app.get("/api/student", async(req, res) => {
    console.log("Fetching all students");
    try {
        const students = await User.find({ role: 'student' }).populate("course").populate("assessments");
        console.log("Response with populate:", students);
        res.json({ students });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ error: 'An error occurred while fetching students.' });
    }
});


//*********************business Logics search ****************/
// app.post("/api/student/search", (req, res) => {
//     console.log("here into BL:student search", req.body);
//     let students = [];
//     for (let i = 0; i < studentsTab.length; i++) {
//         if (
//             studentsTab[i].Domaine == req.body.Domaine
//         ) {
//             students.push(studentsTab[i]);
//         }
//     }
//     res.json({ T: students });

// });/student/${studentId}/course/${idCourse}
// Route to add an assessment
app.post('/api/assessments/student/:studentId/course/:courseId', async(req, res) => {
    const studentId = req.params.studentId; // Récupère l'ID de l'étudiant
    const courseId = req.params.courseId; // Récupère l'ID du cours
    console.log("studentId:", studentId);
    console.log("courseId:", courseId);
    console.log("req.body", req.body);

    // Crée une nouvelle évaluation avec les données du corps de la requête
    const { score, feedback } = req.body;

    if (!score || !feedback) {
        return res.status(400).json({ msg: "Invalid data: score and feedback are required." });
    }

    const assessment = new Assessment({
        score,
        feedback,
        student: studentId, // Utilisez 'student' pour stocker l'ID de l'étudiant
        course: courseId
    });

    try {
        // Sauvegarde l'évaluation
        const savedAssessment = await assessment.save();

        // Trouve l'étudiant par ID
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        // Initialise le tableau des évaluations s'il est indéfini
        if (!student.assessments) {
            student.assessments = [];
        }

        // Ajoute l'ID de l'évaluation au tableau des évaluations de l'étudiant
        student.assessments.push(savedAssessment._id);

        // Sauvegarde le document de l'étudiant mis à jour
        await student.save();

        // Répond avec l'étudiant mis à jour
        res.status(200).json(student);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});






// ExpressJS route for getting assessments for a student
app.get('/api/assessments/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId, 10);
    console.log("studentId", req.params.studentId)
    const studentAssessments = assessmentsTab.filter(a => a.studentId === studentId);
    res.json({ assessments: studentAssessments });
});