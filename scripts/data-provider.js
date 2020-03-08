const fetch = require('node-fetch');
const stockRouter = require('./stock-router.js');

async function retrieveCompanies(app) {
    const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/stocks/companies.php';
    const httpReq = await fetch(url);
    const stocks = await httpReq.json();
    stockRouter.handleSingleSymbol(stocks, app);  
    stockRouter.handleNameSearch(stocks, app);     
    stockRouter.handlePriceData(stocks, app);   

    app.get('/', (req, resp) => { resp.json(stocks) });
}
module.exports = { retrieveCompanies };