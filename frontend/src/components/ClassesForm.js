const request = require('request');
import React, { Component } from 'react';

class ClassesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_name: '',
      students_amount: null,
      location: '',
      partner: '',
      lesson_date: '',
      price: null,
      url: ''
    };
  }
  submitHandler = (event) => {
    event.preventDefault();
    let data = {
      class_name: this.state.class_name,
      students_amount: this.state.students_amount,
      location: this.state.location,
      partner: this.state.partner,
      lesson_date: this.state.lesson_date,
      price: this.state.price
    };
    console.log(data);
    request.post({
      url: this.state.url,
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
      <h1>Add new class</h1>
      <p>Enter class name:</p>
      <input
        type='text'
        name='class_name'
        onChange={this.changeHandler}
        required
      />
      <p>Enter students amount:</p>
      <input
        type='number'
        name='students_amount'
        onChange={this.changeHandler}
        required
      />
      <p>Enter location: </p>
      <input
        type='text'
        name='location'
        onChange={this.changeHandler}
        required
      />
      <p>Enter partner: </p>
      <input
        type='text'
        name='partner'
        onChange={this.changeHandler}
        required
      />
      <p>Enter lesson date: </p>
      <input
        type='text'
        name='lesson_date'
        onChange={this.changeHandler}
        required
      />
      <p>Enter price: </p>
      <input
        type='number'
        name='price'
        onChange={this.changeHandler}
        required
      />
      <p>Enter service url: </p>
      <input
        type='text'
        name='url'
        onChange={this.changeHandler}
        required
      />
      <br/>
      <input type='submit'/>
      </form>
    );
  }
}

export default ClassesForm;
