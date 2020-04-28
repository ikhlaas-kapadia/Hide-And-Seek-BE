const mongoose = require("mongoose");
const validator = require("validator");
const {
  encryptPassword,
  authUser,
  generateToken,
} = require("../utils/file-auth");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

const signInUser = async ({ user_name, password }) => {
  const user = await User.findOne({ user_name });
  console.log(user)
  if (!user) {
    return Promise.reject({
      status: 401,
      msg: "Username/Password is incorrect",
    });
  }
  const auth = await authUser(password, user.password);
  console.log(auth)
  if (!auth) {
    return Promise.reject({
      status: 401,
      msg: "Username/Password is incorrect",
    });
  }
  const token = generateToken(user_name);
  return { id: user.id, user_name: user.user_name, token };
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
  return { id: newUser._id, user_name: newUser.user_name };
};

module.exports = { signInUser, registerUser, User };
