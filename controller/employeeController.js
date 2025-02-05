const Employee = require('../model/Employee');

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ msg: 'Employee created successfully', data: newEmployee });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employee_id: req.params.id });
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ msg: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.updateOne(
            { employee_id: req.body.employee_id },
            { $set: req.body }
        );

        if (updatedEmployee.matchedCount > 0) {
            res.json({ msg: 'Employee updated successfully' });
        } else {
            res.status(404).json({ msg: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.deleteOne({ employee_id: req.params.id });
        if (deletedEmployee.deletedCount > 0) {
            res.json({ msg: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
