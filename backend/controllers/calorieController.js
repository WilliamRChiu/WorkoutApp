const Calorie = require("../schema/foodSchema");
const mongoose = require("mongoose");

//this gets meals on all time
const getAllMeals = async function(req,res){
    const meals = await Calorie.find({}).sort({createdAt: -1});
    res.status(200).json(meals);
}
//this gets meals for a specific date
const getDayMeal = async function(req,res){
    const{Day,Month,Year} = req.query;
    if(isNaN(Year)||Year<0){
        res.status(400).json({error: "Invalid Year"});
    }
    else if(isNaN(Month) || Month<1 || Month>12){
        res.status(400).json({error: "Invalid Month"});
    }
    else if(isNaN(Day) || Day<0){
        if(Month==1||Month==3||Month==5||Month==7||Month==8||Month==10||Month==12){
            if(Day>31){
                res.status(400).json({error:"Invalid Day"});
            }
        }
        else if(Month==2){
            if(Year%4!=0){
                if(Day>28){
                    res.status(400).json({error:"Invalid Day"});
                }
            }
            else{
                if(Day>29){
                    res.status(400).json({error:"Invalid Day"});
                }
            }
        }
        else{
            if(Day>30){
                res.status(400).json({error:"Invalid Day"});
            }
        }
    }
    try{
        const currentDate = new Date(Number(Year), Number(Month), Number(Day));
        const meals = await Calorie.find({
            createdAt:{currentDate}
        });
        if(!meals){
            throw new Error("No meals recorded during this Date");
        }
        else{
            return res.status(200).json(meals);
        }
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({error:e.message})
    }
}


//this will get meals for a specific week
const getWeekMeal = async function(req,res){
    const{Year, Month, Week} = req.query
}

//this gets meals for a specific month
const getMonthMeal = async function(req,res){
    const{Year, Month} = req.query;
    if(isNaN(Year)||Year<0){
        return res.status(400).json({error: "Invalid Year"});
    }
    else if(isNaN(Month) || Month<1 || Month>12){
        return res.status(404).json({error: "Invalid Month"});
    }
    try{
        //Find the meals in the corresponding month and year
        const startDate = new Date(Number(Year), Number(Month)-1,1);
        const endDate = new Date(Number(Year), Number(Month),1);

        const meals = await Calorie.find({
            createdAt:{
                $gte: startDate,
                $lte: endDate
            },
        })
        if(!meals){
            throw new Error("No meals found for specified month and year");
        }
        else{
            return res.status(200).json(meals);
        }
    }
    catch(e){
        console.log("Error fetching meals: ", e.message);
        return res.status(400).json({error:e.message})

    }
}


//This gets a form to upload meals for the (/) route
const uploadMeal = async function(req,res){
    const{Title, Calories,Protein} = req.body;
    try{
        const meal = await Calorie.create({Title,Calories,Protein});
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

module.exports = {getDayMeal, getMonthMeal, getAllMeals, deleteSpecificMeal, updateSpecificMeal, uploadMeal};