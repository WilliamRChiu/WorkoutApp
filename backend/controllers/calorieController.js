const Calorie = require("../schema/foodSchema");
const mongoose = require("mongoose");

//this gets meals on all time
const getAllMeals = async function(req,res){
    const meals = await Calorie.find({}).sort({createdAt: -1});
    res.status(200).json(meals);
}
//this gets meals for a specific date
const getDayMeal = async function(req,res){
    const{day,month,year} = req.query;
    
}


//this will get meals for a specific week
const getWeekMeal = async function(req,res){

}

//this gets meals for a specific month
const getMonthMeal = async function(req,res){
    const{Year, Month} = req.query;
    if(isNaN(Year)){
        res.status(404).json({error: "Invalid Year"});
    }
    else if(isNaN(Month) || Month<0 || Month>12){
        res.status(404).json({error: "Invalid Month"});
    }
    try{
        //Find the meals in the corresponding month and year
        
    }
    catch(e){

    }
}


//This gets a form to upload meals for the (/) route
const uploadMeal = async function(req,res){
    const{title, calories,protein} = req.body;
    try{
        const meal = await Calorie.create({title,calories,protein});
        res.status(200).json(meal);
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({message: e.message});
    }
}


//This deletes a specific meal
const deleteSpecificMeal = async function(req,res){
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Invalid meal ID"});
    }
    try{
        const meal = await Calorie.findOneAndDelete({_id: id});
        if(!meal){
            throw new Error("Could not find meal with specified ID");
        }
        else{
            return res.status(200).json(meal);
        }
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({error: e.message});
    }
}

const updateSpecificMeal = async function(req,res){
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Invalid meal ID"});
    }
    try{
        const meal = await Calorie.findByIdAndUpdate({_id: id}, {...req.body});
        if(!meal){
            throw new Error("Could not find meal with specified ID");
        }
        else{
            return res.status(200).json(meal);
        }
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({error: e.message});
    }
}

module.exports = {getAllMeals, deleteSpecificMeal, updateSpecificMeal, uploadMeal};