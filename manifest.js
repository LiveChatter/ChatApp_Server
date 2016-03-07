'use strict';
const Path = require('path');
const Confidence = require('confidence');
const Config = require('./config');
const Inert = require('inert');

const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true,
                files:{
                  relativeTo: Path.join(__dirname, 'public')
                }
            }
        }
    },
    connections: [{
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    registrations: [
        {
            plugin: './server/api/index'
        }
    ]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
