/**
 * Logger Utility
 * Centralized logging with levels and formatting
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

// Set to INFO for production, DEBUG for development
const CURRENT_LEVEL = import.meta.env?.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

/**
 * Format timestamp for logs
 * @returns {string}
 */
function getTimestamp() {
  return new Date().toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format log message
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {any[]} args - Additional arguments
 * @returns {string[]}
 */
function formatMessage(level, message, args) {
  const prefix = `[${getTimestamp()}] [${level}]`;
  return [prefix, message, ...args];
}

export const logger = {
  /**
   * Debug level log
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.debug(...formatMessage('DEBUG', message, args));
    }
  },

  /**
   * Info level log
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.info(...formatMessage('INFO', message, args));
    }
  },

  /**
   * Warning level log
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(...formatMessage('WARN', message, args));
    }
  },

  /**
   * Error level log
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  error(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.ERROR) {
      console.error(...formatMessage('ERROR', message, args));
    }
  },

  /**
   * Group logs together
   * @param {string} label - Group label
   */
  group(label) {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.group(`[${getTimestamp()}] ${label}`);
    }
  },

  /**
   * End log group
   */
  groupEnd() {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.groupEnd();
    }
  },
};
