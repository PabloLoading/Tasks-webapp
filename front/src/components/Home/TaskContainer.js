import TaskList from "./TaskList";
import './Home.css'
import {IoMdAdd} from 'react-icons/io'
import { useEffect, useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks,getUndoneTasks, addTask, removeTask } from "../../store/tasks";

const TaskContainer=()=>{
  const [input,setInput]=useState("")
  const inputElem=useRef()

  const dispatch = useDispatch();
  const tasksGot = useSelector(getUndoneTasks)
  let tasks = tasksGot? [...tasksGot].reverse() : []

  useEffect(()=>{
    dispatch(loadTasks())
  },[])
  

  const loadTask=()=>{
    if(input!=""){
      inputElem.current.value=""
      dispatch(addTask({description:input}))
    }
  } 
  const deleteTask=taskId=>{
    dispatch(removeTask(taskId))
  }
  
  return (
    <div className='task-container'>
      <h2>My Daily Tasks</h2>
      <div className="input-container">
        <input ref={inputElem} className="adder-task" placeholder="New Task" onChange={event=>setInput(event.target.value)}/>
        <IoMdAdd onClick={loadTask} className="add-icon" size='1.8rem'/>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask}/>
    </div>
  )
}
export default TaskContainer