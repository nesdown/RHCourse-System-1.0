const request = require('request');
import React, { Component } from 'react';
const Course = require('../../../app/course/index');

class CourseForm extends Component {
  constructor() {
    super();
    const course = new Course();
    this.state = {
      name: course.name,
      students_amount: course.students_amount,
      location: course.location,
      partner: course.partner,
      date: course.date,
      price: course.price,
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      students_amount: this.state.students_amount,
      location: this.state.location,
      partner: this.state.partner,
      date: this.state.date,
      price: this.state.price
    };
    request.post({
      url: 'http://localhost:3002/course/new',
      form: data
    }, (err, res, body) => {
      console.log(body);
    });
    const course = new Course();
    this.setState({
        name: course.name,
        students_amount: course.students_amount,
        location: course.location,
        partner: course.partner,
        date: course.date,
        price: course.price,
    });
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
        <div>
            <form onSubmit={this.submitHandler}>
                <h1>Add new course</h1>
                <p>Enter course name:</p>
                <input
                    type='text'
                    name='name'
                    onChange={this.changeHandler}
                    value={this.state.name}
                    required
                />
                <p>Enter students amount:</p>
                <input
                    type='number'
                    name='students_amount'
                    onChange={this.changeHandler}
                    value={this.state.students_amount}
                    required
                />
                <p>Enter location: </p>
                <input
                    type='text'
                    name='location'
                    onChange={this.changeHandler}
                    value={this.state.location}
                    required
                />
                <p>Enter partner: </p>
                <input
                    type='text'
                    name='partner'
                    onChange={this.changeHandler}
                    value={this.state.partner}
                    required
                />
                <p>Enter lesson date: </p>
                <input
                    type='text'
                    name='date'
                    onChange={this.changeHandler}
                    value={this.state.date}
                    required
                />
                <p>Enter price: </p>
                <input
                    type='number'
                    name='price'
                    onChange={this.changeHandler}
                    value={this.state.price}
                    required
                />
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );
  }
}

export default CourseForm;