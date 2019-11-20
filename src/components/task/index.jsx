import React from 'react';

const Task = props => {
  const { task, onDelete, onDone } = props;

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
        {
          <button className="task__btn" onClick={() => onDone(task)}>
            {task.isDone ? 'un-done' : 'Done'}
          </button>
        }
        <button className="task__btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
