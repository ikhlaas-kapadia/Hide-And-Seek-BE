const mongoose = require("mongoose");
const validator = require("validator");
const { encryptPassword } = require("../utils/file-auth");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password must not include password");
        }
      },
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

const fetchUser = async () => {
  const user = await User.find({});
  return user;
};

const registerUser = async ({
  user_name,
  first_name,
  last_name,
  email,
  password,
}) => {
  const encrypt = await encryptPassword(password);
  const createUser = new User({
    user_name,
    first_name,
    last_name,
    email,
    password: encrypt,
  });
  const newUser = await createUser.save();
  return newUser;
};

module.exports = { fetchUser, registerUser };
