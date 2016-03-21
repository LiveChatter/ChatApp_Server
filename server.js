'use strict';

const Path = require('path');
const Hapi = require('hapi');
const SocketIO = require('socket.io');
const Inert = require('inert');
var currentName = [];

const server = new Hapi.Server({
  connections:{
    routes:{
      cors:true
    }
  }
});
server.connection({
    host: 'localhost',
    port: 8080
});

const io = SocketIO.listen(server.listener);
io.sockets.on('connection', (socket) => {

    socket.emit({ msg: 'welcome' });
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'POST',
        path: '/authenticate',
        handler: function (request, reply) {
          if (currentName.indexOf(request.payload.username.toLowerCase()) == -1){
            currentName.push(request.payload.username.toLowerCase());
            console.log("List of current users : " + currentName);
            reply({
                'auth': true,
                'statusCode': 200,
                'status':"OK",
                'username':request.payload.username
            });
          }
          else {
            reply({
              'auth': false,
              'statusCode': 401,
              'status':"Unauthorized"
            });
          }
        }
    });
    server.route({
        method: 'GET',
        path: '/main.css',
        handler: function (request, reply) {
            reply.file('./server/public/main.css');
        }
    });

    server.route({
      method:'GET',
      path:'/',
      handler: function(request, reply){
          console.log('requesting index')
          reply.file('./server/public/index.html')
      }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
