import React from 'react';

//components
import Task from '../task';

const Tasks = ({ tasks, onDelete, onDone }) => {
  return (
    <div>
      {tasks &&
        tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDone={onDone}
          ></Task>
        ))}
    </div>
  );
};

export default Tasks;
