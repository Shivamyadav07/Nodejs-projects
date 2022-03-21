const express = require("express");
const User = require("../model/user.model");
const router = express.Router();
const authentication=require("../middleware/authentication")

router.get("",authentication, async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    res.status(200).send({ users: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

router.post("",authentication, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", authentication,async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", authentication,async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
