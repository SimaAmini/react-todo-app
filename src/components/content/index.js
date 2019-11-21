import React, { Component } from 'react';
import Tasks from '../tasks';
import AddTask from '../add-task';
import localstorageService from '../../services/localstorage.service';

export class Content extends Component {
  state = {
    tasks: []
  };
  componentDidMount() {
    this.loadTasks();
  }

  loadTasks() {
    const tasks = localstorageService.getData();

    this.setState({ tasks: tasks ? tasks : [] });
  }
  handleDone = task => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].isDone = !tasks[index].isDone;

    this.setState({ tasks });
    localstorageService.setData(tasks);
  };

  handleDelete = id => {
    const tasks = [...this.state.tasks];
    const clean_tasks = tasks.filter(task => task.id !== id);

    this.setState({ tasks: clean_tasks });
    localstorageService.setData(clean_tasks);
  };

  handleAddTask = text => {
    const task = {
      id: new Date().getTime(),
      text: text,
      isDeleted: false,
      isImportant: false,
      isDone: false,
      comment: '',
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString()
    };
    const tasks = [...this.state.tasks, task];

    this.setState({ tasks });
    localstorageService.setData(tasks);
  };
  render() {
    return (
      <div className="content">
        <AddTask OnAddTask={this.handleAddTask} />
        <Tasks
          tasks={this.state.tasks}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
        ></Tasks>
      </div>
    );
  }
}

export default Content;
