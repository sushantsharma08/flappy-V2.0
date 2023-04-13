import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
    name:{type:String,required:true},
    score:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
});

export const ScoreModel = mongoose.model("scores",ScoreSchema)