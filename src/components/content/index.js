import React, { Component } from 'react';
import Tasks from '../tasks';
import AddTask from '../add-task';

export class Content extends Component {
  state = {
    tasks: []
  };
  handleDone = task => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].isDone = !tasks[index].isDone;

    this.setState({ tasks });
  };

  handleDelete = id => {
    const tasks = [...this.state.tasks];
    const clean_tasks = tasks.filter(task => task.id !== id);

    this.setState({ tasks: clean_tasks });
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
