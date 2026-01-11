/**
 * State Store
 * Central state management for the application
 */

import { CONFIG } from '../config/assets.js';
import * as storage from '../utils/storage.js';
import { logger } from '../utils/logger.js';

/**
 * Initial application state
 */
const initialState = {
  // UI State
  countdown: CONFIG.refreshInterval,
  isLoading: false,
  lastUpdate: null,
  searchQuery: '',
  sortBy: storage.getSortPreference(),

  // Currency
  currency: storage.get(storage.STORAGE_KEYS.CURRENCY, 'USD'),
  exchangeRate: 1,

  // Theme
  theme: storage.getTheme(),

  // Sections collapse state
  collapsedSections: storage.getCollapsedSections(),

  // Favorites
  favorites: storage.getFavorites(),

  // API Status
  errors: {
    crypto: false,
    stocks: false,
    etfs: false,
    metals: false,
    softCommodities: false,
    forex: false,
  },

  // Data
  data: {
    crypto: [],
    stocks: [],
    etfs: [],
    metals: [],
    softCommodities: [],
    forex: [],
  },
};

/**
 * Create a new store instance
 * @returns {Object} Store object with state and methods
 */
function createStore() {
  let state = { ...initialState };
  const subscribers = new Set();

  /**
   * Get current state
   * @returns {Object}
   */
  function getState() {
    return state;
  }

  /**
   * Update state
   * @param {Object} updates - Partial state updates
   */
  function setState(updates) {
    const prevState = state;
    state = { ...state, ...updates };

    // Notify subscribers
    subscribers.forEach((callback) => {
      try {
        callback(state, prevState);
      } catch (error) {
        logger.error('Store subscriber error:', error);
      }
    });
  }

  /**
   * Subscribe to state changes
   * @param {Function} callback - Callback function (state, prevState)
   * @returns {Function} Unsubscribe function
   */
  function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }

  /**
   * Set currency and persist
   * @param {string} currency - Currency code (USD, EUR)
   */
  function setCurrency(currency) {
    storage.set(storage.STORAGE_KEYS.CURRENCY, currency);
    setState({ currency });
  }

  /**
   * Toggle currency between USD and EUR
   */
  function toggleCurrency() {
    const newCurrency = state.currency === 'USD' ? 'EUR' : 'USD';
    setCurrency(newCurrency);
  }

  /**
   * Set theme and persist
   * @param {string} theme - Theme name
   */
  function setTheme(theme) {
    storage.setTheme(theme);
    setState({ theme });
  }

  /**
   * Cycle through themes
   */
  function cycleTheme() {
    const themes = ['dark', 'light', 'oled'];
    const currentIndex = themes.indexOf(state.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  /**
   * Toggle section collapse
   * @param {string} sectionId - Section identifier
   */
  function toggleSection(sectionId) {
    const isCollapsed = storage.toggleSection(sectionId);
    setState({ collapsedSections: storage.getCollapsedSections() });
    return isCollapsed;
  }

  /**
   * Check if section is collapsed
   * @param {string} sectionId - Section identifier
   * @returns {boolean}
   */
  function isSectionCollapsed(sectionId) {
    return state.collapsedSections.includes(sectionId);
  }

  /**
   * Toggle favorite status for an asset
   * @param {string} type - Asset type
   * @param {string} id - Asset identifier
   * @returns {boolean} New favorite status
   */
  function toggleFavorite(type, id) {
    const isFav = storage.toggleFavorite(type, id);
    setState({ favorites: storage.getFavorites() });
    return isFav;
  }

  /**
   * Check if asset is favorited
   * @param {string} type - Asset type
   * @param {string} id - Asset identifier
   * @returns {boolean}
   */
  function isFavorite(type, id) {
    return state.favorites.some((f) => f.type === type && f.id === id);
  }

  /**
   * Get all favorited assets with their data
   * @returns {Array}
   */
  function getFavoritesData() {
    return state.favorites
      .map((fav) => {
        const dataArray = state.data[fav.type] || [];
        const asset = dataArray.find((a) => {
          // Match by symbol or id depending on type
          if (fav.type === 'crypto') {
            return a.id === fav.id || a.symbol === fav.id;
          }
          return a.symbol === fav.id;
        });
        return asset ? { ...asset, assetType: fav.type } : null;
      })
      .filter(Boolean);
  }

  /**
   * Set search query
   * @param {string} query - Search string
   */
  function setSearchQuery(query) {
    setState({ searchQuery: query.toLowerCase() });
  }

  /**
   * Filter assets by search query
   * @param {Array} assets - Assets to filter
   * @returns {Array}
   */
  function filterBySearch(assets) {
    if (!state.searchQuery) return assets;
    return assets.filter((asset) => {
      const name = (asset.name || '').toLowerCase();
      const symbol = (asset.symbol || '').toLowerCase();
      return name.includes(state.searchQuery) || symbol.includes(state.searchQuery);
    });
  }

  /**
   * Set sort preference
   * @param {string} field - Sort field (name, price, change24h)
   * @param {string} direction - Sort direction (asc, desc)
   */
  function setSortPreference(field, direction) {
    storage.setSortPreference(field, direction);
    setState({ sortBy: { field, direction } });
  }

  /**
   * Toggle sort direction
   * @param {string} field - Sort field
   */
  function toggleSort(field) {
    const current = state.sortBy;
    let direction = 'asc';
    if (current.field === field) {
      direction = current.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortPreference(field, direction);
  }

  /**
   * Sort assets by current preference
   * @param {Array} assets - Assets to sort
   * @returns {Array}
   */
  function sortAssets(assets) {
    const { field, direction } = state.sortBy;
    const sorted = [...assets].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  /**
   * Update data for a specific type
   * @param {string} type - Data type (crypto, stocks, etc.)
   * @param {Array} data - New data array
   */
  function setData(type, data) {
    setState({
      data: { ...state.data, [type]: data },
    });
  }

  /**
   * Set error status for a data type
   * @param {string} type - Data type
   * @param {boolean} hasError - Error status
   */
  function setError(type, hasError) {
    setState({
      errors: { ...state.errors, [type]: hasError },
    });
  }

  /**
   * Set loading state
   * @param {boolean} isLoading - Loading status
   */
  function setLoading(isLoading) {
    setState({ isLoading });
  }

  /**
   * Update countdown value
   * @param {number} countdown - Countdown seconds
   */
  function setCountdown(countdown) {
    setState({ countdown });
  }

  /**
   * Set exchange rate
   * @param {number} rate - USD to EUR rate
   */
  function setExchangeRate(rate) {
    setState({ exchangeRate: rate });
  }

  /**
   * Update last refresh time
   */
  function updateLastRefresh() {
    setState({ lastUpdate: new Date() });
  }

  /**
   * Reset state to initial values
   */
  function reset() {
    state = { ...initialState };
    subscribers.forEach((callback) => callback(state, initialState));
  }

  return {
    getState,
    setState,
    subscribe,

    // Currency
    setCurrency,
    toggleCurrency,

    // Theme
    setTheme,
    cycleTheme,

    // Sections
    toggleSection,
    isSectionCollapsed,

    // Favorites
    toggleFavorite,
    isFavorite,
    getFavoritesData,

    // Search & Sort
    setSearchQuery,
    filterBySearch,
    setSortPreference,
    toggleSort,
    sortAssets,

    // Data
    setData,
    setError,
    setLoading,
    setCountdown,
    setExchangeRate,
    updateLastRefresh,

    // Reset
    reset,
  };
}

// Export singleton store instance
export const store = createStore();
