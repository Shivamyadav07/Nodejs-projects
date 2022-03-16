const express=require("express");

const app=express();

app.use(express.json());

module.exports=app;

const usercontroller=require("./controllers/user.controller");

app.use("/users",usercontroller);