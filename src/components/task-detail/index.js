import React, { Component } from 'react';
import localstorageService from '../../services/localstorage.service';
import { Link } from 'react-router-dom';
import DoneButton from '../buttons/done';
import DeleteButton from '../buttons/delete';

export class TaskDetail extends Component {
  state = {
    task: {
      text: ''
    }
  };
  async componentDidMount() {
    await this.populateTask();
  }
  async populateTask() {
    try {
      const id = this.props.match.params.id;
      const task = await this.getTask(id);

      this.setState({ task });
    } catch (ex) {
      console.log(ex);

      if (ex.response && ex.response.status === 404)
        return this.props.history.replace('/not-found');
    }
  }
  getTask(id) {
    const tasks = localstorageService.getData();
    const task = tasks.find(task => task.id === Number(id));
    return task;
  }
  handleChange = e => {
    const task = { ...this.state.task };
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    task[key] = value;
    this.setState({ task });
  };
  handleSubmit = event => {
    console.log('submit');

    event.preventDefault();
    //save
    const tasks = localstorageService.getData();

    const task = this.state.task;
    task.updated_at = new Date().toLocaleString();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index] };
      tasks[index] = task;
      this.setState({ task });
      localstorageService.setData(tasks);
    }
  };
  handleDone = () => {
    const tasks = localstorageService.getData();
    const index = tasks.findIndex(task => task.id === this.state.task.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index] };
      tasks[index].isDone = !tasks[index].isDone;
      this.setState({ task: tasks[index] });
      localstorageService.setData(tasks);
    }
  };
  handleDelete = id => {
    const tasks = localstorageService.getData();
    const clean_tasks = tasks.filter(task => task.id !== id);

    this.setState({ tasks: clean_tasks });
    localstorageService.setData(clean_tasks);
    this.props.history.goBack();
  };

  render() {
    const { task } = this.state;
    const { text, comment, created_at, updated_at } = this.state.task;
    return (
      <div>
        <div className="mb-10">
          <Link to="/">Back</Link>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-10"
            name="text"
            type="text"
            value={text}
            onChange={this.handleChange}
          />
          <textarea
            className="form-control"
            name="comment"
            type="text"
            value={comment}
            onChange={this.handleChange}
          />
          <div>
            <DoneButton task={task} onDone={this.handleDone}></DoneButton>
            <DeleteButton task={task} onDelete={this.handleDelete} />
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
}

export default TaskDetail;
