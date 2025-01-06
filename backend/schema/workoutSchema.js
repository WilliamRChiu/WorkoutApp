const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const workoutSchema = new Schema({
    title: {
        type: String,
        required : true,
    },
    reps: {
        type: Number,
        required : true,
    },
    load: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('Workout',workoutSchema);

workoutSchema.methods.getWorkout = function(){
    console.log(this);
}
