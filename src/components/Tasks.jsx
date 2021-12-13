import React,{useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const AddTask=({onCancle,onAddTask})=>{

  const [task,setTask]=useState("");
  const [date,setDate]=useState(null);
  const FORMAT='dd/MM/yyyy';
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
return(

<div className="add-task-dialog">
       <input value={task} onChange={(event)=>setTask(event.target.value)}/>
       <div className="add-task-actions-container">
         <div className="btns-container">
           <button className="add-btn" 
           disabled={!task}
           onClick={()=>{onAddTask(task,date);
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
         <div className="icons-container">
           <DayPickerInput onDayChange={(day)=>setDate(day)} placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
           formatDate={formatDate}
           format={FORMAT}  dayPickerProps={
            {
              modifiers:{
                disabled:[{before: new Date()}],
              },
            }
          }/>
          
         </div>
         </div>
     </div>
);
};

const TASKS_HEADER_MAPPING={
  INBOX:"Inbox",
  TODAY:"Today",
  NEXT_7:"Next 7 day",
}
const TaskItems=({selectedTab,tasks})=>{
  let tasksToRender=[...tasks];
  const FORMAT='dd/MM/yyyy';
if(selectedTab==='Next_7'){
  tasksToRender=tasksToRender.filter(task=> isAfter(task.date,new Date()) && 
  isBefore(task.date,addDays(new Date(),7))
  );
  
}
if(selectedTab==='TODAY'){
  tasksToRender=tasksToRender.filter(task=>isToday(task.date))

}
return (
  <div className='task-item-container'>
  {tasksToRender.map((task)=>
(
<div className='task-item'>
<p>{task.text}</p>
<p>{dateFnsFormat(new Date(task.date),FORMAT)}</p></div>
))}
</div>
)
}


const Tasks = ({selectedTab}) => {
  const [showAddTask,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([]);
  
  const addNewTask=(text,date)=>{
    const newTaskItem={text,date:date || new Date()}
setTasks((prevState)=>[...prevState,newTaskItem]);

  };
  return (
    <div className="tasks">
     <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>

     {selectedTab==='INBOX'?<div className="add-task-btn" onClick={()=>setShowAddTask((prevState)=>!prevState)}>
       <span className="plus">+</span>
       <span className="add-task-text">Add Task</span>
     </div>:null}

     {showAddTask &&(<AddTask onAddTask={addNewTask} onCancle={()=>setShowAddTask(false)}/>)}
     {tasks.length> 0 ?
     <TaskItems selectedTab={selectedTab} tasks={tasks}/>:(<p>No tasks yet</p>
     )}
    </div>
  )
}

export default Tasks
