const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

  title: String,

  description: String,

  instructorName: String,

  price: Number,

  id: Number,

  category: String,

  enrolledStudents: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Course", courseSchema);