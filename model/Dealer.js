const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    dealer_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String },
    contact_number: { type: String },
    email: { type: String },
    address: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

const Dealer = mongoose.model('Dealer', dealerSchema);
module.exports = Dealer;
