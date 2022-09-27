import { useState } from 'react'
import {GrCheckbox} from 'react-icons/gr'
import {GrCheckboxSelected} from 'react-icons/gr'
import {FaRegTrashAlt} from 'react-icons/fa'

const TaskItem = ({task,deleteTask})=>{
  const {description} = task
  //<input type='checkbox' className='task-check' ></input>
  const [hover,setHover] = useState(false)
  const [trashHover,setTrashHover]=useState(false)
  return (
    <div className=''>
      <section onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className='task-item done'>
        {hover ? <GrCheckboxSelected/> : <GrCheckbox/>}
        <p>{description}</p>
        <FaRegTrashAlt onClick={()=>deleteTask(task.id)} size='1.6rem' className={'trash'}/>
      </section>
    </div>
  )
}
export default TaskItem