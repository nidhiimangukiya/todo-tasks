import React from "react";

const Item = ({ editingTaskId,
                editedText,
                setEditedText,
                handleUpdate,
                handleClick,
                handleDelete,
                handleEdit, ele }) => {
    return (
        <div key={ele.id} className="card mt-2 container">
            <li className="card-body" style={{ listStyle: "none" }}>
                {editingTaskId === ele.id ? (
                    <>
                        <input
                            type="text"
                            className="form-control"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                        <div className="mt-3">
                            <button className="btn btn-danger " onClick={() => handleDelete(ele.id)}>
                                Delete
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-primary"
                                onClick={() => handleUpdate(ele.id)}
                            >
                                Update
                            </button>
                        </div>
                    </>

                ) : (
                    <>
                        <input
                            className="form-check-input"
                            checked={ele.completed}
                            onChange={() => handleClick(ele.id)}
                            type="checkbox"
                            id={`defaultCheck${ele.id}`}
                        />
                        <label className="form-check-label mb-2 font-weight-bold card-text" htmlFor={`defaultCheck${ele.id}`}>
                            {ele.completed ? <del>{ele.text}</del> : <>{ele.text}</>}
                        </label>
                        <br />
                        <button className="btn btn-danger" onClick={() => handleDelete(ele.id)}>
                            Delete
                        </button>
                        &nbsp;
                        <button className="btn btn-primary" onClick={() => handleEdit(ele.id)}>
                            Edit
                        </button>
                    </>
                )}
            </li>
            <p style={{ fontSize: "x-small" }}>{new Date(ele.date).toLocaleString()}</p>
        </div>
    );
};
export default Item;