import React, { Component } from 'react'; //Import React
import ReactDOM from 'react-dom'; //Import the react DOM for injecting
import { Template } from 'meteor/templating'; //Templating is a library provided to us by Meteor for this account
import { Blaze } from 'meteor/blaze';// Is a front-end framework like React, Ember, Angular, Vue etc
import './style.css';
export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    // When the component mounts for the first time, meteor/react will render the blaze login UI for us
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)); //Find DOM node 'container' and render the blaze login UI on this dom node
  }
  componentWillUnmount() {
    //When component unmounts, we want to REMOVE that Blaze UI we craeted, no lingering UI
    Blaze.remove(this.view); // Clean up Blaze view
  }
  render() {
    return <span ref="container" />; // Render a placeholder
  }
}