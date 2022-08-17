const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

//cors configuration
app.use(cors());

//json conversion
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/taskbook");

//model

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema);

//post
app.post("/api/create", async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
    });
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
  }
});
//get
app.get("/api/list", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
});
//get by id
app.get("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

//edit
app.put("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    task.name = req.body.name;
    task.description = req.body.description;
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

// delete
app.delete("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log(`My app is running @8000 port`);
});
