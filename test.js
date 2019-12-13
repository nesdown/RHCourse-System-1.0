'use strict';

const f = () => {
    let date = new Date();
    const now = new Date(date);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return (date.getTime() - now.getTime()) / 1000;
}

console.log(f());
