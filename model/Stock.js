const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    bike_id:{
        type:Number,
        required:true,
    },
    model_name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    engine_capacity: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    manufacture_year: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Reserved'],
      default: 'Available',
    },
    quantity_available: {
      type: Number,
      default: 0,
    },
    quantity_sold: {
      type: Number,
      default: 0,
    },
    reorder_level: {
      type: Number,
      default: 5,
    },
    location: {
      type: String,
    },
  });

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;
