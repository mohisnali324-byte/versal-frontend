// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required"],
//     minlength: [3, "Name must be at least 3 characters"],
//     maxlength: [30, "Name cannot exceed 30 characters"],
//     trim: true
//   },

//   isActive: {
//     type: Boolean,
//     default: true
//   }
// });

// module.exports = mongoose.model("Student", studentSchema);





const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },

  isActive: {
    type: Boolean,
    default: true
  }

});

module.exports = mongoose.model("Student", studentSchema);