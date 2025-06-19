const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const bodyParser = require('body-parser');
const app = express();


 
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}))
let authRouter= require('./routes/oauth');
// let requestRouter=require('./routes/request')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api",router)
app.use('/oauth',authRouter)
// app.use('/request',requestRouter)
const PORT = 8080 || process.env.PORT



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+ PORT)
    })
})


