const StockController = require('../controller/StockController')
const router = require('express').Router()

router.get('/api/Bikes',StockController.getAllBikes)
router.get('/api/Bikes/:id',StockController.getOneBike)
router.post('/api/Bikes',StockController.addNewBike)
router.put('/api/Bikes',StockController.updateBike)
router.delete('/api/Bikes/:id',StockController.deleteBike)

module.exports = router