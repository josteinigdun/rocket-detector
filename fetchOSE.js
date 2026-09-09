const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();

const OSE_STOCKS = [
  'EQNR.OL', 'DNB.OL', 'TELENOR.OL', 'AKSO.OL', 'YARA.OL',
  'HYDRO.OL', 'ORKLA.OL', 'MOWI.OL', 'SCATC.OL', 'NHY.OL',
  'SBANK.OL', 'REC.OL', 'KITRON.OL', 'FLOUR.OL', 'AKER.OL',
  'WESCO.OL', 'GOGL.OL', 'BJARTE.OL', 'AUSS.OL', 'SYRE.OL',
  'ECOM.OL', 'OTEC.OL', 'KOPARTAL.OL', 'SALMON.OL', 'SALM.OL',
  'NOR.OL', 'TDE.OL', 'AKRBP.OL', 'NORSKTOP.OL'
];

async function fetchOSEData() {
  const results = [];

  for (const symbol of OSE_STOCKS) {
    try {
      console.log(`Fetching ${symbol}...`);
      
      const quote = await yahooFinance.quote(symbol);
      
      results.push({
        symbol,
        price: quote.regularMarketPrice || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        change: quote.regularMarketChange || 0,
        pe: quote.trailingPE || 0,
        pb: quote.priceToBook || 0,
        yield: quote.dividendYield || 0,
        rsi: 50,
        news: [
          { headline: 'Market data from Yahoo Finance', sentiment: 'neutral' }
        ]
      });

    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error.message);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return results;
}

fetchOSEData().then(data => {
  const fs = require('fs');
  fs.writeFileSync('ose-data.json', JSON.stringify(data, null, 2));
  console.log('✅ Data saved to ose-data.json');
});