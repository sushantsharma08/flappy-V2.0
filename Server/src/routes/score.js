import express from "express";
import {ScoreModel} from "../models/Scores.js"
import { UserModel } from "../models/User.js";

const router = express.Router();

router.post("/",async(req,res)=>{
 const {name,score,userId}=req.body;
 const user = await UserModel.findOne({name});
 const scoreCard = new ScoreModel(req.body);
 try {
    res.json(scoreCard)
 } catch (error) {
    console.error(error)
 }
 await scoreCard.save()
});

router.get("/",async (req,res)=>{
    try {
        const scoreCards =await ScoreModel.find({});
        res.json(scoreCards)
    } catch (error) {
        res.json(error)
    }
})

router.get("/:userId", async (req,res)=>{

    try {
        const userScoreCard = await ScoreModel.findOne({userId:req.params.userId});
        res.json(
            userScoreCard.score
        )
        
    } catch (error) {
        
    }
})

router.patch("/:userId", async (req,res)=>{
    const {score}=req.body;
    const userScoreCard = await ScoreModel.findOneAndUpdate({userId:req.params.userId},req.body);
    try {
        res.json(
            userScoreCard
        )
        
    } catch (error) {
        
    }
})

export {router as ScoreRouter}