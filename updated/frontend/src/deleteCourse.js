import React from 'react';
import { render } from 'react-dom';
import DeleteCourseForm from './components/DeleteCourseForm';

render(
    <div>
        <p>Hello from React</p>
        <DeleteCourseForm/>
    </div>,
    document.getElementById("root")
);
