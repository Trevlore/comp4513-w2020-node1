const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const server = http.createServer(function (request, response) {
            //const filename = "public/sample.html";
            var requestedFile = url.parse(request.url).pathname;
            const ourPath = process.cwd() + "/public";
            let filename = path.join(ourPath, requestedFile);
            console.log(filename);

            fs.exists(filename, function (exists) {
                if (!exists) {
                    output404Error(response);
                    return;
                }
                if (fs.statSync(filename).isDirectory())
                    filename += '/index.html';

                fs.readFile(filename, "binary", function (err, file) {

                    if (err) {
                        output500Error(response, err);
                        return;
                    }
                    const ext = path.parse(filename).ext;

                    var header = {
                        'Content-type': mimeType[ext] || 'text/plain'
                    };
                    response.writeHead(200, header);
                    response.write(file, "binary");
                    response.end();
                });
            });
        });

            let port = 8080;
            server.listen(port);
            console.log("Server running at port= " + port);


            const output404Error = (response) => {
                response.writeHead(404, {
                    "Content-Type": "text/html"
                });
                response.write("<h1>404 Error</h1>\n");
                response.write("The requested file isn't on this machine\n");
                response.end();
            }
            const output500Error = (response) => {
                response.writeHead(404, {
                    "Content-Type": "text/html"
                });
                response.write("<h1>500 Error</h1>\n");
                response.write("Something went wrong reading requested file\n");
                response.end();
            }

            const mimeType = {
                '.html': 'text/html',
                '.json': 'application/json',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml'
            };