const express=require("express");

const app=express();


// sending api with route "" also called home route---------------------------------
app.get("",function(req,res){
    res.send("hellow")
})


// sending api with rout /books ----------------------------------------------------
app.get("/books",function(req,res){
    var data=[{

        name:"Letting Go",
        author:"Philip Roth"
    },
    {
        name:"Fear of Flying",
        author:"Erica Jong"
    },
    {
        name:"Encyclopedia Brown,Boy Detective",
        author:"Donald J.Sobol"
    },
    {
        name:"When Breath Bcomes Air",
        author:"Paul Kalanithi"
    }];
   
    data=JSON.stringify(data);
    res.send(data);
});


app.listen(3000,function(){
    console.log("listning to port 3000 ");
});