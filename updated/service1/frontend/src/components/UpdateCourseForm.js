import React, { Component } from 'react';
const Course = require('../../../app/course/index');
const request = require('request');

class UpdateCourseForm extends Component {
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
            id: undefined
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
            price: this.state.price,
            id: this.state.id
        };
        request.put({
            url: 'http://localhost:3001/course/update',
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
            id: undefined
        });
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h1>UPDATE a course by id</h1>
                <span>Enter id of course you want to update: </span>
                <input
                    type='number'
                    name='id'
                    onChange={this.changeHandler}
                    required
                />
                <br></br>
                <span>Enter course name: </span>
                <input
                    type='text'
                    name='name'
                    onChange={this.changeHandler}
                    value={this.state.name}
                    required
                />
                <span>Enter students amount:</span>
                <input
                    type='number'
                    name='students_amount'
                    onChange={this.changeHandler}
                    value={this.state.students_amount}
                    required
                />
                <span>Enter location: </span>
                <input
                    type='text'
                    name='location'
                    onChange={this.changeHandler}
                    value={this.state.location}
                    required
                />
                <span>Enter partner: </span>
                <input
                    type='text'
                    name='partner'
                    onChange={this.changeHandler}
                    value={this.state.partner}
                    required
                />
                <span>Enter lesson date: </span>
                <input
                    type='text'
                    name='date'
                    onChange={this.changeHandler}
                    value={this.state.date}
                    required
                />
                <span>Enter price: </span>
                <input
                    type='number'
                    name='price'
                    onChange={this.changeHandler}
                    value={this.state.price}
                    required
                />
                <br/>
                <input type='submit' value='UPDATE'/>
            </form>
        );
    }
}

export default UpdateCourseForm;
