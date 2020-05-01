const {
  roomPassGen,
  addUser,
  getUsersInRoom,
  removeUser,
} = require('../utils/sockets-util');
const { format } = require('date-fns');

const sockets = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected');
    // create a game lobby event

    socket.on('createRoom', (event) => {
      const roomPass = roomPassGen(event.room);
      socket.join(roomPass);
      addUser({
        id: socket.id,
        user_name: event.user_name,
        roomPass: roomPass,
      });
      socket.emit('createRoom', {
        user_name: event.user_name,
        roomName: event.room,
        roomPassword: roomPass,
        users: getUsersInRoom(roomPass),
      });
    });

    // join a game lobby event

    socket.on('joinRoom', (event) => {
      socket.join(event.roomPass);
      addUser({
        id: socket.id,
        user_name: event.user_name,
        roomPass: event.roomPass,
      });
      socket.to(event.roomPass).emit('usersUpdate', {
        msg: `${event.user_name} has join the game!`,
        users: getUsersInRoom(event.roomPass),
      });
    });

    // leave a game lobby event

    socket.on('leaveRoom', () => {
      const user = removeUser(socket.id);
      io.to(user.roomPass).emit('usersUpdate', {
        msg: `${user.user_name} has left the game!`,
        users: getUsersInRoom(user.roomPass),
      });
    });

    // send message in chat

    socket.on('sendMsg', (event) => {
      socket.to(event.roomPass).emit('sendMsg', {
        msg: event.msg,
        user_name: event.user_name,
        date: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      });
    });

    // seeker position change
    socket.on('seekerPosition', (event) => {
      socket.to(event.roomPass).emit('seekerPosition', {
        user_name: event.user_name,
        longitude: event.longitude,
        latitude: event.latitude,
      });
    });

    // hider set position
    socket.on('hiderPosition', (event) => {
      socket.to(event.roomPass).emit('hiderPosition', {
        user_name: event.user_name,
        longitude: event.longitude,
        latitude: event.latitude,
      });
    });

    // hider send clue
    socket.on('sendClue', (event) => {
      socket.to(event.roomPass).emit('sendClue', {
        msg: event.msg,
        user_name: event.user_name,
        date: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      });
    });

    // distance alert
    socket.on('distanceAlert', (event) => {
      socket.to(event.roomPass).emit('distanceAlert', {
        msg: `You are ${event.distance}m away from the ${event.hider}!`,
        distance: event.distance,
      });
    });

    // end game
    socket.on('endGame', (event) => {
      socket.to(event.roomPass).emit('endGame', {
        winner: event.winner,
      });
    });

    // disconnect from server

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('usersUpdate', {
          msg: `${user.user_name} has left the game!`,
          users: getUsersInRoom(user.roomPass),
        });
      }
    });
  });
};

module.exports = sockets;
