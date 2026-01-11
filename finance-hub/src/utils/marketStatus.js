/**
 * Market Status Utility
 * Determines if stock markets are open based on time and timezone
 */

/**
 * Market trading hours (in local market timezone)
 */
const MARKET_HOURS = {
  NYSE: {
    timezone: 'America/New_York',
    preMarket: { start: 4, end: 9.5 },
    regular: { start: 9.5, end: 16 },
    afterHours: { start: 16, end: 20 },
  },
  NASDAQ: {
    timezone: 'America/New_York',
    preMarket: { start: 4, end: 9.5 },
    regular: { start: 9.5, end: 16 },
    afterHours: { start: 16, end: 20 },
  },
  XETRA: {
    timezone: 'Europe/Berlin',
    preMarket: { start: 8, end: 9 },
    regular: { start: 9, end: 17.5 },
    afterHours: { start: 17.5, end: 22 },
  },
  CRYPTO: {
    timezone: 'UTC',
    regular: { start: 0, end: 24 }, // 24/7
  },
};

/**
 * US market holidays 2025 (approximate)
 */
const US_HOLIDAYS_2025 = [
  '2025-01-01', // New Year's Day
  '2025-01-20', // MLK Day
  '2025-02-17', // Presidents Day
  '2025-04-18', // Good Friday
  '2025-05-26', // Memorial Day
  '2025-06-19', // Juneteenth
  '2025-07-04', // Independence Day
  '2025-09-01', // Labor Day
  '2025-11-27', // Thanksgiving
  '2025-12-25', // Christmas
];

/**
 * Check if date is a US holiday
 * @param {Date} date - Date to check
 * @returns {boolean}
 */
function isUSHoliday(date) {
  const dateStr = date.toISOString().split('T')[0];
  return US_HOLIDAYS_2025.includes(dateStr);
}

/**
 * Check if date is a weekend
 * @param {Date} date - Date to check
 * @returns {boolean}
 */
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Get current time in specific timezone as decimal hours
 * @param {string} timezone - IANA timezone string
 * @returns {number}
 */
function getTimeInTimezone(timezone) {
  const now = new Date();
  const options = { timeZone: timezone, hour: 'numeric', minute: 'numeric' };
  const timeStr = now.toLocaleTimeString('en-US', { ...options, hour12: false });
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + minutes / 60;
}

/**
 * Get date in specific timezone
 * @param {string} timezone - IANA timezone string
 * @returns {Date}
 */
function getDateInTimezone(timezone) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { timeZone: timezone });
  return new Date(dateStr);
}

/**
 * Market status types
 */
export const MARKET_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  PRE_MARKET: 'pre-market',
  AFTER_HOURS: 'after-hours',
  HOLIDAY: 'holiday',
  WEEKEND: 'weekend',
};

/**
 * Get market status for US exchanges (NYSE/NASDAQ)
 * @returns {{status: string, label: string, color: string, nextOpen: string|null}}
 */
export function getUSMarketStatus() {
  const market = MARKET_HOURS.NYSE;
  const currentTime = getTimeInTimezone(market.timezone);
  const currentDate = getDateInTimezone(market.timezone);

  // Check weekend
  if (isWeekend(currentDate)) {
    return {
      status: MARKET_STATUS.WEEKEND,
      label: 'Wochenende',
      color: 'gray',
      indicator: '●',
    };
  }

  // Check holiday
  if (isUSHoliday(currentDate)) {
    return {
      status: MARKET_STATUS.HOLIDAY,
      label: 'Feiertag',
      color: 'gray',
      indicator: '●',
    };
  }

  // Check trading hours
  if (currentTime >= market.regular.start && currentTime < market.regular.end) {
    return {
      status: MARKET_STATUS.OPEN,
      label: 'Offen',
      color: 'emerald',
      indicator: '●',
    };
  }

  if (currentTime >= market.preMarket.start && currentTime < market.preMarket.end) {
    return {
      status: MARKET_STATUS.PRE_MARKET,
      label: 'Pre-Market',
      color: 'amber',
      indicator: '◐',
    };
  }

  if (currentTime >= market.afterHours.start && currentTime < market.afterHours.end) {
    return {
      status: MARKET_STATUS.AFTER_HOURS,
      label: 'After-Hours',
      color: 'amber',
      indicator: '◐',
    };
  }

  return {
    status: MARKET_STATUS.CLOSED,
    label: 'Geschlossen',
    color: 'rose',
    indicator: '●',
  };
}

/**
 * Get formatted market status string for display
 * @returns {string}
 */
export function getMarketStatusDisplay() {
  const status = getUSMarketStatus();
  return `<span class="text-accent-${status.color}">${status.indicator} ${status.label}</span>`;
}

/**
 * Check if crypto markets are open (always true)
 * @returns {boolean}
 */
export function isCryptoMarketOpen() {
  return true;
}

/**
 * Get next market open time (simplified)
 * @returns {string}
 */
export function getNextMarketOpen() {
  const status = getUSMarketStatus();
  if (status.status === MARKET_STATUS.OPEN) {
    return 'Jetzt offen';
  }

  const market = MARKET_HOURS.NYSE;
  const openTime = `${Math.floor(market.regular.start)}:${((market.regular.start % 1) * 60).toString().padStart(2, '0')}`;

  if (status.status === MARKET_STATUS.WEEKEND) {
    return `Montag ${openTime} ET`;
  }

  return `${openTime} ET`;
}
