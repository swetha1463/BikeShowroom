const Customer = require('../model/Customer');
const Stock = require('../model/Stock');


const authenticateUser = async (req, res, next) => {
    const { user_name, password } = req.headers;

    if (!user_name || !password) {
        return res.status(401).json({ msg: 'Authentication required: Please provide username and password.' });
    }

    try {
        const user = await Customer.findOne({ user_name, password });
        if (!user) {
            return res.status(403).json({ msg: 'Invalid credentials.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getAllCustomer = [authenticateUser, async (req, res) => {
    try {
        const Customers = await Customer.find();
        res.json(Customers);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}];

exports.getOneCustomer = [authenticateUser, async (req, res) => {
    try {
        const customer = await Customer.findOne({ Customer_id: req.params.id });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}];

exports.addNewCustomer = async (req, res) => {
    try {
        const existingCustomer = await Customer.findOne({ Customer_id: req.body.Customer_id });

        if (!existingCustomer) {
            const addedCustomer = await Customer.create(req.body);
            res.json(addedCustomer);

            const orderedBikes = req.body.OrderedBikeId;

            for (let bike of orderedBikes) {
                const stockBike = await Stock.findOne({ bike_id: bike.bike_id });
                if (stockBike && stockBike.quantity_available > 0) {
                    stockBike.quantity_available -= 1;
                    stockBike.quantity_sold += 1;
                    await stockBike.save();
                } else {
                    console.log(`Bike ID ${bike.bike_id} is not available in stock or out of stock.`);
                }
            }
        } else {
            res.json({ msg: 'Customer already exists!!' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateCustomer = [authenticateUser, async (req, res) => {
    try {
        const customerData = req.body;
        const existingCustomer = await Customer.findOne({ Customer_id: customerData.Customer_id });

        if (existingCustomer) {
            for (let bike of existingCustomer.OrderedBikeId) {
                const stockBike = await Stock.findOne({ bike_id: bike.bike_id });
                if (stockBike) {
                    stockBike.quantity_available += 1;
                    stockBike.quantity_sold -= 1;
                    await stockBike.save();
                }
            }

            await Customer.updateOne({ Customer_id: req.body.Customer_id }, customerData);

            for (let bike of customerData.OrderedBikeId) {
                const stockBike = await Stock.findOne({ bike_id: bike.bike_id });
                if (stockBike && stockBike.quantity_available > 0) {
                    stockBike.quantity_available -= 1;
                    stockBike.quantity_sold += 1;
                    await stockBike.save();
                } else {
                    console.log(`Bike ID ${bike.bike_id} is not available in stock or out of stock.`);
                }
            }

            res.json(await Customer.findOne({ Customer_id: customerData.Customer_id }));
        } else {
            res.status(404).json({ msg: 'Customer does not exist' });
        }
    } catch (err) {
        res.json({ msg: err.message });
    }
}];

exports.deleteCustomer = [authenticateUser, async (req, res) => {
    try {
        const customer = await Customer.findOne({ Customer_id: req.params.id });
        if (customer) {
            await Customer.deleteOne({ Customer_id: customer.Customer_id });
            res.json(customer);
        } else {
            res.json({ msg: 'Customer does not exist!!' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}];
