//create user schema and Model
//generate user model
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Email already exists"],
    },
    password: {
        type: String,
        required: true,
    },
    todos: [
        {
            taskName: { type: String, required: true },
            description: { type: String, required: true },
            status:{type:String, default:'pending'},
        },
    ],   
    },
    {
        versionKey: false,
        timestamps: true,
        strict: true,
    }
);

export const UserModel=model('user',userSchema)