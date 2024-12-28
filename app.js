const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/userRotes');
const cors = require('cors');
const dbConnect = require('./config/db');
const path = require('path')

//dotenv configuration
dotenv.config('./env')

//database connection
dbConnect()

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use('/api/v1/', routes);


//static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})


//listening
app.listen(process.env.PORT, () => {
    // console.log(`server is Running on PORT ${process.env.PORT}`);
})