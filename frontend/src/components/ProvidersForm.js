const request = require('request');
import React, { Component } from 'react';

class ProvidersForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      url: ''
    };
  }
  submitHandler = (event) => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      url: this.state.url
    };
    request.post({
      url: 'http://localhost:3000/provider',
      form: data
    }, (err, res, body) => {
      console.log(body);
    });
  }
  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>Providers Form</h1>
        <p>Enter providers name: </p>
        <input
          type='text'
          name='name'
          onChange={this.changeHandler}
        />
        <br/>
        <p>Enter providers url: </p>
        <input
          type='text'
          name='url'
          onChange={this.changeHandler}
        />
        <input type='submit'/>
      </form>
    );
  }
}

export default ProvidersForm;
