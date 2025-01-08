const Workout = require('../schema/workoutSchema');
const mongoose = require('mongoose');


//get all workouts
const getAllWorkouts = async function(req,res){
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}
//get single workout
const getSingleWorkout = async function(req,res){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    try{
        const workout = await Workout.findById(id);
        if(!workout){
            throw new Error("ID cannot be found");
        }
        else{
            res.status(200).json(workout);
        }
    }
    catch(e){
        return res.status(404).json({error: e.message});
    }    
}
//create new workout
const createWorkout = async function(req,res){
    const {title, load, reps} = req.body;
    try{
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }catch(error){
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
}
//delete a workout
const deleteWorkout = async function(req,res){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a valid ID"});
    }
    try{
        const workout = await Workout.findOneAndDelete({_id: id});
        if(!workout){
            throw new Error("Could not find ID "+ id + " in Database");
        }
        else{
            return res.status(200).json(workout);
        }
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({error: e.message});
    }
}
//update workout
const updateWorkout = async function(req,res){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a valid ID"});
    };
    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        if(!workout){
            throw new Error("No object exists for that ID");
        }
        else{
            return res.status(200).json(workout);
        }
    }
    catch(e){
        res.status(404).json({error: e.message});
    }
}
const findWorkout = async function(req,res){
    const{title} = req.query;
    if(!title || !(typeof title==="String")){
        return res.status(400).json({error:"Not a valid Workout Name"})
    }
    try{
        const workout = await Workout.find({title: title});
        if(!workout){
            throw new Error("No "+title+" workout exists");
        }
        else{
            return res.status(200).json(workout);
        }
    }catch(error){
        console.log(error.message);
        res.status(404).json({error:error.message});
    }
}

module.exports = {findWorkout, updateWorkout,deleteWorkout,getSingleWorkout, getAllWorkouts, createWorkout};