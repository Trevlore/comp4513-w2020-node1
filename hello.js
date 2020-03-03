console.log('hello world')

/* These additional modules allow us to process URL    paths as well as read/write files */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");


// Configure HTTP server to respond with simple message to all requests 
const server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello this is our first node.js application\n");
    response.end();
});

// Listen on port 8080 on localhost 
const port = 8080;
server.listen(port);

// display a message on the terminal 
console.log("Server running at port=" + port)
