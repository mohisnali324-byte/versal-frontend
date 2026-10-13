

const Student = require("../models/Student1");


// CREATE API
const  createstudent = async (req, res) => {

    const student = new Student({
        name: req.body.name
    });

    await student.save();

    res.send(student);

};


// READ API
const getstudent = async (req, res) => {

    const students = await Student.find();

    res.send(students);

};


const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
            },
            {
                new: true,
            }
        );

        if (!student) {
            return res.status(404).send({
                message: "Student Not Found"
            });
        }

        res.send({
            message: "Student Updated Successfully",
            data: student,
        });

    } catch (err) {
        res.status(500).send(err);
    }

};


module.exports = {
    createstudent , getstudent , updateStudent
}