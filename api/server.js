const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


// start server with "npm run start"
const dbUrl = "mongodb://127.0.0.1:27017/mern-todo"; // for deployment, use .process.env.DB_URL
// const dbUrl ='mongodb://127.0.0.1:27017/mern-todo'; // (local mongodb)

mongoose.connect(dbUrl)
    .then(() => console.log("MongoDB Connection Established."))
    .catch(error => console.log("MongoDB Error Occured.", error));

const Todo = require('./models/Todo');

// route to get all the todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

// route to create todos
app.post('/todos/new', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    await todo.save();
    res.json(todo);
})

// route to delete todos
app.delete('/todos/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    res.json(result);
})

// route to toggle completed status
app.get('/todos/complete/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    todo.save();
    res.json(todo);
})

// listen to server
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})