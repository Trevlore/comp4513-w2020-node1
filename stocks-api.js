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

// handle other requests for stocks
stockRouter.handleSingleSymbol(stocks, app);
stockRouter.handleNameSearch(stocks, app);
stockRouter.handlePriceData(stocks, app); 

app.use('/static', express.static(path.join(__dirname, 'public')));

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});