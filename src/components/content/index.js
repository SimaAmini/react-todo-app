import React, { useState, useEffect } from 'react';

// services
import localstorageService from '../../services/localstorage.service';

//components
import Actions from '../actions';
import AddTask from '../add-task';
import Tasks from '../tasks';

export function Content(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const tasks = localstorageService.getData();

    setTasks(tasks.length ? tasks : []);
  };
  const handleDone = (task) => {
    const tempTasks = [...tasks];
    const index = tempTasks.indexOf(task);
    tempTasks[index] = { ...tempTasks[index] };
    tempTasks[index].isDone = !tempTasks[index].isDone;

    setTasks(tempTasks);
    localstorageService.setData(tempTasks);
  };

  const handleDelete = (id) => {
    const clean_tasks = tasks.filter((task) => task.id !== id);

    setTasks(clean_tasks);
    localstorageService.setData(clean_tasks);
  };

  const handleAddTask = (text) => {
    const task = {
      id: new Date().getTime(),
      text: text,
      isDeleted: false,
      isImportant: false,
      isDone: false,
      comment: '',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localstorageService.setData(updatedTasks);
  };
  const handleToggleAllStatus = (status) => {
    const tempTasks = [...tasks];
    tempTasks.map((task) => (task.isDone = status));
    setTasks(tempTasks);
  };
  const handleDeleteAll = () => {
    setTasks([]);
    localstorageService.clear();
  };

  return (
    <div className="content">
      <AddTask OnAddTask={handleAddTask} />
      {tasks.length > 0 && (
        <Actions
          onToggleAllStatus={handleToggleAllStatus}
          onDeleteAll={handleDeleteAll}
        />
      )}
      <Tasks tasks={tasks} onDelete={handleDelete} onDone={handleDone}></Tasks>
    </div>
  );
}

export default Content;
