// node server-->handles socketio connections
   const io =require('socket.io')(8000,{
      cors: {
         origin :"*"
      }
   });

   const users ={};
// scoket.io is a single connection
// io.on -->it listens no. of socket connections 
   io.on('connection',socket=>{
      socket.on('new-user-joined',name=>{
         users[socket.id]=name;
        
         // save name in type of socket.id in users ..
         // when user joined the chat 
         socket.broadcast.emit('user-joined',name)
         // console.log("newuser",name)

      })

      // the text inside quoataions are random and can be named anything ..

      // when we use .on it takes a name and a callback function
      socket.on('send',message=>{
         socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
         // {message:message,name:users[socket.id]}--> this is a class.
      });
      socket.on("disconnect",message=>{
         socket.broadcast.emit('leave',users[socket.id]);
         delete users[socket.id]
      })
   });

  