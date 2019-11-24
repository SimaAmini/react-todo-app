import React from 'react';

const DeleteButton = ({ task, onDelete }) => {
  return (
    <button className="task__btn" onClick={() => onDelete(task.id)}>
      Delete
    </button>
  );
};

export default DeleteButton;
