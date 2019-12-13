'use strict';

const { Router } = require('express');
const Course = require('../course/index');
const Database = require('../database/index');
const Service1 = require('../../services/service1.js');
const Service2 = require('../../services/service2.js');
const Cache = require('../cache.js');

const router = new Router();
const db = new Database();
// const service1 = new Service1();
// const service2 = new Service2();
const cache = new Cache();

// const service1Middleware = async(req, res, next) => {
//     let service1Rows = await service1.getCourseByName('');
//     req.service1Rows = service1Rows;
//     next();
// }

// const service2Middleware = async(req, res, next) => {
//     let service2Rows = await service2.getAllCourses();
//     req.service2Rows = service2Rows;
//     next();
// }

const getPage = (req, res, next) => {
    if (req.query.page) {
        req.page = req.query.page;
    } else {
        req.page = 1;
    }
    next();
}

const limitResTime = (req, res, next) => {
    // Set the server response timeout for all HTTP requests
    res.setTimeout(1000, () => {
        let err = new Error('Service Unavailable');
        err.status = 503;
        next(err);
    });
    next();
}

// router.use('/', (req, res, next) => {
//     // Set the server response timeout for all HTTP requests
//     res.setTimeout(1000, () => {
//         let err = new Error('Service Unavailable');
//         err.status = 503;
//         next(err);
//     });
//     next();
// });

//GET all records from course
router.get('/all', limitResTime, getPage, cache.mem, async(req, res) => {
    try {
        let allCourses = await db.getAllCourses();
        for (let i = 0; i < allCourses.length; ++i) {
            allCourses[i].provider = 'main';
        }
        let service1Rows = req.service1Rows;
        let service2Rows = req.service2Rows;
        for (let row of service1Rows) {
            allCourses.push(row);
        }
        for (let row of service2Rows) {
            allCourses.push(row);
        }
        let resRows = [];
        for (let i = 5000 * (req.page - 1); i < req.page * 5000; ++i) {
            resRows.push(allCourses[i]);
        }
        res.status(200).json(resRows);
    } catch(err) {
        res.status(500).json(err);
    }
});

//POST a new course to DB
router.post('/new', async(req, res) => {
    try {
        let course = req.body;
        let dbRes = await db.storeNewCourse(course);
        res.status(200).json(dbRes);
    } catch(err) {
        res.status(500).json(err);
    }
});

//UPDATE a course in DB by id
router.put('/update', async(req, res) => {
    try {
        const course = new Course(req.body);
        const id = req.body.id;
        const dbRes = await db.updateCourseById(course, id);
        res.status(200).json(dbRes);
    } catch(err) {
        res.status(500).json(err);
    }
});

//DELETE a course in DB by id
router.delete('/delete', async(req, res) => {
    try {
        const id = req.body.id;
        const dbRes = await db.deleteCourseById(id);
        res.status(200).json(dbRes);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET a course by its id
router.get('/:id', limitResTime, cache.mem, async(req, res) => {
    try {
        const id = req.params.id;
        let service1Courses = req.service1Rows;
        let service2Courses = req.service2Rows;
        let mainCourses = await db.getAllCourses();
        for (let i = 0; i < mainCourses.length; ++i) {
            mainCourses[i].provider = 'main';
        }
        for (let i = 0; i < service1Courses.length; ++i) {
            mainCourses.push(service1Courses[i]);
        }
        for (let i = 0; i < service2Courses.length; ++i) {
            mainCourses.push(service2Courses[i]);
        }
        res.status(200).json(mainCourses[id - 1]);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
