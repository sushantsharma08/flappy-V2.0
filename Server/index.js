import express from "express";
import cors from 'cors';
import {UserRouter} from './src/routes/user.js'
import mongoose from 'mongoose';
import { ScoreRouter } from "./src/routes/score.js";
import * as dotenv from "dotenv";

const app= express();
dotenv.config({path:"./config.env"});

app.use(express.json());
app.use(cors());

const port =process.env.PORT

app.use('/auth',UserRouter);
app.use('/score',ScoreRouter);

mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@flappy2-0.sua2p9z.mongodb.net/flappy2-0?retryWrites=true&w=majority`)


app.listen(port,()=>{
    console.log("Server Up!");
})