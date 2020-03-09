const fetch = require('node-fetch');
const _ = require('lodash');
const stockController = require('./stockController.js');

// error messages need to be returned in JSON format 
const jsonMessage = (msg) => {
    return {
        message: msg
    };
};

// return just the requested stock 
const handleSingleSymbol = (stocks, app) => {
    app.route('/stock/:symbol')
        .get((req, resp) => {
            stockController.findSymbol(stocks, req, resp);
        })
        .put((req, resp) => {
            stockController.updateSymbol(stocks, req, resp);
        })
        .post((req, resp) => {
            stockController.insertSymbol(stocks, req, resp);
        })
        .delete((req, resp) => {
            stockController.deleteSymbol(stocks, req, resp);
        });
};

// return all the stocks whose name contains the supplied text 
const handleNameSearch = (stocks, app) => {
    app.route('/stock/name/:substring')
        .get((req, resp) => {
            stockController.findName(stocks, req, resp);
        });
};

async function retrievePriceData(symbol, resp) {
    const url = `http://www.randyconnolly.com/funwebdev/3rd/api/stocks/history.php?symb ol=${symbol}`;
    // retrieve the response then the json
    const response = await fetch(url);
    const prices = await response.json();
    // return the retrieved price data 
    resp.json(prices);
}


// return daily price data 
const handlePriceData = (stocks, app) => {
    app.route('/stock/hourly/:symbol')
        .get((req, resp) => {
            stockController.findPrices(stocks, req, resp);
        });
}


module.exports = {
    handleSingleSymbol,
    handleNameSearch,
    handlePriceData
};