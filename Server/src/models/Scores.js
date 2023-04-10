import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    score:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
});

export const ScoreModel = mongoose.model("recipes",ScoreSchema)