var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){          //when a new connection is established

  socket.on('chat', function(data){            //on receiving chat messages from client
  	
    io.emit('chat', data);                     //send received messages to all clients including client who sent it
    //using io.emit() so that client who sent the data also receives it 
  });

  socket.on('move', function(data){            //on receiving mouse move events from clients

  	socket.broadcast.emit('move', data);       //send received data to all clients except the client who sent it 
    //using broadcast so that client who sent the data does not receive it
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

