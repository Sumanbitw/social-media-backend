const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv/config")

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true, useUnifiedTopology: true }, () => {
    console.log("connected to DB")
})

app.use(morgan('dev'))
app.use(express.urlencoded({extended :true}))
app.use(express.json())
app.use(cors())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" 
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT', 'PATCH', 'DELETE', 'POST', 'GET')
        return res.status(200).json({})
    }
    next()
})

app.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Sociana Backend"
    })
})
app.use((req,res,next ) => {
    const error = new Error("Not found")
    res.status(404)
    next(error)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app