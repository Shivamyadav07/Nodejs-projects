const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.schema");

const router = express.Router();

router.post(
  "/",
  body("email").isEmail().withMessage("Enter a valid email ID"),
  body("pincode").isLength({ min:6,max:6 }).withMessage("Pincode should be exactally of 6 digit"),
  body("age").custom((value)=>{
      if(value<1 || value>100)
      {
          throw new Error("Incorrect age provided");
      }
      return true;
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user =await User.create(req.body);
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ "messsage": err.messsage });
    }
  }
);

module.exports=router;
