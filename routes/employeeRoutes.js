const express = require('express')   
const router = express.Router()   
const employeeController = require('../controller/employeeController')   

router.post('/api/Employee', employeeController.createEmployee)   
router.get('/api/Employee', employeeController.getAllEmployees)   
router.get('/api/Employee/:id', employeeController.getEmployeeById)   
router.put('/api/Employee', employeeController.updateEmployee)   
router.delete('/api/Employee/:id', employeeController.deleteEmployee)   

module.exports = router   
