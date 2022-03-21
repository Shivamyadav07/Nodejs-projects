require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.master_key, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

const authentication = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send({ message1: "authorization token not found" });

  if (!req.headers.authorization)
    return res.status(400).send({ message2: "authorization token not found" });

  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;

  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message3: "authorization token not found" });
  }

  console.log(decoded);
  // req.userId=decoded.user._id;

  return next();
};

module.exports = authentication;
