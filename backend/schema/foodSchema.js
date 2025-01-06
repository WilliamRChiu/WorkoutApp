const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const foodSchema = new Schema({
    title:{
        type: String,
        required: true,
        minLength: 3
    },
    Calories:{
        type: Number,
        require: true
    },
    Protein:{
        type: Number,
        minimum: 0,
    }
    //Can add a JSON object within the JSON object to list out specific nutrients
}, {timestamps : true});

module.exports = mongoose.model("Calories", foodSchema);