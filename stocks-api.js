const fs = require('fs');
const path = require('path');
const parser = require('body-parser');
const express = require('express');


const jsonPath = path.join(__dirname, 'public', 'stocks-complete.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');

const stocks = JSON.parse(jsonData);
const app = express();


app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get('/stock/:symbol', (req, resp) => {
    const symbolToFind = req.params.symbol.toUpperCase();
    const matches = stocks.filter(obj => symbolToFind === obj.symbol);
    resp.json(matches);
});


// return all the stocks whose name contains the supplied text 
app.get('/stock/name/:substring', (req, resp) => {
    // change user supplied substring to lower case   
    const substring = req.params.substring.toLowerCase();
    // search the array of objects for a match
    const matches = stocks.filter((obj) =>
        obj.name.toLowerCase().includes(substring));
    // return the matching stocks   
    resp.json(matches);
});


app.use('/static', express.static(path.join(__dirname,'public'))); 

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});