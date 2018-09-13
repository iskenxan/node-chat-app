var socket = io();

socket.on('connect', function() {
  console.log('Connected to the server')
});

socket.on('newMessage', function (data) {
  console.log('New Message:', data);
});
