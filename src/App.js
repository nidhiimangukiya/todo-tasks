import './App.css';
import { useState } from 'react';
import Task from './Task';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import CompletedTasks from './CompletedTasks'
function App() {
  const [mode,setMode] = useState(document.body.style.backgroundColor ="#343a40")
  
  return (
    <>
      <Router>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Task />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
