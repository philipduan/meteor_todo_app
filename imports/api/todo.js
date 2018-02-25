import { Mongo } from 'meteor/mongo';

//Create a collection by using MongoCollection
export const ToDos = new Mongo.Collection('todos', { idGeneration: 'MONGO' });

if (Meteor.isServer) { //Limiting and publishing/giving data to client
  Meteor.publish('todos', function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}

Meteor.methods({ //API client to server connection
  'todos.toggleComplete'(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('todos.toggleComplete.not-authorized',
        'You are not allowed to update to-dos for other users.');
    }
    ToDos.update(todo._id, {
      $set: { complete: !todo.complete },
    });
  },

  'todos.addToDo'(inputValue) {
    if (!this.userId) {
      throw new Meteor.Error('todos.addToDo.not-authorized',
        'You are not allowed to add to-dos for other users.');
    };
    ToDos.insert({
      title: inputValue,
      complete: false,
      owner: this.userId
    });
  },

  'todos.removeToDo'(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('todos.addToDo.not-authorized',
        'You are not allowed to remove to-dos for other users.');
    };
    ToDos.remove(todo._id);
  },

  'todos.removeCompleted'() {
    if (!this.userId) {
      throw new Meteor.Error('todos.addToDo.not-authorized',
        'You are not allowed to remove completed to-dos for other users.');
    };
    ToDos.remove(
      {
        owner: this.userId,
        complete: true
      }
    );
  }
});