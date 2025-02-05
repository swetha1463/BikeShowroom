const express = require('express')
const app = express()
const mongoose = require('mongoose')

const StockRoutes = require('./routes/StockRoutes')
const CustomerRoutes = require('./routes/CustomerRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const dealerRoutes = require('./routes/dealerRoutes')
const salesRoutes = require('./routes/salesRoutes')

app.use(express.json())
app.use("",StockRoutes)
app.use("",CustomerRoutes)
app.use("", employeeRoutes)
app.use("", dealerRoutes)
app.use("", salesRoutes)

mongoose.connect('mongodb+srv://swetha1625:Swetha1625@mycluster.2ewox.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster')
.then(()=>console.log('Database connected'))
.catch((err)=>console.log(err))

app.listen('5000',()=>console.log('Server running on 5000'))

app.get('/',(req,res)=>res.send('Server reacted...'))
