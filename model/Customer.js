const mongoose = require('mongoose')

const CustomerSchema = ({
    Customer_id: {
        type: Number,
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    orderedBikes:{
        type: String,
        required: true
    },
    OrderedBikeId:{
        type: Array,
        items:{
            type:Object,
            properties:{
                bike_id:{ type: Number, required: true},
                bike_model:{type: String, required: true},
                price:{type: Number, required: true}
            }
        }
    },
    user_name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    Card_type: {
        type: String
    }
})
const Customer = mongoose.model('Customers',CustomerSchema)
module.exports=Customer