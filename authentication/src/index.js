const express=require("express");

const app=express();
app.use(express.json());

const usercontroller=require("./controllers/user.controller");
// const register=require("./controllers/authentication.controller");
// const login=require("./controllers/authentication.controller")
const {register,login}=require("./controllers/authentication.controller")

app.post("/register",register)
app.post("/login",login)
app.use("/user",usercontroller);

module.exports=app;