//create a user api 
import express from 'express';
import {hash,compare} from 'bcryptjs';
import {verifyToken} from '../Middleware/verifyToken.js';
import jwt from 'jsonwebtoken';
import {UserModel} from '../Models/UserModel.js';
import { use } from 'react';

const {sign}=jwt;
export const userRouter = express.Router();

//Route for User Registration
userRouter.post('/user', async (req, res) => {
    try{
        //get user Object
        const newUser= req.body;
        //hash the password
        const hashedPassword = await hash(newUser.password, 12);
        //store the hashed password
        newUser.password = hashedPassword;
        //create user document
        let newUserDoc=new UserModel(newUser);
        //save user document
        await newUserDoc.save();
        //send response
        res.status(201).json({message:"Registration successful"});
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});
//Route for User Authentication(login)
userRouter.post('/login', async (req, res) => {
    //get user credentials from request
    const userCredObj=req.body;
    //check if user exists
    let userInDB=await UserModel.findOne({email:userCredObj.email});
    if(userInDB===null){
        res.status(200).json({message:"Invalid Email"});
    }else{
        //compare password
        let isEqual= await compare(userCredObj.password,userInDB.password)
        if(isEqual===false){
            res.json({message:"Invalid password"})
        }else{
            //create token
            const encryptedtoken= sign({email:userCredObj.email},'abcdef',{expiresIn:'1h'});
            //Store token as httponly cookie
            res.cookie("token",encryptedtoken,{
                httpOnly:true,
                secure:true,
                sameSize:"none"
            })
            //send token to client
            res.status(200).json({message:"Login successful",payload:userInDB});
        }
    }
});

//Route for add task
userRouter.put('/todo/:userid',verifyToken, async (req, res) => {
    //get new task object
    let taskData=req.body;
    let newTask = {
        taskName: taskData.name,
        description: taskData.description || '',
        status: 'pending'
    };
    //get user id from url
    let userId=req.params.userid;
    //update user document
    let userAfterAddingTodo=await UserModel.findOneAndUpdate({_id:userId},{$push:{todos:newTask}}, {new: true});
    //send response
    res.status(200).json({message:"Task added successfully",payload:userAfterAddingTodo});
})

//route for edit task
userRouter.put('/edit-todo/userid/:userid/taskid/:taskid',verifyToken, async (req, res) => {
    //get task id from url
    let taskId=req.params.taskid;
    //get user id from url
    let userId=req.params.userid;
    //get updated task object
    let taskData=req.body;
    let updatedTask = {
        taskName: taskData.name,
        description: taskData.description || ''
    };
    //update user document
    let userAfterUpdatingTodo=await UserModel.findOneAndUpdate({_id:userId, "todos._id":taskId}, {$set:{"todos.$.taskName":updatedTask.taskName, "todos.$.description":updatedTask.description}}, {new: true});
    //send response
    res.status(200).json({message:"Task updated successfully", payload:userAfterUpdatingTodo});
})

//route for set task completed
userRouter.put('/edit-status/userid/:userid/taskid/:taskid',verifyToken, async (req, res) => {
    try{//get task id from url
    let taskId=req.params.taskid;
    //get user id from url
    let userId=req.params.userid;
    //update user document
    let userAfterUpdatingStatus=await UserModel.findOneAndUpdate(
        {_id:userId, "todos._id":taskId}, 
        {
            $set:{
            "todos.$.status":"completed",
            }
        }, 
        {new: true}
    );
    //send response
    res.status(200).json({message:"Task completed successfully", payload:userAfterUpdatingStatus});
    }catch(error){
        res.status(400).json({ message: error.message });
    }
})

//route for delete task
userRouter.put('/delete-todo/userid/:userid/taskid/:taskid',verifyToken,async (req, res) => {
    try{
    //get task id from url
    let taskId=req.params.taskid;
    //get user id from url
    let userId=req.params.userid;
    //update user document
    let userAfterDeletingTodo=await UserModel.findOneAndUpdate(
        {_id:userId}, 
        {$pull:{todos:{_id:taskId}}}, 
        {new: true}
    );
    //send response
    res.status(200).json({message:"Task deleted successfully", payload:userAfterDeletingTodo});
    }catch(error){
    res.status(400).json({ message: error.message });
    }
})

//get request handling route
userRouter.get('/users',verifyToken,async(req,res)=>{
    //read data from database 
    let userData= await UserModel.find()
    //send response
    res.json({message:"all users",payload:userData})
})