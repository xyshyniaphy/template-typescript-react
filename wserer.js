// const WebSocket = require('ws');
// const wss = new WebSocket.Server({
//     port: 3000
// });
// wss.on('connection', (ws, req) => {
//     const fileStream = fs.createWriteStream(filePath, {
//         flags: 'a'
//     });
//     ws.on('message', message => {
//         // Only raw blob data can be sent
//         fileStream.write(Buffer.from(new Uint8Array(message)));
//     });
// });
const express = require("express");
const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");

var filePath = './public/record.mp4';

const port = 3001;

const app = express();
//app.use(index);

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {


    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('startrecord', message => {
        console.log("startrecord", message)
        fs.unlink(filePath, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });

    socket.on('record', message => {

        console.log("record", message.length)

        const fileStream = fs.createWriteStream(filePath, {
            flags: 'a'
        });
        // Only raw blob data can be sent
        fileStream.write(Buffer.from(new Uint8Array(message)));

    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));