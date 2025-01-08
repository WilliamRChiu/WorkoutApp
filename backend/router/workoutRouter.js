const { Router } = require("express");
const workoutRouter = Router();

// const Workout = require('../schema/workoutSchema');
const {
    findWorkout,
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

workoutRouter.get('/',getAllWorkouts);


workoutRouter.post('/',createWorkout);


workoutRouter.get('/:id', getSingleWorkout);


workoutRouter.delete('/:id',deleteWorkout);


workoutRouter.patch('/:id',updateWorkout);

workoutRouter.get('/search?title');

module.exports = workoutRouter