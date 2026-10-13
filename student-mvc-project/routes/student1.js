// const express = require("express");
// const router = express.Router();

// const Student = require("../models/Student1");

// // =========================
// // CREATE - POST
// // =========================
// router.post("/", async (req, res) => {
//   try {
//     const student = new Student({
//       name: req.body.name
//     });

//     await student.save();

//     res.status(201).send({
//       message: "Student Created Successfully",
//       data: student
//     });

//   } catch (err) {
//     res.status(500).send({
//       message: err.message
//     });
//   }
// });


// // =========================
// // READ ALL - GET
// // =========================
// router.get("/", async (req, res) => {
//   try {
//     const students = await Student.find();

//     res.send(students);

//   } catch (err) {
//     res.status(500).send({
//       message: err.message
//     });
//   }
// });


// // =========================
// // READ ONE - GET
// // =========================
// router.get("/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);

//     if (!student) {
//       return res.status(404).send({
//         message: "Student Not Found"
//       });
//     }

//     res.send(student);

//   } catch (err) {
//     res.status(500).send({
//       message: err.message
//     });
//   }
// });


// // =========================
// // UPDATE - PUT
// // =========================
// router.put("/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name
//       },
//       {
//         new: true
//       }
//     );

//     if (!student) {
//       return res.status(404).send({
//         message: "Student Not Found"
//       });
//     }

//     res.send({
//       message: "Student Updated Successfully",
//       data: student
//     });

//   } catch (err) {
//     res.status(500).send({
//       message: err.message
//     });
//   }
// });


// // =========================
// // DELETE
// // =========================
// router.delete("/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);

//     if (!student) {
//       return res.status(404).send({
//         message: "Student Not Found"
//       });
//     }

//     res.send({
//       message: "Student Deleted Successfully",
//       data: student
//     });

//   } catch (err) {
//     res.status(500).send({
//       message: err.message
//     });
//   }
// });


// module.exports = router;





const express = require("express");
const router = express.Router();

const Student = require("../models/Student1");

// =========================
// CREATE - POST
// =========================
router.post("/", async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await student.save();

    res.status(201).send({
      message: "Student Created Successfully",
      data: student
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


// =========================
// LOGIN - POST
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email: email });

    if (!student) {
      return res.status(404).send({
        message: "Email not found"
      });
    }

    if (student.password !== password) {
      return res.status(401).send({
        message: "Wrong password"
      });
    }

    res.send({
      message: "Login successful",
      data: student
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


// =========================
// READ ALL - GET
// =========================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.send(students);

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


// =========================
// READ ONE - GET
// =========================
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({
        message: "Student Not Found"
      });
    }

    res.send(student);

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


// =========================
// UPDATE - PUT
// =========================
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      {
        new: true
      }
    );

    if (!student) {
      return res.status(404).send({
        message: "Student Not Found"
      });
    }

    res.send({
      message: "Student Updated Successfully",
      data: student
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


// =========================
// DELETE
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).send({
        message: "Student Not Found"
      });
    }

    res.send({
      message: "Student Deleted Successfully",
      data: student
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});


module.exports = router;