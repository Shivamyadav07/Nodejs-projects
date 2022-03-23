const express = require("express");

const User = require("../module/user.module");

const client =require("../config/redis.connect");
const { json } = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const users=await User.find({}).lean().exec();

    client.set("users",JSON.stringify(users));

     return res.status(200).send(user);
  } catch (err) {
    console.log({ postError: err });
    res.status(500).send({ postError: err.message });
  }
});
