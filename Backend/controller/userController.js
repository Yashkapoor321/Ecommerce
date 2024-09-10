const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


 //                                        Register/signUp
const createUser = async(req, res) => {
    try {
        const {firstname, lastname, email, mobile, password} = req.body;
        const userExist = await userModel.findOne({email});
        //userExist or not
        if(userExist){
            return res.status(400).json({
                message : "user is already exist",
                success : false
            })
        }
        // Create new user validations
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
        //password hashed
            const hashPassword = await bcrypt.hashSync(password, 10);

        const newUserRegister = await userModel.create({
            ...req.body,
            password : hashPassword
        })
        return res.status(201).json({
            message : "Account created successfully",
            success : true,
            result : newUserRegister
        })

    } catch (error) {
        console.log("createUser error ", error);
    }
}


//                                              Login
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };
        //userExist or not
        const user = await userModel.findOne({email});
        // console.log(user);
        if(!user){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            }) 
        }
        //check password match or not
        const isPasswordMatch = await bcrypt.compareSync(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorect password",
                success: false
            });
        }
        // for Jwt token store
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "7d" });

         //logged in user details
        return res.status(200).cookie("token", token, { expiresIn: "7d", httpOnly: true }).json({
            message: `Welcome ${user.firstname} ${user.lastname}`,
            success: true,
            Data  :  "loggedIn user details is given below", 
            _id :  user._id,
            firstname : user.firstname,
            lastname : user.lastname,
            mobile : user.mobile,
            email : user.email,
            token : token
        })
    } catch (error) {
        console.log("login error ", error);
    }
}


const userController = {
    createUser,
    login
};


module.exports = userController;