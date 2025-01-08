const User = require('../schema/userSchema')

const loginUser = async (req,res)=>{
    res.json({message: 'login user'})
}

const signupUser = async (req,res)=>{
    res.json({message: 'singup user'})
}

module.exports = {signupUser, loginUser}