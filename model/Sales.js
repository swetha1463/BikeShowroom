const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    sale_id: { type: Number, required: true, unique: true },
    bike_id: { type: Number, required: true },
    employee_id: { type: Number, required: true },
    customer_name: { type: String, required: true },
    date_of_sale: { type: Date, default: Date.now },
    sale_amount: { type: Number, required: true },
    payment_status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' }
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
