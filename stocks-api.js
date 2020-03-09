const path = require('path');
const parser = require('body-parser');
const express = require('express');
const stocks = require('./scripts/data-provider.js');
const stockRouter = require('./scripts/stock-router.js');


const app = express();

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

const provider = require('./scripts/data-provider.js');
provider.retrieveCompanies(app);

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/socket.io', express.static(path.join(__dirname,
    '/node_modules/socket.io-client/dist/')));


const server = require('socket.io');
const io = new server(3000);

io.on('connection', socket => {
    console.log('new connection made with client');
    socket.on('username', msg => {
        console.log('username: ' + msg);
        socket.username = msg;
        const obj = {
            message: "Has joined",
            user: msg
        };
        io.emit('user joined', obj);
    });
});

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});