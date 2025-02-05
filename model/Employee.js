const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employee_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    position: { type: String },
    department: { type: String },
    salary: { type: Number },
    date_of_joining: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
