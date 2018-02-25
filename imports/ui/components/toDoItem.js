import React from 'react';
export const ToDo = ({ item, toggleComplete, removeToDo }) => {
  return (
    <li>{item.title}
      <input
        type="checkbox"
        id={item._id}
        checked={item.complete}
        onChange={toggleComplete} />
      <label htmlFor={item._id}></label>
      <button>
        <i className="fa fa-trash" onClick={removeToDo}></i>
      </button>
    </li>
  )

};


