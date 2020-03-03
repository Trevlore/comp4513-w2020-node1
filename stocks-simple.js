const fs = require('fs');
const path = require('path');
const parser = require('body-parser');
const express = require('express');


const jsonPath = path.join(__dirname, 'public', 'stocks-simple.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');

const stocks = JSON.parse(jsonData);
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));


app.get('/')
    .get((req, resp) => {
        resp.json(stocks)
    });

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});