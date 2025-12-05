//create server
import express from 'express';
import cors from 'cors';
import {connect} from 'mongoose';
import cookieParser from 'cookie-parser';
import {userRouter} from './API/UserAPI.js';

const app = express();

//enable cors
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
//body parser middleware
app.use(express.json());
//cookie parser middleware
app.use(cookieParser());

//if path starts with /user-api, then use userRouter
app.use('/user-api', userRouter);

//connect to database
async function connectDBAndStartServer  () {
    try{
        await connect('mongodb://127.0.0.1:27017/todo-app')
        console.log('Connected to database');
        app.listen(8000,
            console.log('Server is running on port 8000')
        );
    }catch(err){
        console.log('Error connecting to database', err);
    }
}


export default connectDBAndStartServer();