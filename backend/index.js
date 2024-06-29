const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const ToDoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.post('/add' , (req,res)=>{
    const task = req.body.task;
    ToDoModel.create({
        task : task
    }).then(result=> res.json(result))
    .catch(err=>res.json(err));
});

app.get('/todos', (req,res)=>{
    ToDoModel.find()
    .then(result => res.json(result))
    .catch(err=> res.json(err));
})

app.put('/update/:id', (req,res)=>{
    const {id} = req.params;
    const {done} = req.body;
    ToDoModel.findByIdAndUpdate(id, {done}, {new:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id' , (req,res)=>{
    const { id } = req.params;
    ToDoModel.findByIdAndDelete(id)
        .then(result => res.status(200).send('Todo deleted successfully'))
        .catch(err => res.status(500).send(err));
});

app.listen(3001, ()=>{
    console.log("Listening")
})