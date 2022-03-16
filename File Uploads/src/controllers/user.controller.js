const User = require("../models/user.model");

const express = require("express");

const router = express.Router();

const uploads = require("../middleware/upload");

router.get("", async (req, res) => {
  try {
    const user = await User.find({}).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
});

router.post("", uploads.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    res.status(200).send({ user: user });
  } catch (err) {
    console.log({ error: err });
    res.status(500).send({ error: err.message });
  }
});

router.post("/multiple", uploads.any("profile_pic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });

    const user = await User.create({
      firstName: req.body.firstName,
      last_name: req.body.last_name,
      profile_pic: filePaths,
    });

    return res.status(200).send(user);
  } catch (err) {
    console.log({ error: err });
    return res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user =await User.findByIdAndDelete(req.params.id);
    res.status(201).send({ deleateduser: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
