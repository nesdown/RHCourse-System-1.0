import React from 'react';
import { render } from 'react-dom';
import CourseForm from './components/CourseForm';

render(
    <div>
        <p>Hello from React</p>
        <CourseForm/>
    </div>,
    document.getElementById("root")
);
