import React, { useState } from "react";
import TaskList from "./TaskList";

const CompletedTasks = () => {
  
  const [tasks, setTasks] = useState([]);
  useState(() => {
    if (localStorage.getItem('task_completed_store')) {
      let storedTasks = JSON.parse(localStorage.getItem('task_completed_store'));
      setTasks(storedTasks)
    }
  }, [])
  return (
    <div>
      <h2 className={'text-white text-center m-5'}>Completed Tasks</h2>
      
      <TaskList tasks={tasks} setTask={setTasks} type="completed" />
    </div>
  );
};
export default CompletedTasks;