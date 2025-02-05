const Dealer = require('../model/Dealer');

exports.createDealer = async (req, res) => {
    try {
        const newDealer = new Dealer(req.body);
        await newDealer.save();
        res.status(201).json({ msg: 'Dealer created successfully', data: newDealer });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.getAllDealers = async (req, res) => {
    try {
        const dealers = await Dealer.find();
        res.json(dealers);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getDealerById = async (req, res) => {
    try {
        const dealer = await Dealer.findOne({ dealer_id: req.params.id });
        if (dealer) {
            res.json(dealer);
        } else {
            res.status(404).json({ msg: 'Dealer not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateDealer = async (req, res) => {
    try {
        const updatedDealer = await Dealer.updateOne(
            { dealer_id: req.body.dealer_id },
            { $set: req.body }
        );

        if (updatedDealer.matchedCount > 0) {
            res.json({ msg: 'Dealer updated successfully' });
        } else {
            res.status(404).json({ msg: 'Dealer not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
exports.deleteDealer = async (req, res) => {
    try {
        const deletedDealer = await Dealer.deleteOne({ dealer_id: req.params.id });
        if (deletedDealer.deletedCount > 0) {
            res.json({ msg: 'Dealer deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Dealer not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
