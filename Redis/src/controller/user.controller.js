const express = require("express");

const User = require("../module/user.module");

const client = require("../config/redis.connect");
const { json } = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const users = await User.find({}).lean().exec();

    client.set("users", JSON.stringify(users));

    return res.status(200).send(user);
  } catch (err) {
    console.log({ postError: err });
    res.status(500).send({ postError: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    client.get("users", async (err, fetchedUsers){
      if (fetchedUsers) {
        const users = JSON.parse(fetchedUsers);
      } else {
        try {
          const users = await User.find({}).lean().exec();
          client.set("users", JSON.stringify(users));

          return res.status(200).send({ users, redis: false });


        } catch (err) {
          return res.status(500).send({ getError: err.message });
        }
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    client.get(`users.${req.params.id}`, async function (err, fetchedUsers) {
      if (fetchedUsers) {
        const user = JSON.parse(fetchedUsers);

        return res.status(200).send(user)
      } else {
        try {
          const user = await User.findById(req.params.id).lean().exec();

          client.set(`users.${req.params.id}`, JSON.stringify(users));

          return res.status(200).send({ user });
        } catch (err) {

          return res.status(500).send({ message: err.message });

        }


      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});


router.patch("/:id",async(req,res)=>{
  try{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

    const users=await User.find().lean().exec(); 

    client.set(`users.${req.params.id}`,JSON.stringify(user));

    client.set("users",JSON.stringify(users));

    return res.status(200).send(user);
  }catch(err){
    console.log(err);
    res.status(500).send(user);
  }
});


router.delete("/:id",async(req,res)=>{
  try{
    const user=await User.findByIdAndDelete(req.params.id).lean().exec();

    const users=await Users.find().lean().exec();

    client.del(`users,${req.params.id}`);
    client.set("users",JSON.stringify(users));

    return res.status(500).send(user);
  }catch(err){
    console.log(err);
    res.status(500).send({message:err.message});
  }
});


module.exports=router;