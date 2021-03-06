import React, { Component } from 'react';

// services
import localstorageService from '../../services/localstorage.service';

//components
import Actions from '../actions';
import AddTask from '../add-task';
import Tasks from '../tasks';

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
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    const tasks = [...this.state.tasks, task];

    this.setState({ tasks });
    localstorageService.setData(tasks);
  };
  handleToggleAllStatus = status => {
    const tasks = this.state.tasks;

    tasks.map(task => (task.isDone = status));
    this.setState({ tasks });
  };
  handleDeleteAll = () => {
    this.setState({ tasks: [] });
    localstorageService.clear();
  };
  render() {
    const { tasks } = this.state;
    return (
      <div className="content">
        <AddTask OnAddTask={this.handleAddTask} />
        {tasks.length > 0 && (
          <Actions
            onToggleAllStatus={this.handleToggleAllStatus}
            onDeleteAll={this.handleDeleteAll}
          />
        )}
        <Tasks
          tasks={tasks}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
        ></Tasks>
      </div>
    );
  }
}

export default Content;
