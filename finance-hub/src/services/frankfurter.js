/**
 * Frankfurter API Service
 * Free forex/currency exchange rates - no API key required
 * https://api.frankfurter.app/
 */

import { fetchJSON } from './api.js';
import { API_ENDPOINTS } from '../config/api-keys.js';
import { forex, basePrices } from '../config/assets.js';
import { logger } from '../utils/logger.js';

const BASE_URL = API_ENDPOINTS.FRANKFURTER;

/**
 * Fetch current USD to EUR exchange rate
 * @returns {Promise<number>}
 */
export async function fetchExchangeRate() {
  try {
    const data = await fetchJSON(`${BASE_URL}/latest?from=USD&to=EUR`);
    return data.rates.EUR;
  } catch (error) {
    logger.error('Exchange rate fetch error:', error.message);
    return 0.92; // Fallback rate
  }
}

/**
 * Fetch all forex rates from USD base
 * @returns {Promise<Object>}
 */
export async function fetchForexRates() {
  try {
    const data = await fetchJSON(`${BASE_URL}/latest?from=USD`);
    return data.rates;
  } catch (error) {
    logger.error('Forex rates fetch error:', error.message);
    return null;
  }
}

/**
 * Fetch forex data for all configured pairs
 * @returns {Promise<Array>}
 */
export async function fetchForexData() {
  try {
    const rates = await fetchForexRates();

    if (!rates) {
      return generateSimulatedForex();
    }

    return forex.map((pair) => {
      if (pair.crypto) {
        // BTC rate comes from crypto data
        return {
          ...pair,
          rate: 0,
          change24h: 0,
          loaded: false,
          isCrypto: true,
        };
      }

      let rate;
      if (pair.base === 'USD') {
        rate = rates[pair.target] || 0;
      } else if (pair.target === 'USD') {
        rate = 1 / (rates[pair.base] || 1);
      } else {
        rate = rates[pair.base] || 0;
      }

      if (pair.inverse) {
        rate = 1 / rate;
      }

      // Simulate 24h change (Frankfurter doesn't provide this)
      const change = (Math.random() - 0.5) * 1.5;

      return {
        ...pair,
        rate,
        change24h: change,
        loaded: true,
      };
    });
  } catch (error) {
    logger.error('Forex fetch error:', error.message);
    return generateSimulatedForex();
  }
}

/**
 * Generate simulated forex data as fallback
 * @returns {Array}
 */
function generateSimulatedForex() {
  return forex.map((pair) => {
    if (pair.crypto) {
      return { ...pair, rate: 0, change24h: 0, loaded: false, isCrypto: true };
    }

    const base = basePrices.forex[pair.base] || 1;
    const variance = (Math.random() - 0.5) * base * 0.01;

    return {
      ...pair,
      rate: base + variance,
      change24h: (Math.random() - 0.5) * 1.5,
      loaded: true,
      simulated: true,
    };
  });
}
