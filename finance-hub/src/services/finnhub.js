/**
 * Finnhub API Service
 * Stock market data
 * Free tier: 60 calls/minute
 * https://finnhub.io/docs/api
 */

import { fetchJSON, delay } from './api.js';
import { API_ENDPOINTS, API_KEYS } from '../config/api-keys.js';
import { stocks, etfs, basePrices } from '../config/assets.js';
import { logger } from '../utils/logger.js';

const BASE_URL = API_ENDPOINTS.FINNHUB;
const API_KEY = API_KEYS.FINNHUB;

/**
 * Fetch quote for a single symbol
 * @param {string} symbol - Stock/ETF symbol
 * @returns {Promise<Object>}
 */
async function fetchQuote(symbol) {
  const url = `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`;
  return fetchJSON(url);
}

/**
 * Fetch stock data for all configured stocks
 * @param {number} exchangeRate - USD to EUR exchange rate
 * @param {string} currency - Display currency
 * @returns {Promise<Array>}
 */
export async function fetchStockData(exchangeRate = 1, currency = 'USD') {
  const results = [];

  for (const stock of stocks) {
    try {
      const data = await fetchQuote(stock.symbol);

      if (data.c && data.c > 0) {
        let price = data.c;
        if (currency === 'EUR') {
          price = price * exchangeRate;
        }

        results.push({
          ...stock,
          price,
          priceUSD: data.c,
          change24h: data.dp || 0,
          high: data.h,
          low: data.l,
          loaded: true,
        });
      } else {
        results.push(generateSimulatedStock(stock, exchangeRate, currency));
      }
    } catch (error) {
      logger.error(`Stock fetch error for ${stock.symbol}:`, error.message);
      results.push(generateSimulatedStock(stock, exchangeRate, currency));
    }

    // Rate limit: delay between requests
    await delay(100);
  }

  return results;
}

/**
 * Fetch ETF data for all configured ETFs
 * @param {number} exchangeRate - USD to EUR exchange rate
 * @param {string} currency - Display currency
 * @returns {Promise<Array>}
 */
export async function fetchETFData(exchangeRate = 1, currency = 'USD') {
  const results = [];

  for (const etf of etfs) {
    try {
      const data = await fetchQuote(etf.symbol);

      if (data.c && data.c > 0) {
        let price = data.c;
        if (currency === 'EUR') {
          price = price * exchangeRate;
        }

        results.push({
          ...etf,
          price,
          priceUSD: data.c,
          change24h: data.dp || 0,
          high: data.h,
          low: data.l,
          loaded: true,
        });
      } else {
        results.push(generateSimulatedETF(etf, exchangeRate, currency));
      }
    } catch (error) {
      logger.error(`ETF fetch error for ${etf.symbol}:`, error.message);
      results.push(generateSimulatedETF(etf, exchangeRate, currency));
    }

    // Rate limit: delay between requests
    await delay(100);
  }

  return results;
}

/**
 * Generate simulated stock data as fallback
 * @param {Object} stock - Stock config
 * @param {number} exchangeRate - Exchange rate
 * @param {string} currency - Currency
 * @returns {Object}
 */
function generateSimulatedStock(stock, exchangeRate, currency) {
  const base = basePrices.stocks[stock.symbol] || 100;
  const variance = (Math.random() - 0.5) * base * 0.02;
  let price = base + variance;

  if (currency === 'EUR') {
    price = price * exchangeRate;
  }

  return {
    ...stock,
    price,
    priceUSD: base + variance,
    change24h: (Math.random() - 0.5) * 4,
    loaded: true,
    simulated: true,
  };
}

/**
 * Generate simulated ETF data as fallback
 * @param {Object} etf - ETF config
 * @param {number} exchangeRate - Exchange rate
 * @param {string} currency - Currency
 * @returns {Object}
 */
function generateSimulatedETF(etf, exchangeRate, currency) {
  const base = basePrices.etfs[etf.symbol] || 100;
  const variance = (Math.random() - 0.5) * base * 0.02;
  let price = base + variance;

  if (currency === 'EUR') {
    price = price * exchangeRate;
  }

  return {
    ...etf,
    price,
    priceUSD: base + variance,
    change24h: (Math.random() - 0.5) * 3,
    loaded: true,
    simulated: true,
  };
}

/**
 * Fetch market status (is market open)
 * @param {string} exchange - Exchange code (US, etc.)
 * @returns {Promise<Object>}
 */
export async function fetchMarketStatus(exchange = 'US') {
  const url = `${BASE_URL}/stock/market-status?exchange=${exchange}&token=${API_KEY}`;

  try {
    return await fetchJSON(url);
  } catch (error) {
    logger.error('Market status fetch error:', error.message);
    return null;
  }
}
