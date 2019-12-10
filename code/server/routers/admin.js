const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const pdfController = require('../controllers/pdf');

router.post('/createRecord', adminController.postRecord);
router.get('/getRecords', adminController.getRecords);
router.get('/getRecords/:recordId', adminController.getRecordById);
router.post('/editRecord/:recordId', adminController.editRecord);
router.post('/deleteRecord/:recordId', adminController.deleteRecord);
router.get('/uniqueImei/:imei', adminController.uniqueImei);
router.post('/createDropdown', adminController.postDropdown);
router.post('/editDropdown/:id', adminController.editDropdown);
router.get('/getDropdowns', adminController.getDropdowns);
router.get('/getDropdown/:id', adminController.getDropdown);
router.get('/findByImei/:imei', adminController.findByImei);
router.post('/editFormula/:id', adminController.updateFormula);
router.get('/getFormula/:id', adminController.getFormula);
router.get('/getUsers', adminController.getUsers);
router.post('/deleteUser/:id', adminController.deleteUser);
router.post('/updateUser/:id', adminController.updateUser);
router.post('/sortRecords', adminController.sortRecords);
router.post('/sortRecordsTrade', adminController.sortRecordsTrade);
router.post('/exportData', pdfController.exportData);
router.post('/downloadReport', pdfController.downloadReport)
router.post('/updateInfoField/:id', adminController.updateInfoField);
router.get('/getInfoFields', adminController.getInfoFields);
router.get('/getInfoField/:id', adminController.getInfoField);
router.post('/saveFile', pdfController.saveFile);
router.post('/generateAct', pdfController.generateAct);
router.post('/postDropdown', adminController.postDropdown);
router.post('/generateInstruction', pdfController.generateInstruction);

module.exports = router;