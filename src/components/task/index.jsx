import React from 'react';
import { Link } from 'react-router-dom';

//components
import DoneButton from '../buttons/done';
import DeleteButton from '../buttons/delete';

const Task = ({ task, onDelete, onDone }) => {
  const checkState = task => {
    if (task.isDone) {
      return { textDecoration: 'line-through' };
    } else {
      return null;
    }
  };

  return (
    <div className="task">
      <div className="task__text">
        <p style={checkState(task)}>{task.text}</p>
      </div>
      <div className="task__actions">
        <DoneButton task={task} onDone={onDone}></DoneButton>
        <DeleteButton task={task} onDelete={onDelete} />

        <Link to={`/task/${task.id}`} className="task__btn">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Task;
