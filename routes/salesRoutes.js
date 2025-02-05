const express = require('express')   
const router = express.Router()   
const salesController = require('../controller/salesController')   

router.post('/api/Sales', salesController.createSale)   
router.get('/api/Sales', salesController.getAllSales)   
router.get('/api/Sales/:id', salesController.getSaleById)   
router.put('/api/Sales', salesController.updateSale)   
router.delete('/api/Sales', salesController.deleteSale)   

module.exports = router   
