const users = [];
const { format, addMinutes } = require('date-fns');

const roomPassGen = (room) => {
  return `${room}#${Math.floor(Math.random() * (999999 - 100000)) + 100000}`;
};

const addUser = ({ id, user_id, user_name, roomPass }) => {
  const user = { id, user_id, user_name, roomPass };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((index) => index.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.roomPass === room);
};

const timeCalc = (time) => {
  return addMinutes(new Date(), time);
};

const seekTimeCalc = () => {};

module.exports = {
  roomPassGen,
  removeUser,
  addUser,
  getUser,
  getUsersInRoom,
  timeCalc,
};
