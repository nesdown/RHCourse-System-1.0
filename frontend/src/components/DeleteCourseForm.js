import React, { Component } from 'react';
const request = require('request');

class DeleteCourseForm extends Component {
    constructor() {
        super();
        this.state = {
            id: undefined
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        let data = {
            id: this.state.id
        };
        request.delete({
            url: 'http://localhost:3000/course/delete',
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
                <h1>DELETE course by id</h1>
                <span>Enter id of course you want to delete: </span>
                <input
                    type='number'
                    name='id'
                    onChange={this.changeHandler}
                    required
                />
                <br></br>
                <input type='submit' value='DELETE'/>
            </form>
        );
    }
}

export default DeleteCourseForm;
