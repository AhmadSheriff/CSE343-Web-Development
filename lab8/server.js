const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://ahmed_db_user:adminf2004@cluster0.d8ivejq.mongodb.net/courseDB?retryWrites=true&w=majority"
)
.then(() => {
  console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
  console.log(err);
});


// IMPORT ROUTER
const courseRouter = require("./routes/courseRouter");


// USE ROUTER
app.use("/courses", courseRouter);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});