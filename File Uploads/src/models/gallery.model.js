const {  mongoose } = require("mongoose");

const GallerySchema=new mongoose.Schema(
    {
        user_pictures:{type:String,required:true},

        user_id:{type:mongoose.Schema.Type.ObjectID,
        ref:user,required:true},
    }
);

module.exports=GallerySchema;