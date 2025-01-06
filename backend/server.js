require('dotenv').config()

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const workout = require('./router/workoutRouter');
Port = process.env.Port;

app.use(express.json());
app.use(cors({origin : "http://localhost:3000"}));


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});


//Routes
app.use('/api/workouts',workout);


//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(Port,()=>{
        console.log(`db connected, listening on http://localhost:${Port}/`);
    });
})
.catch(e=>{console.log("Error connecting to database:" + e)});


//lets me read jsons sent from browser for post and patch


app.get('/',(req,res)=>{
    res.json({message:"Welcome to the app"});
});
