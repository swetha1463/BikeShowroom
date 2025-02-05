const express = require('express')   
const router = express.Router()   
const CustomerController = require('../controller/CustomerController')       

router.get('/api/Customers', CustomerController.getAllCustomer)            
router.get('/api/Customers/:id', CustomerController.getOneCustomer)        
router.post('/api/Customers', CustomerController.addNewCustomer)           
router.put('/api/Customers', CustomerController.updateCustomer)            
router.delete('/api/Customers/:id', CustomerController.deleteCustomer)     

module.exports = router   
