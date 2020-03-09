const fetch = require('node-fetch');
const _ = require('lodash');

// error messages need to be returned in JSON format 
const jsonMessage = (msg) => {
    return {
        message: msg
    };
};

async function retrievePriceData(symbol, resp) {
    const url = `http://www.randyconnolly.com/funwebdev/3rd/api/stocks/history.php?symb ol=${symbol}`;
    const response = await fetch(url);
    const prices = await response.json();
    resp.json(prices);
}

const findSymbol = (stocks, req, resp) => {
    const symbolToFind = req.params.symbol.toUpperCase();
    console.log(symbolToFind)
    const stock = stocks.filter(obj => symbolToFind === obj.symbol);
    if (stock.length > 0) {
        resp.json(stock);
    } else {
        resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
    }
};

const updateSymbol = (stocks, req, resp) => {
    const symbolToUpd = req.params.symbol.toUpperCase();
    let indx = _.findIndex(stocks, ['symbol', symbolToUpd]);
    if (indx < 0) {
        resp.json(jsonMessage(`${symbolToUpd} not found`));
    } else {
        stocks[indx] = req.body;
        resp.json(jsonMessage(`${symbolToUpd} updated`));
    }
};

const findName = (stocks, req, resp) => {
    const substring = req.params.substring.toLowerCase();
    const matches = stocks.filter((obj) => obj.name.toLowerCase().includes(substring));
    if (matches.length > 0) {
        resp.json(matches);
    } else {
        resp.json(jsonMessage(`No symbol matches found for ${substring}`));
    }
};

const findPrices = (stocks, req, resp) => {
    const symbolToFind = req.params.symbol.toUpperCase();
    const stock = stocks.filter(obj => symbolToFind === obj.symbol);
    if (stock.length > 0) {
        retrievePriceData(symbolToFind, resp);
    } else {
        resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
    }
};

const insertSymbol = (stocks, req, resp) => {
    const symbolToFind = req.params.symbol.toUpperCase();
    const stock = stocks.filter(obj => symbolToFind === obj.symbol);
    if (stock.length > 0) {
        resp.json(jsonMessage(`Symbol ${symbolToFind} already exists`));
    } else {
        //build stock object
        console.log( req.body);
        stocks.push( req.body);
        resp.json(jsonMessage(`Symbol ${symbolToFind} added`));
    }
  
}

const deleteSymbol = (stocks, req, resp) => {
    const symbolToFind = req.params.symbol.toUpperCase();
    const removed = _.remove(stocks, obj => { return obj.symbol === symbolToFind});
    if (removed.length > 0 ) {
        resp.json(jsonMessage(`${symbolToFind} removed`));
    } else {
        resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
    }
    
}

module.exports = { findSymbol, updateSymbol, findName, findPrices , insertSymbol, deleteSymbol};   