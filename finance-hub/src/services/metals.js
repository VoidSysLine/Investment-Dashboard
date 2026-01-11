/**
 * Metals.dev API Service
 * Precious metals prices
 * Free tier: 25 calls/month (!)
 * https://metals.dev/
 *
 * NOTE: Due to the very limited free tier, this service uses simulated data by default.
 * Enable live API by uncommenting the METALS key in api-keys.js
 */

import { fetchJSON } from './api.js';
import { API_ENDPOINTS, API_KEYS } from '../config/api-keys.js';
import { metals, softCommodities, basePrices } from '../config/assets.js';
import { logger } from '../utils/logger.js';

const BASE_URL = API_ENDPOINTS.METALS;
const API_KEY = API_KEYS.METALS;

/**
 * Mapping of our symbols to metals.dev keys
 */
const METAL_KEYS = {
  XAU: 'gold',
  XAG: 'silver',
  XPT: 'platinum',
};

/**
 * Fetch metals data
 * @param {number} exchangeRate - USD to EUR exchange rate
 * @param {string} currency - Display currency
 * @returns {Promise<Array>}
 */
export async function fetchMetalsData(exchangeRate = 1, currency = 'USD') {
  // Skip API call if no key is configured (use simulated data)
  if (!API_KEY) {
    return generateSimulatedMetals(exchangeRate, currency);
  }

  try {
    const url = `${BASE_URL}/latest?api_key=${API_KEY}&currency=USD&unit=toz`;
    const data = await fetchJSON(url);

    return metals.map((metal) => {
      const metalKey = METAL_KEYS[metal.symbol];
      let price = data.metals?.[metalKey] || 0;

      if (currency === 'EUR' && price > 0) {
        price = price * exchangeRate;
      }

      return {
        ...metal,
        price,
        // API doesn't provide 24h change, simulate it
        change24h: (Math.random() - 0.5) * 2,
        loaded: price > 0,
      };
    });
  } catch (error) {
    logger.error('Metals fetch error:', error.message);
    return generateSimulatedMetals(exchangeRate, currency);
  }
}

/**
 * Generate simulated metals data
 * @param {number} exchangeRate - Exchange rate
 * @param {string} currency - Currency
 * @returns {Array}
 */
function generateSimulatedMetals(exchangeRate, currency) {
  return metals.map((metal) => {
    const base = basePrices.metals[metal.symbol] || 100;
    const variance = (Math.random() - 0.5) * base * 0.01;
    let price = base + variance;

    if (currency === 'EUR') {
      price = price * exchangeRate;
    }

    return {
      ...metal,
      price,
      change24h: (Math.random() - 0.5) * 1.5,
      loaded: true,
      simulated: true,
    };
  });
}

/**
 * Fetch soft commodities data (simulated - no free API available)
 * @param {number} exchangeRate - USD to EUR exchange rate
 * @param {string} currency - Display currency
 * @returns {Promise<Array>}
 */
export async function fetchSoftCommoditiesData(exchangeRate = 1, currency = 'USD') {
  // These typically require premium APIs, so we simulate realistic values
  return softCommodities.map((commodity) => {
    const base = basePrices.softCommodities[commodity.symbol] || 100;
    const variance = (Math.random() - 0.5) * base * 0.03;
    let price = base + variance;

    if (currency === 'EUR') {
      price = price * exchangeRate;
    }

    return {
      ...commodity,
      price,
      change24h: (Math.random() - 0.5) * 3,
      loaded: true,
      simulated: true,
    };
  });
}
