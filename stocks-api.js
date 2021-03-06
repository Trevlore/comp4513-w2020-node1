const path = require('path');
const _ = require('lodash');
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
let users = [];


io.on('connection', socket => {
    console.log('new connection made with client');

    socket.on('username', msg => {
       
        const id = Math.floor((Math.random() * 70) + 1);
        const group = Math.random() >= 0.5 ? "men" : "women" ;

        socket.user = {id : id, name : msg, group : group};
        users.push(socket.user)
         
        console.log(users);
        
        const obj = {
            message: "Has joined",
            newUser: msg,
            users: users
        };
        io.emit('user joined', obj);
    });

    socket.on('chat from client', msg => {
        socket.broadcast.emit('chat from server', {
            user: socket.user,
            message: msg
        });
    });

    socket.on('user exit', msg => {
        console.log(msg);
        _.remove(users,(user) => {return user.name === msg});
        const obj = {
            message: "Has Left",
            newUser: msg,
            users: users
        };
        console.log(users);
        io.emit('user joined', obj);
    });
    
});

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});