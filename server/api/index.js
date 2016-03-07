'use strict';
const Inert = require('inert');

exports.register = function (server, options, next) {

    server.register(Inert, () => {});

    server.route({
        method: 'Post',
        path: '/login',
        handler: function (request, reply) {
          if (request.email.toString().toLowerCase() == "itsanakatrina@gmail.com")
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
          reply.file('../public/index.html')
      }
    });

    next();
};


exports.register.attributes = {
    name: 'api'
};
