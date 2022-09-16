const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let lastId=3
let tasks = [
  { id: 1, description: "Morning netflix", done: false,},
  { id: 2, description: "go for a walk", done: false},
  { id: 3, description: "look at btc chart", done: true }
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
app.post("/api/tasks",(req,res)=>{
  let task={
    id: ++lastId,
    description:req.body.description,
    done:false
  }
  tasks.push(task)
  res.json(task)
})
app.put("/api/tasks",(req,res)=>{
  const {taskId} = req.body
  let task=tasks.find(task=>task.id==taskId)

  if(req.body.userId) task.userId=req.body.userId
  if(req.body.done)task.done=true
  res.send(task)
})

app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});
