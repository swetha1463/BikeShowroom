const Sales = require('../model/Sales');

exports.createSale = async (req, res) => {
    try {
        const newSale = new Sales(req.body);
        await newSale.save();
        res.status(201).json({ msg: 'Sale record created successfully', data: newSale });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findOne({ sale_id: req.params.id });
        if (sale) {
            res.json(sale);
        } else {
            res.status(404).json({ msg: 'Sale record not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sales.updateOne(
            { sale_id: req.body.sale_id },
            { $set: req.body }
        );

        if (updatedSale.matchedCount > 0) {
            res.json({ msg: 'Sale record updated successfully' });
        } else {
            res.status(404).json({ msg: 'Sale record not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sales.deleteOne({ sale_id: req.params.id });
        if (deletedSale.deletedCount > 0) {
            res.json({ msg: 'Sale record deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Sale record not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
