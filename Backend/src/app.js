const express = require('express')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const authRoutes = require('./auth/authServer');



const app=express()

app.use(express.json())

app.use(cors())

app.get('/',(req,res) =>{
    res.send('hello world')
})

app.use('/ai',aiRoutes)
app.use('/auth', authRoutes);

module.exports= app;
