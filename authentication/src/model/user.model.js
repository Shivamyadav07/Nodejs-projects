const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pasword: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", function (next) {
  this.pasword = bcrypt.hashSync(this.pasword, 5);
  return next();
});

userSchema.methods.checkPasword = function(pasword){
  return bcrypt.compareSync(pasword, this.pasword);
}

const User = mongoose.model("user", userSchema);

module.exports = User;
