import React, { Component } from 'react';

export class AddTask extends Component {
  state = {
    text: ''
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.OnAddTask(this.state.text);
    this.setState({ text: '' });
  };
  handleChange = e => {
    let text = { ...this.state.text };
    text = e.currentTarget.value;
    this.setState({ text });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="main-input"
            value={this.state.text}
            name="text"
            type="text"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default AddTask;
