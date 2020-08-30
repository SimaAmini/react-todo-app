import React, { useState } from 'react';

export function AddTask(props) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.OnAddTask(text);
    setText('');
  };
  const handleChange = (e) => {
    let value = { ...text };
    value = e.currentTarget.value;
    setText(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="main-input"
          value={text}
          name="text"
          type="text"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default AddTask;
