/**
 * Formatters Utility
 * Price, currency, and number formatting functions
 */

/**
 * Get currency symbol
 * @param {string} currency - Currency code (USD, EUR)
 * @returns {string}
 */
export function getCurrencySymbol(currency) {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CHF: 'Fr.',
    CNY: '¥',
  };
  return symbols[currency] || currency;
}

/**
 * Format price with appropriate decimal places
 * @param {number} price - Price value
 * @param {string} currency - Currency code
 * @param {Object} options - Formatting options
 * @returns {string}
 */
export function formatPrice(price, currency = 'USD', options = {}) {
  const {
    minDecimals = 2,
    maxDecimals = price < 1 ? 4 : 2,
    showSymbol = true,
  } = options;

  const formatted = price.toLocaleString('de-DE', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });

  if (showSymbol) {
    return `${getCurrencySymbol(currency)}${formatted}`;
  }
  return formatted;
}

/**
 * Format large numbers with suffixes (K, M, B)
 * @param {number} num - Number to format
 * @returns {string}
 */
export function formatLargeNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

/**
 * Format percentage change
 * @param {number} change - Percentage value
 * @param {boolean} showSign - Show +/- sign
 * @returns {string}
 */
export function formatChange(change, showSign = true) {
  const sign = change >= 0 ? '+' : '';
  const prefix = showSign ? sign : '';
  return `${prefix}${change.toFixed(2)}%`;
}

/**
 * Format forex rate
 * @param {number} rate - Exchange rate
 * @param {boolean} isCrypto - Is crypto pair (BTC)
 * @param {boolean} inverse - Is inverse rate
 * @returns {string}
 */
export function formatForexRate(rate, isCrypto = false, inverse = false) {
  if (isCrypto) {
    return rate.toLocaleString('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  return rate.toLocaleString('de-DE', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

/**
 * Format date/time
 * @param {Date} date - Date object
 * @param {string} format - Format type ('time', 'date', 'datetime')
 * @returns {string}
 */
export function formatDateTime(date, format = 'time') {
  const options = {
    time: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
    date: { day: '2-digit', month: '2-digit', year: 'numeric' },
    datetime: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  return date.toLocaleString('de-DE', options[format] || options.time);
}

/**
 * Format commodity price based on unit
 * @param {number} price - Price value
 * @param {string} unit - Unit (oz, lb, MT, bu)
 * @param {string} currency - Currency code
 * @returns {string}
 */
export function formatCommodityPrice(price, unit, currency = 'USD') {
  const maxDecimals = unit === 'MT' ? 0 : 2;
  const minDecimals = unit === 'MT' ? 0 : 2;

  return formatPrice(price, currency, { minDecimals, maxDecimals });
}
