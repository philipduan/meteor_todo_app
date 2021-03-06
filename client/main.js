import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '../imports/ui/containers/App/index.js';
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
})


