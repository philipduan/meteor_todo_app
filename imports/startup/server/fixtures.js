import { Meteor } from 'meteor/meteor';
import { ToDos } from '../../api/todo';
Meteor.startup(() => {
  if (ToDos.find().count() === 0) {
    ToDos.insert({
      id: 0,
      title: 'Learn React',
      complete: false,
    });
  }
});