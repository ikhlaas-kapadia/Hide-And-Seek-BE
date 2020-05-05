const usersRouter = require('express').Router();
const multer = require('multer');
const { authToken } = require('../utils/auth-util');

const {
  loginUser,
  postUser,
  patchUser,
} = require('../controllers/users.controller');

const avatarUpload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb({ name: 'FileFormat', msg: 'File must be jpeg or png' });
    }
    cb(undefined, true);
  },
});

usersRouter.route('/login').post(loginUser);
usersRouter.route('/register').post(postUser);
usersRouter.patch(
  '/profile',
  authToken,
  avatarUpload.single('avatar'),
  patchUser
);

module.exports = { usersRouter };
