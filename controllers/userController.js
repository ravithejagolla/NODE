import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken'
import argon from 'argon2'


//L1
//Create new User
export const createUser = async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const user = new User({ name, email });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      next(error); 
    }
  };



//Get all users

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); 
  }
};


//L2  Register and Login functions

export const register=async (req,res) => {
    const {name,password,email}=req.body

    const student=new User({
        name:name,
        password:password,
        email:email
    })
    await student.save()
    res.status(200).json({
        msg:"User signup successfull"
    })
}

export const login=async (req,res) => {
    const {email}=req.body
    const student=await User.find({
        email
    })
    const jwtpassword=process.env.Password
    iscorrectUser=argon.verify(User.password,password)
    if(iscorrectUser){
        const token=jwt.sign({
            id:__id,
            name:name,
        },jwtpassword)
        res.status(201).json({
            msg:"student logged in successfully",
            token
        })
    }else{
        res.status(401).json({
            msg:"student is Unauthorised"
        })
    }
}

