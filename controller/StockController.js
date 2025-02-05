const Bike = require('../model/Stock')
exports.getAllBikes = async(req,res)=>{
    try{
        const bikes = await Bike.find()
        res.json(bikes)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
exports.getOneBike = async(req,res)=>{
    try{
        const bike = await Bike.findOne({bike_id:req.params.id})
        res.json(bike)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
exports.addNewBike = async (req, res) => {
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
exports.updateBike = async(req,res)=>{
    try{
        const bike = req.body
        const check = await Bike.findOne({bike_id:bike.bike_id})
        if(check){
            await Bike.updateOne({bike_id:req.body.bike_id},bike)
            res.json(await Bike.findOne({bike_id:bike.bike_id}))
        }
        else{
            res.status(404).json({msg:'Bike doesnt exist'})
        }
    }
    catch(err){
        res.json({msg: err.message})
    }
}
exports.deleteBike = async(req,res)=>{
    try{
        const bike = await Bike.findOne({bike_id: req.params.id})
        if(bike){
            await Bike.deleteOne({bike_id:bike.bike_id})
            res.json(bike)
        }
        else
        res.json({msg:'Bike doesnt exist!!'})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}