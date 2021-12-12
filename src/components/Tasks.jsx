import React,{useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
const AddTask=({onCancle,onAddTask})=>{
  const [task,setTask]=useState("");
return(

<div className="add-task-dialog">
       <input value={task} onChange={(event)=>setTask(event.target.value)}/>
       <div className="add-task-actions-container">
         <div className="btns-container">
           <button className="add-btn" onClick={()=>{onAddTask(task);
          onCancle();
          setTask("");
          }}>
             Add Task</button>
           <button className="cancel-btn" onClick={()=>{onCancle();
          onCancle();
          setTask("");
          setTask("");
          }}>Cancel</button>
         </div>
         <div className="icons-container"></div>
         </div>
     </div>
);
};
const Tasks = () => {
  const [showAddTask,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([]);
  const addNewTask=(text)=>{
setTasks((prevState)=>[...prevState,text]);

  };
  return (
    <div className="tasks">
     <h1>Inbox</h1>
     <div className="add-task-btn" onClick={()=>setShowAddTask((prevState)=>!prevState)}>
       <span className="plus">+</span>
       <span className="add-task-text">Add Task</span>
     </div>
     {showAddTask &&(<AddTask onAddTask={addNewTask} onCancle={()=>setShowAddTask(false)}/>)}
     {tasks.length>0?tasks.map((task)=><p>{task}</p>):<p>No tasks yet</p>}
    </div>
  )
}

export default Tasks
