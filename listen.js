const { http } = require('./app');

const PORT = process.env.PORT || 8000;

http.listen(PORT, () => {
  console.log('listening on ' + PORT);
});
