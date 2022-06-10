const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

//App Config
const app = express();

//routes
const authRoute = require('./routes/Auth');
const postRoute = require('./routes/post')

//middlewares
app.use(express.json())
app.use('/api/blog', authRoute);
app.use('/api/blog/posts', postRoute);
//connect database
mongoose.connect(process.env.MONGO_URI).then(console.log('CONNECTED TO DATABASE')).catch((error)=>console.log(err))

const port = process.env.PORT || 8080;
app.listen(port, () =>{console.log(`Server is listening on port http://localhost:${port}`)})