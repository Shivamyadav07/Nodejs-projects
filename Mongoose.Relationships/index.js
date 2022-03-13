const express = require("express")
const mongoose = require("mongoose")

const app = express();

app.use(express.json());

const connectDB = function () {
    mongoose.connect("mongodb://127.0.0.1:27017/Library");
}

const sectionSchema = mongoose.Schema({

    section_name: { type: String, required: true }

});

const Section = mongoose.model("section", sectionSchema);

app.get("/sections", async (req, res) => {
    try {
        const section = await Section.find({})
            .lean()
            .exec();
        return res.status(200).send({ "section": section });

    } catch (err) {
        console.log("err:", err);
        return res.status(500).send({ "somthing went wrong": err });
    }
});

app.post("/sections", async (req, res) => {
    try {
        const section = await Section.create(req.body);
        return res.status(201).send({ "section": section });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ "somthing went wrong": err });
    }
});

//finding books in a section ---------------------------------------------------------------------------------
app.get("/sections/:sections_id/book",async(req,res)=>{

    try{
        const book=await Book.find({sections_id:req.params.sections_id}).lean().exec();
        res.status(201).send({"books":book})
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});




const bookSchema = mongoose.Schema({

    book_name: { type: String, required: true },
    book_body: { type: String, required: true },

    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true,
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },

});

const Book = mongoose.model("/book", bookSchema);

app.get("/book", async (req, res) => {
    try {
        const book = await Book.find({}).lean().exec();
        res.status(201).send({ "books": book })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post("/book", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).send({ "books": book })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})







const authorSchema = mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
});

const Author = mongoose.model("/author", authorSchema);

app.get("/author", async (req, res) => {

    try {
        const author = await Author.find({}).lean().exec();
        res.status(201).send({ "author": author })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ "somthing went wrong :": err });
    }
})

app.post("/author", async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).send({ "author": author })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ "somthing went wrong :": err });
    }
});

app.delete("/author/:id",async(req,res)=>{
    try {
        const author = await Author.findByIdAndDelete(req.params.id)
        res.status(201).send({ "author": author })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ "somthing went wrong :": err });
    }
});

app.get("/author/:author_id/book",async(req,res)=>{
    try{
        const book=await Book.find({author_id:req.params.author_id}).lean().exec();
        res.status(201).send({"books":book});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});



app.listen(5000, async function (req, res) {
    try {
        await connectDB();
        console.log("listning at port 5000")
    } catch (err) {
        console.log("err:", err);
    }

})