const express = require("express");

const router = express.Router();

const Course = require("../models/Course");


// CREATE

router.post("/", async (req, res) => {

  const course = new Course(req.body);

  await course.save();

  res.json(course);

});


// READ all

router.get("/", async (req, res) => {

  const courses = await Course.find();

  res.json(courses);

});


// READ one

router.get("/:id", async (req, res) => {

  const course = await Course.findById(req.params.id);

  res.json(course);

});


// UPDATE

router.put("/:id", async (req, res) => {

  const updatedCourse =
    await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedCourse);

});


// DELETE

router.delete("/:id", async (req, res) => {

  await Course.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Course deleted"
  });

});

module.exports = router;