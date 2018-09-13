const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', '/public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user joined');

  io.emit('newMessage', {
    from: 'Chat Admin',
    text: "New user joined the chat!",
    createdAt: new Date().toDateString()
  });

  socket.on('createMessage', data => {
    io.emit('newMessage', {
      ...data,
      createdAt: new Date().toDateString()
    })
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});