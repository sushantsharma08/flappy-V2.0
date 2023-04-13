import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { UserModel } from "../models/User.js";

const router = express.Router();

router.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({
            message:"user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,8);
    const newUser = new UserModel({username,password:hashedPassword});

    await newUser.save();

    res.json(
        newUser)
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});
    
    if(!user){
        return res.json({message:"User Doesn't Exist!"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"User Password not valid!!!"})
    }

    const token = jwt.sign({id:user._id},"secret");
    res.json({token,userID: user._id })
})


router.get("/user/:name",async (req,res)=>{

    try {
        const user = await UserModel.findOne({username:req.params.name});
        res.json(user);
    } catch (error) {
        
    }
})

export { router as UserRouter}
