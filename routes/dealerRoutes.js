const express = require('express')   
const router = express.Router()   
const dealerController = require('../controller/dealerController')   

router.post('/api/Dealers', dealerController.createDealer)   
router.get('/api/Dealers', dealerController.getAllDealers)   
router.get('/api/Dealers/:id', dealerController.getDealerById)   
router.put('/api/Dealers', dealerController.updateDealer)   
router.delete('/api/Dealers/:id', dealerController.deleteDealer)   

module.exports = router   
