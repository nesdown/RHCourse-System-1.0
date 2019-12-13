'use strict';

const { Router } = require('express');
const Course = require('../course/index');
const Database = require('../database/index');

const router = new Router();
const db = new Database();

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const wait = (sec) => {
    return new Promise((resolve, reject) => {
        console.log('wait......')
        setTimeout(() => {
            console.log(sec + ' seconds you have waited.');
            resolve();
        }, sec * 1000);
    });
}

const responseTime = async(req, res, next) => {
    const sec = getRandomInt(20);
    await wait(sec);
    next();
}

router.use('/', responseTime);

//GET all records from course
router.get('/all', async(req, res) => {
    try {
        let allCourses = await db.getAllCourses();
        res.status(200).json(allCourses);
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
router.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    if (typeof id === 'number') {
        try {
            const course = await db.getCourseById(id);
            res.status(200).json(course);
        } catch(err) {
            res.status(500).json(err);
        }
    }
    next();
});

router.get('/search', async(req, res) => {
    try {
        const query = req.query.query;
        const dbRes = await db.getCourseBySearch(query);
        res.status(200).json(dbRes);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
