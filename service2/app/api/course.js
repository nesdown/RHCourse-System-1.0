'use strict';

const { Router } = require('express');
const Course = require('../course/index');
const Database = require('../database/index');

const router = new Router();
const db = new Database();

const getPage = (req, res, next) => {
    if (req.query.page) {
        req.page = req.query.page;
    } else {
        req.page = 1;
    }
    next();
}

// //GET all records from course
// router.get('/all', async(req, res) => {
//     try {
//         let allCourses = await db.getAllCourses();
//         res.status(200).json(allCourses);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

//POST a new course to DB
router.post('/new', async(req, res) => {
    let course = req.body;
    await db.storeNewCourse(course);
    let id = await db.getCourseIdByName(course);
    course.course_id = id[id.length - 1].course_id;
    console.log(course.course_id);
    let dbRes = await db.storeNewDetails(course);
    res.status(200).json(dbRes);
});

//UPDATE a course in DB by id
// router.put('/update', async(req, res) => {
//     try {
//         const course = new Course(req.body);
//         const id = req.body.id;
//         const dbRes = await db.updateCourseById(course, id);
//         res.status(200).json(dbRes);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// //DELETE a course in DB by id
// router.delete('/delete', async(req, res) => {
//     try {
//         const id = req.body.id;
//         const dbRes = await db.deleteCourseById(id);
//         res.status(200).json(dbRes);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

//GET a course by its id
// router.get('/:id', async(req, res, next) => {
//     const id = req.params.id;
//     if (typeof id === 'number') {
//         try {
//             const course = await db.getCourseById(id);
//             res.status(200).json(course);
//         } catch(err) {
//             res.status(500).json(err);
//         }
//     } else {
//         next();
//     }
// });

router.get('/price-list', getPage, async(req, res) => {
    try {
        let dbRes = await db.getPriceList();
        let resRows = [];
        for (let i = 5000 * (req.page - 1); i < req.page * 5000; ++i) {
            resRows.push(dbRes[i]);
        }
        res.status(200).json(resRows);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/details/:id', async(req, res) => {
    const id = req.params.id;
    const dbRes = await db.getDetailsById(id);
    res.status(200).json(dbRes);
});

module.exports = router;
