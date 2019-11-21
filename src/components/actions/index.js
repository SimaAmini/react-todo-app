import React from 'react';

const Actions = ({ onToggleAllStatus, onDeleteAll }) => {
  return (
    <div className="action-block">
      <span className="action-link" onClick={() => onToggleAllStatus(true)}>
        Done All
      </span>
      <span className="action-link" onClick={() => onToggleAllStatus(false)}>
        un-Done All
      </span>
      <span className="action-link" onClick={onDeleteAll}>
        Delete All
      </span>
    </div>
  );
};

export default Actions;
