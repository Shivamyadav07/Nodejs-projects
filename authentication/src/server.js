const connect= require("./config/db.connect");
const app=require("./index");

app.listen(5000,async(req,res)=>{
    try{
        await connect();
        console.log("listning at port 5000");

    }catch(err)
    {
        console.log(err);
    }
})