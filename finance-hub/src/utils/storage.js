/**
 * Storage Utility
 * LocalStorage wrapper with JSON handling and error safety
 */

const STORAGE_PREFIX = 'finance-hub:';

/**
 * Get prefixed key
 * @param {string} key - Storage key
 * @returns {string}
 */
function getKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

/**
 * Get value from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any}
 */
export function get(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(getKey(key));
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

/**
 * Set value in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} - Success status
 */
export function set(key, value) {
  try {
    localStorage.setItem(getKey(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove value from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
export function remove(key) {
  try {
    localStorage.removeItem(getKey(key));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all Finance Hub data from localStorage
 * @returns {boolean} - Success status
 */
export function clear() {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
    return true;
  } catch {
    return false;
  }
}

// Specific storage keys
export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  THEME: 'theme',
  CURRENCY: 'currency',
  COLLAPSED_SECTIONS: 'collapsedSections',
  SORT_PREFERENCE: 'sortPreference',
};

/**
 * Get favorites list
 * @returns {Array<{type: string, id: string}>}
 */
export function getFavorites() {
  return get(STORAGE_KEYS.FAVORITES, []);
}

/**
 * Add asset to favorites
 * @param {string} type - Asset type (crypto, stocks, etc.)
 * @param {string} id - Asset identifier
 * @returns {boolean}
 */
export function addFavorite(type, id) {
  const favorites = getFavorites();
  const exists = favorites.some((f) => f.type === type && f.id === id);
  if (!exists) {
    favorites.push({ type, id });
    return set(STORAGE_KEYS.FAVORITES, favorites);
  }
  return true;
}

/**
 * Remove asset from favorites
 * @param {string} type - Asset type
 * @param {string} id - Asset identifier
 * @returns {boolean}
 */
export function removeFavorite(type, id) {
  const favorites = getFavorites();
  const filtered = favorites.filter((f) => !(f.type === type && f.id === id));
  return set(STORAGE_KEYS.FAVORITES, filtered);
}

/**
 * Check if asset is favorited
 * @param {string} type - Asset type
 * @param {string} id - Asset identifier
 * @returns {boolean}
 */
export function isFavorite(type, id) {
  const favorites = getFavorites();
  return favorites.some((f) => f.type === type && f.id === id);
}

/**
 * Toggle favorite status
 * @param {string} type - Asset type
 * @param {string} id - Asset identifier
 * @returns {boolean} - New favorite status
 */
export function toggleFavorite(type, id) {
  if (isFavorite(type, id)) {
    removeFavorite(type, id);
    return false;
  } else {
    addFavorite(type, id);
    return true;
  }
}

/**
 * Get current theme
 * @returns {string}
 */
export function getTheme() {
  return get(STORAGE_KEYS.THEME, 'dark');
}

/**
 * Set theme
 * @param {string} theme - Theme name
 * @returns {boolean}
 */
export function setTheme(theme) {
  return set(STORAGE_KEYS.THEME, theme);
}

/**
 * Get collapsed sections
 * @returns {string[]}
 */
export function getCollapsedSections() {
  return get(STORAGE_KEYS.COLLAPSED_SECTIONS, []);
}

/**
 * Toggle section collapse state
 * @param {string} sectionId - Section identifier
 * @returns {boolean} - New collapsed state
 */
export function toggleSection(sectionId) {
  const collapsed = getCollapsedSections();
  const index = collapsed.indexOf(sectionId);
  if (index > -1) {
    collapsed.splice(index, 1);
    set(STORAGE_KEYS.COLLAPSED_SECTIONS, collapsed);
    return false;
  } else {
    collapsed.push(sectionId);
    set(STORAGE_KEYS.COLLAPSED_SECTIONS, collapsed);
    return true;
  }
}

/**
 * Get sort preference
 * @returns {{field: string, direction: string}}
 */
export function getSortPreference() {
  return get(STORAGE_KEYS.SORT_PREFERENCE, { field: 'name', direction: 'asc' });
}

/**
 * Set sort preference
 * @param {string} field - Sort field
 * @param {string} direction - Sort direction (asc, desc)
 * @returns {boolean}
 */
export function setSortPreference(field, direction) {
  return set(STORAGE_KEYS.SORT_PREFERENCE, { field, direction });
}
