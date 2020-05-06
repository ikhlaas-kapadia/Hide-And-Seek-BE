const mongoose = require('mongoose');
const validator = require('validator');
const sharp = require('sharp');
const { userImage } = require('../utils/image-data');
const {
  encryptPassword,
  authUser,
  generateToken,
} = require('../utils/auth-util');
const fs = require('fs').promises;

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
          throw new Error('email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password must not include password');
        }
      },
    },
    avatar: {
      type: Buffer,
      default: userImage,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);

const signInUser = async ({ user_name, password }) => {
  const user = await User.findOne({ user_name });
  if (!user) {
    return Promise.reject({
      status: 401,
      msg: 'Username/Password is incorrect',
    });
  }
  const auth = await authUser(password, user.password);
  if (!auth) {
    return Promise.reject({
      status: 401,
      msg: 'Username/Password is incorrect',
    });
  }
  const token = generateToken(user_name);
  return {
    id: user.id,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    token,
  };
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

const updateUser = async ({ file, body }) => {
  const image = await sharp(file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  imageData = image.toString('binary');

  const imgPath = `${__dirname}/../public/avatars/${body.user_id}.png`;
  fs.writeFile(imgPath, imageData, 'binary', (err) => {});

  // const userUpdate = await User.findOneAndUpdate(
  //   { _id: body.user_id },
  //   { avatar: buffer }
  // );
  // return userUpdate;
};

module.exports = { signInUser, registerUser, updateUser, User };
