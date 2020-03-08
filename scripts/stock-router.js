
// return just the requested stock ~~
const handleSingleSymbol = (stocks, app) => {
    app.get('/stock/:symbol', (req, resp) => {
        const symbolToFind = req.params.symbol.toUpperCase();
        const stock = stocks.filter(obj => symbolToFind === obj.symbol);
        if (stock.length > 0) {
            resp.json(stock);
        } else {
            resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
        }
    });
    app.put('/stock/:symbol', (req, resp) => {
        const symbolToUpd = req.params.symbol.toUpperCase();
        let index = _.findIndex(stocks, ['symbol', symbolToUpd]);
        if (index < 0) {
            resp.json(jsonMessage(symbolToUpd + " not found"));
        }
        else {
            stocks[index] = req.body;
            resp.json(jsonMessage(symbolToUpd + " updated"));
        }
    });
};

// return all the stocks whose name contains the supplied text 
const handleNameSearch = (stocks, app) => {
    app.get('/stock/name/:substring', (req, resp) => {
        // change user supplied substring to lower case     
        const substring = req.params.substring.toLowerCase();
        // search the array of objects for a match    
        const matches = stocks.filter((obj) =>
            obj.name.toLowerCase().includes(substring));
        // return the matching stocks       
        if (matches.length > 0) {
            resp.json(matches);
        } else {
            resp.json(jsonMessage(`No symbol matches found for ${substring}`));
        }
    });

};

// return daily price data 
const handlePriceData = (stocks, app) => {
    app.get('/stock/daily/:symbol', (req, resp) => {
        // change user supplied symbol to upper case   
        const symbolToFind = req.params.symbol.toUpperCase();
        // search the array of objects for a match    
        const stock = stocks.filter(obj => symbolToFind === obj.symbol);
        // now get the daily price data      
        if (stock.length > 0) {
            retrievePriceData(symbolToFind, resp);
        } else {
            resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
        }
    });
}

module.exports = {
    handleSingleSymbol,
    handleNameSearch,
    handlePriceData
};