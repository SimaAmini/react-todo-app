import React from 'react';
import Task from '../task';

const Tasks = props => {
  const { tasks, onDelete, onDone } = props;
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
