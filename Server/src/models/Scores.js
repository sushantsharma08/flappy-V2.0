import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    score:{type:Number,required:true}
});

export const ScoreModel = mongoose.model("scores",ScoreSchema)