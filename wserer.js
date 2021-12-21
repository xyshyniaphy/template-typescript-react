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


const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

var filePath = './public/record.mp4';

const port = 3001;

const app = express();
//app.use(index);

app.use(express.static('build'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/api/upload', upload.single('blob'), function (req, res, next) {
    console.log(req.file)
    console.log(req.body.sequence)
    console.log(req.body.status)
    res.send('Done')
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

// app.post('/api/endupload', function (req, res) {
//     console.log("endupload")
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
// })

const server = http.createServer(app);



server.listen(port, () => console.log(`Listening on port ${port}`));