'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

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

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {
          console.log('posting to /login');
          console.log('email', request.params.email);
          console.log('password', request.params.password);
          if (request.params.email.toString().toLowerCase() == "itsanakatrina@gmail.com")
            reply({
              'auth': true,
              'statusCode': 200,
              'friendslist':[{
                'userName' : "BigB",
                id: 1
              },{
                'userName' : "UncleOcean",
                id: 2
              },{
                'userName' : "JosieJo",
                id: 3
              }]
          });
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
