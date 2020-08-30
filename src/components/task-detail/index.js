import React, { useState, useEffect } from 'react';
import localstorageService from '../../services/localstorage.service';
import { Link } from 'react-router-dom';
import DoneButton from '../buttons/done';
import DeleteButton from '../buttons/delete';

export function TaskDetail(props) {
  const [task, setTask] = useState({ text: '' });

  useEffect(() => {
    populateTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateTask = async () => {
    try {
      const id = props.match.params.id;
      const task = await getTask(id);

      setTask(task);
    } catch (ex) {
      console.log(ex);

      if (ex.response && ex.response.status === 404)
        return props.history.replace('/not-found');
    }
  };
  const getTask = (id) => {
    const tasks = localstorageService.getData();
    const task = tasks.find((task) => task.id === Number(id));
    return task;
  };
  const handleChange = (e) => {
    const tempTask = { ...task };
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    tempTask[key] = value;
    setTask(tempTask);
  };
  const handleSubmit = (event) => {
    console.log('submit');

    event.preventDefault();
    //save
    const tasks = localstorageService.getData();

    task.updated_at = new Date().toLocaleString();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index] };
      tasks[index] = task;
      setTask(task);
      localstorageService.setData(tasks);
    }
  };
  const handleDone = () => {
    const tasks = localstorageService.getData();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index] };
      tasks[index].isDone = !tasks[index].isDone;
      setTask(tasks[index]);
      localstorageService.setData(tasks);
    }
  };
  const handleDelete = (id) => {
    const tasks = localstorageService.getData();
    const clean_tasks = tasks.filter((task) => task.id !== id);

    setTask(clean_tasks);
    localstorageService.setData(clean_tasks);
    props.history.goBack();
  };

  const { text, comment, created_at, updated_at } = task;
  return (
    <div>
      <div className="mb-10">
        <Link to="/">Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-10"
          name="text"
          type="text"
          value={text || ''}
          onChange={handleChange}
        />
        <textarea
          className="form-control"
          name="comment"
          type="text"
          value={comment}
          onChange={handleChange}
        />
        <div>
          <DoneButton task={task} onDone={handleDone}></DoneButton>
          <DeleteButton task={task} onDelete={handleDelete} />
        </div>
        <hr />
        <button type="submit">Save</button>
      </form>
      <div className="mb-10 mt-10">
        <span>created at :</span>
        <span>{created_at}</span>
      </div>
      <div>
        <span>updated at :</span>
        <span>{updated_at}</span>
      </div>
    </div>
  );
}

export default TaskDetail;
