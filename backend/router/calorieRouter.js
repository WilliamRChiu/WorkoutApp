const { Router } = require('express')
const calorieRouter = Router();
const{getDayMeal, getMonthMeal, getAllMeals, deleteSpecificMeal, updateSpecificMeal, uploadMeal} = require('../controllers/calorieController');



calorieRouter.get('/',getAllMeals);

calorieRouter.post('/Upload', uploadMeal);

calorieRouter.patch('/Update/:id',updateSpecificMeal);

calorieRouter.get('/dayMeals',getDayMeal);

calorieRouter.get('/monthMeals', getMonthMeal);

module.exports = calorieRouter