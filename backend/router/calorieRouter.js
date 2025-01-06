const { Router } = require('express')
const calorieRouter = Router();
const{getAllMeals, deleteSpecificMeal, updateSpecificMeal, uploadMeal} = require('../controllers/calorieController');



calorieRouter.get('/',getAllMeals);

calorieRouter.post('/Upload', uploadMeal);


module.exports = calorieRouter