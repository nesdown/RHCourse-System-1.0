'use strict';

const Service1 = require('../services/service1.js');
const Service2 = require('../services/service2.js');

const service1 = new Service1();
const service2 = new Service2();

const Cache = new (function() {
    const single = this;

    this.init = () => {
        this.cacheData(1, 1);
    }

    //get number of seconds till midnight
    this.getSeconds = () => {
        let date = new Date();
        const now = new Date(date);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 1);
        return (date.getTime() - now.getTime()) / 1000;
    }

    this.cacheData = (sec, i) => {
        return setTimeout(async() => {
            this.service1Rows = await service1.getCourseByName('');
            console.log('get1');
            this.service2Rows = await service2.getAllCourses();
            console.log('get2');
            const nextSec = this.getSeconds();
            console.log(i);
            this.cacheData(nextSec + 10, i + 1);
        }, sec * 1000);
    }

    this.wait = async(sec) => {
        return new Promise((resolve, reject) => {
            console.log('wait......')
            setTimeout(() => {
                console.log(sec + ' seconds you have waited.');
                resolve();
            }, sec * 1000);
        });
    }

    this.mem = async(req, res, next) => {
        if (this.service1Rows) req.service1Rows = this.service1Rows;
        else {
            this.cacheData(1);
            while (!this.service1Rows) await this.wait(20);
            req.service1Rows = this.service1Rows;
        }
        if (this.service2Rows) req.service2Rows = this.service2Rows;
        else req.service2Rows = undefined;
        next();
    }

    return function() { return single; }
})();

module.exports = Cache;
