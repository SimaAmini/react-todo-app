import React from 'react';

const DoneButton = ({ task, onDone }) => {
  return (
    <React.Fragment>
      {
        <button className="task__btn" onClick={() => onDone(task)}>
          {task.isDone ? 'un-done' : 'Done'}
        </button>
      }
    </React.Fragment>
  );
};

export default DoneButton;
