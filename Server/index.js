import express from "express";
import cors from 'cors';
import {UserRouter} from './src/routes/user.js'
import mongoose from 'mongoose';
import { ScoreRouter } from "./src/routes/score.js";

const app= express();
app.use(express.json());
app.use(cors());


app.use('/auth',UserRouter);
app.use('/score',ScoreRouter);

mongoose.connect("mongodb+srv://sushantsharmadev:flappy2@flappy2-0.sua2p9z.mongodb.net/flappy2-0?retryWrites=true&w=majority")


app.listen(3001,()=>{
    console.log('Server up!');
})