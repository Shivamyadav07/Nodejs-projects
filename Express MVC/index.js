const express=require("express");
const mongoose=require("mongoose");
const { stringify } = require("querystring");

const app=express();

const UserSchema=mongoose.Schema({
    firstName:{type:string,required:true},
    lastName:{type:string,required:true},
    gender:{type:string,required:true},
    dateofBirth:{type:Number,required:true},
    type:{type:string,required:true},
},
{
    timestamp:true,
});

const User=mongoose.model("/user",UserSchema);

const StudentSchema=mongoose.Schema({
    rool_id:{type:string,required:true},
    current_batch:{type:string,required:true},
},
{
    timestamp:true,
})

const Student=mongoose.model("student",StudentSchema);

const BatchSchema=mongoose.Schema({
    batch_name:{type:string,required:true},
},
{
    timestamp:true,
});

const Batch=mongoose.model("batch",BatchSchema);

const EvaluationSchema=mongoose.Schema({
    date_of_evaluation:{type:string,required:true},
    instructor:{type:string,required:true},
    batch_id:{type:string,required:true},
});

const Evaluation=mongoose.model("evaluation",EvaluationSchema);


const SubmissionSchema=mongoose.model({
    evaluation_id:{type:Number,required:true},
})