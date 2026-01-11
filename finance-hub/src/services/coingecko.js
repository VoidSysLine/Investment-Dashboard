/**
 * CoinGecko API Service
 * Free cryptocurrency data - no API key required
 * Rate limit: 10-30 calls/minute
 * https://www.coingecko.com/api/documentation
 */

import { fetchJSON } from './api.js';
import { API_ENDPOINTS } from '../config/api-keys.js';
import { crypto } from '../config/assets.js';
import { logger } from '../utils/logger.js';

const BASE_URL = API_ENDPOINTS.COINGECKO;

/**
 * Fetch cryptocurrency prices and 24h changes
 * @param {string} currency - Target currency (usd, eur)
 * @returns {Promise<Array>}
 */
export async function fetchCryptoData(currency = 'usd') {
  const ids = crypto.map((c) => c.id).join(',');
  const vsCurrency = currency.toLowerCase();
  const url = `${BASE_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrency}&include_24hr_change=true`;

  try {
    const data = await fetchJSON(url);

    return crypto.map((coin) => ({
      ...coin,
      price: data[coin.id]?.[vsCurrency] || 0,
      change24h: data[coin.id]?.[`${vsCurrency}_24h_change`] || 0,
      loaded: !!data[coin.id],
      error: !data[coin.id],
    }));
  } catch (error) {
    logger.error('Crypto fetch error:', error.message);
    return crypto.map((coin) => ({
      ...coin,
      price: 0,
      change24h: 0,
      loaded: false,
      error: true,
    }));
  }
}

/**
 * Fetch Bitcoin price in USD for forex BTC pair
 * @returns {Promise<{price: number, change24h: number}>}
 */
export async function fetchBitcoinPrice() {
  const url = `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true`;

  try {
    const data = await fetchJSON(url);
    return {
      price: data.bitcoin?.usd || 0,
      change24h: data.bitcoin?.usd_24h_change || 0,
    };
  } catch (error) {
    logger.error('Bitcoin price fetch error:', error.message);
    return { price: 0, change24h: 0 };
  }
}

/**
 * Fetch detailed coin data
 * @param {string} coinId - CoinGecko coin ID
 * @returns {Promise<Object>}
 */
export async function fetchCoinDetails(coinId) {
  const url = `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`;

  try {
    return await fetchJSON(url);
  } catch (error) {
    logger.error(`Coin details fetch error for ${coinId}:`, error.message);
    return null;
  }
}
