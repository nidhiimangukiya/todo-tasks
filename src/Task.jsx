import { useState } from "react";
import TaskList from "./TaskList";


export default function Task() {
  const [userInput, setUserinput] = useState("");
  const [tasks, setTasks] = useState([]);
  const updateInput = (value) => {
    setUserinput(value);
  };
  const addTask = () => {
    if (userInput !== "") {
      const newTask = {
        id: Math.random(),
        text: userInput,
        completed: false,
        date: Date.now(),
      };

      setTasks([...tasks, newTask]);
      localStorage.setItem("taskstore", JSON.stringify([...tasks, newTask]))
      document.getElementById("exampleInputPassword1").value = "";
      setUserinput("");
    }
  };
  useState(() => {
    if (localStorage.getItem('taskstore')) {
      let storedTasks = JSON.parse(localStorage.getItem('taskstore'));
      setTasks(storedTasks)
    }
  }, [])
  return (
    <>

      <div className="form-group col-8 container mt-5">
        <label
          htmlFor="exampleInputPassword1"
          style={{ fontSize: "xx-large", color: "white" }}
        >
          ADD TASKS
        </label>
        <input
          type="text"
          className="form-control col-8"
          id="exampleInputPassword1"
          placeholder="Enter task.."
          onChange={(e) => updateInput(e.target.value)}
        />
        <button
          style={{ width: '200px' }}
          type="submit"
          className="btn btn-light mt-3"
          onClick={addTask}
        >
          ADD
        </button>
      </div>

      <TaskList tasks={tasks} setTask={setTasks} type="todo" />
    </>
  )
}