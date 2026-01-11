/**
 * API Keys Configuration
 *
 * IMPORTANT: This file should be in .gitignore!
 * Copy .env.example to .env and add your keys there for production.
 *
 * For development, keys are loaded from environment variables or fallback to defaults.
 */

/**
 * Get API key from environment or fallback
 * @param {string} key - Environment variable name
 * @param {string} fallback - Fallback value for development
 * @returns {string}
 */
function getEnvKey(key, fallback = '') {
  // Vite exposes env variables with VITE_ prefix
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  return fallback;
}

export const API_KEYS = {
  /**
   * Finnhub API Key
   * Free tier: 60 calls/minute
   * Get yours at: https://finnhub.io/
   */
  FINNHUB: getEnvKey('VITE_FINNHUB_API_KEY', 'd5hrep9r01qu7bqpjh6gd5hrep9r01qu7bqpjh70'),

  /**
   * Metals.dev API Key
   * Free tier: 25 calls/month (!) - use sparingly!
   * Get yours at: https://metals.dev/
   *
   * NOTE: Currently disabled in production due to low call limit.
   * Enable by uncommenting the actual key.
   */
  METALS: getEnvKey('VITE_METALS_API_KEY', ''),
  // METALS: getEnvKey('VITE_METALS_API_KEY', 'MEGBXGKSGAUU5GGYWK4V400GYWK4V'),
};

/**
 * API Endpoints (no key required)
 */
export const API_ENDPOINTS = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
  FRANKFURTER: 'https://api.frankfurter.app',
  FINNHUB: 'https://finnhub.io/api/v1',
  METALS: 'https://api.metals.dev/v1',
};

/**
 * API Rate Limits (for reference)
 */
export const RATE_LIMITS = {
  COINGECKO: { calls: 30, period: 'minute' },
  FINNHUB: { calls: 60, period: 'minute' },
  FRANKFURTER: { calls: 'unlimited', period: 'none' },
  METALS: { calls: 25, period: 'month' },
};
