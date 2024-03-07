const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
