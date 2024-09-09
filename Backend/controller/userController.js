const User = require("../models/userModel");
const bcrypt = require("bcrypt");

 //                                        Register/signUp
const createUser = async(req, res) => {
    try {
        const {firstname, lastname, email, mobile, password} = req.body;
        const userExist = await User.findOne(email);
        //userExist or not
        if(userExist){
            return res.status(400).json({
                message : "user is already exist",
                success : false
            })
        }
        // Create new user
        if(!firstname || !lastname  || !email  || !mobile || !password){
            return res.status(400).json({
                message : "All fields are required",
                success : false
            })
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({
                success : false,
                message : "Password must be at least 8 characters long and include one special character, one uppercase letter, and one numeric character."  
            })
        }
        

    } catch (error) {
        console.log("createUser error", error);
    }
}