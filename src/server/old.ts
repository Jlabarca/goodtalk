
import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

//var express = require('express');
var app = express();
var http2 = require('http').Server(app);
var io = require('socket.io')(http2);

app.use(express.static(__dirname + '/src'));

io.sockets.on('connection', function(socket) {
    socket.on('createNote', function(data) {
        socket.broadcast.emit('onNoteCreated', data);
    });

    socket.on('updateNote', function(data) {
        socket.broadcast.emit('onNoteUpdated', data);
    });

    socket.on('moveNote', function(data) {
        socket.broadcast.emit('onNoteMoved', data);
    });

    socket.on('deleteNote', function(data) {
        socket.broadcast.emit('onNoteDeleted', data);
    });
});

http2.listen(7777);