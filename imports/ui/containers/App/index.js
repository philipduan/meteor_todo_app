import React, { Component } from 'react';
import { ToDo } from '../../components/toDoItem.js';
import { ToDoCount } from '../../components/toDoCount.js';
import './style.css';
import { ClearButton } from '../../components/clearButton.js';
import AccountsUIWrapper from '../../components/AccountsWrapper/index.js';
import PropTypes from 'prop-types';

//Meteor imports
import { ToDos } from '../../../api/todo';
import { createContainer } from 'meteor/react-meteor-data';


class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    }
    this._removeCompleted = this._removeCompleted.bind(this);
    this._addToDo = this._addToDo.bind(this);
    this._hasCompleted = this._hasCompleted.bind(this);


  }

  _toggleComplete(todo) {
    // ToDos.update(item._id, { $set: { complete: !item.complete } });
    Meteor.call('todos.toggleComplete', todo);
  }

  _removeToDo(todo) {
    Meteor.call('todos.removeToDo', todo);
  }

  _removeCompleted() {
    Meteor.call('todos.removeCompleted');
  }

  _hasCompleted() {
    let complete = this.props.todos.filter((todo) => { return todo.complete });
    return complete.length > 0 ? true : false;
  }

  _addToDo(event) {
    event.preventDefault();
    if (this.toDoInput.value) {
      Meteor.call('todos.addToDo', this.toDoInput.value);
      this.toDoInput.value = '';
    }
  }

  componentDidMount() {
    this.toDoInput ? this.toDoInput.focus() : null;
  }

  render() {
    const number = 0;
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <div className="todo-list" >
          <h1> ToDo App </h1>
          {this.props.currentUserId ? (
            <div>
              <div className="add-todo">
                <form name="addTodo" onSubmit={this._addToDo}>
                  <input type="text" ref={(input) => (this.toDoInput = input)} />
                  <span>(press enter to add)</span>
                </form>
              </div>
              <ul>
                {this.props.todos.map((item, i) => <ToDo
                  key={i}
                  item={item}
                  toggleComplete={this._toggleComplete.bind(this, item)}
                  removeToDo={this._removeToDo.bind(this, item)}
                />)}
              </ul>
              <div className="todo-admin">
                <ToDoCount number={this.props.todos.length} />
                {this._hasCompleted ? (<ClearButton removeCompleted={this._removeCompleted} />) : null}
              </div>
            </div>) : <div className="logged-out-message">
              <p>Please sign in to see your todos.</p>
            </div>}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('todos'); //Access to all my document/todos
  //Subscribe to the data given to us from the server
  return {
    currentUser: Meteor.user(), // This method will grab the current logged in user
    currentUserId: Meteor.userId(), // Grab the current user's ID
    todos: ToDos.find({}).fetch() // Query to the db to grab all docs
  };
}, App);

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

ToDo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }),
};
