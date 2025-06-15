const express =require('express')

const cors=require('cors')

const authRoutes = require('./ROUTES/authRoute')

const PORT =8000

require('dotenv').config()
require('./db')


// create app using express 
const app=express()

// use express json
app.use(express.json())

// use cors for permission to accesss from any link .its a middleware
app.use(cors())

app.use(authRoutes)

app.get('/',(req,res)=>{
    res.json({all: "okay"})
})

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:8000/ `)
})