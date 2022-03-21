const User = require("../model/user.model");
var jwt = require("jsonwebtoken");
require('dotenv').config()


const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send({ message: "email already exists" });
    } else {
      user = await User.create(req.body);

      // ---------------------------------------------generating token ---------------------------------------------

      var token = jwt.sign({ user }, process.env.master_key);

      res.status(200).send({ user, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user =await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).send("email or pasword does't match");
    }

    // --------------------------------------------------------------------method to check pasword------------------

    const match = user.checkPasword(req.body.pasword)

    if (!match) {
      res.status(400).send("email or pasword does't match");
    }
// --------------------------------------------------generating token----------------------------------------
    var token = jwt.sign({ user }, process.env.master_key);
    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    res.send({ error_message: err.message });
  }
};

// module.exports=register;
// module.export=login;

module.exports = { register, login };
