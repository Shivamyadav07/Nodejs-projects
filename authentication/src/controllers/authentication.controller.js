const User = require("../model/user.model");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send({ message: "email already exists" });
    } else {
      user = await User.create(req.body);
      var token = jwt.sign({ user }, "masai");
      res.status(200).send({ user, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("email or pasword does't match");
    }

    const match = user.checkPasword(req.body.pasword)

    if (!match) {
      res.status(400).send("email or pasword does't match");
    }

    var token = jwt.sign({ user }, "masai");
    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    res.send({ error_message: err.message });
  }
};

// module.exports=register;
// module.export=login;

module.exports = { register, login };
