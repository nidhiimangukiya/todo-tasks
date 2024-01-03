import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Item from "./Item";

export default function TaskList({ tasks, setTask, type }) {
    const [show, setShow] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const handleClose = () => setShow(false);


    const handleClick = (taskId) => {
        if(type=="completed") {
            let todoTasks = JSON.parse(localStorage.getItem('taskstore'));
            let filTask = tasks.filter((task) => taskId === task.id);
            if(filTask.length) {
                filTask[0].completed=false;
                localStorage.setItem('taskstore', JSON.stringify([...todoTasks, filTask[0]]));
            }
        } else {
            let comTasks = JSON.parse(localStorage.getItem('task_completed_store'));
            let filTask = tasks.filter((task) => taskId === task.id);
            if(filTask.length) {
                filTask[0].completed=true;
                localStorage.setItem('task_completed_store', JSON.stringify([...comTasks, filTask[0]]));
            }
        }
        setTask((currentList) => {
            return currentList.filter((task) =>
                taskId !== task.id
            );
        });


    };

    const handleEdit = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setEditingTaskId(taskId);
        setEditedText(taskToEdit.text);

    };

    const handleUpdate = (taskId) => {
        setTask((currentTodo) => {
            return currentTodo.map((task) =>
                task.id === taskId ? { ...task, text: editedText } : task
            );
        });
        setEditingTaskId(null);
        setEditedText("");
    };

    const handleDelete = (taskId) => {
        setShow(true);
        setDeleteTaskId(taskId)
    };

    const taskDelete = (taskId) => {
        // Update the state
        setTask((currentTodo) => {
            const updatedDeleteList = currentTodo.filter((task) => task.id !== taskId);
            return updatedDeleteList;
        });

        // Update local storage after the state is updated
        const updatedDeleteList = tasks.filter((task) => task.id !== taskId);
        if(type=="todo") {
            localStorage.setItem('taskstore', JSON.stringify(updatedDeleteList));
        } else {
            localStorage.setItem('task_completed_store', JSON.stringify(updatedDeleteList));
        }
    };

    useEffect(() => {
        if(type=="todo") {
            localStorage.setItem('taskstore', JSON.stringify(tasks));
        } else {
            localStorage.setItem('task_completed_store', JSON.stringify(tasks));
        }
    }, [tasks]);

    return (<>
        <div className="container col-8 mt-4 mb-5">
            <div className="form-check">
                {tasks.map((ele) => (
                    <Item   
                        editingTaskId={editingTaskId}
                        editedText={editedText}
                        setEditedText={setEditedText}
                        handleUpdate={handleUpdate}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit} 
                        ele={ele}
                    />
                ))}
            </div>
        </div>
        {/* <!-- Modal --> */}
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Want to Delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure? you want to delete task?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => { taskDelete(deleteTaskId); handleClose(); }}>Delete</Button>
            </Modal.Footer>
        </Modal>

    </>)
}
