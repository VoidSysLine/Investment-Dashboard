/**
 * Forex Card Component
 * Renders a card for currency pairs
 */

import { formatForexRate, formatChange } from '../utils/formatters.js';
import { store } from '../state/store.js';

/**
 * Create forex card HTML
 * @param {Object} pair - Forex pair data
 * @param {number} index - Card index for animation stagger
 * @returns {string} HTML string
 */
export function createForexCard(pair, index) {
  if (pair.isCrypto && !pair.loaded) {
    return '';
  }

  const isPositive = pair.change24h >= 0;
  const changeClass = isPositive ? 'price-up' : 'price-down';
  const arrow = isPositive ? '↑' : '↓';
  const changeFormatted = formatChange(pair.change24h);
  const rateFormatted = formatForexRate(pair.rate, pair.isCrypto, pair.inverse);

  const isFav = store.isFavorite('forex', pair.base);
  const favClass = isFav ? 'text-accent-amber' : 'text-gray-600 hover:text-accent-amber';

  const statusBadge = pair.simulated
    ? '<span class="text-[10px] text-amber-500/70 bg-amber-500/10 px-1.5 py-0.5 rounded">Demo</span>'
    : '';

  return `
    <div class="glass-card forex-card rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] opacity-0 fade-in stagger-${(index % 6) + 1}"
         style="animation-fill-mode: forwards;" data-type="forex" data-id="${pair.base}">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
               style="background: ${pair.color}20; color: ${pair.color};">
            ${pair.base}
          </div>
          <div>
            <p class="text-sm font-medium card-text">${pair.base}/${pair.target}</p>
            <p class="text-[10px] text-gray-500">${pair.name}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${statusBadge}
          <button class="favorite-btn p-1 transition-colors ${favClass}"
                  data-type="forex" data-id="${pair.base}" title="Favorit">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-end justify-between">
        <p class="price-display font-mono font-semibold card-text text-xl">
          ${pair.isCrypto ? '$' : ''}${rateFormatted}
        </p>
        <p class="font-mono text-xs font-medium ${changeClass}">
          ${arrow} ${changeFormatted}
        </p>
      </div>
    </div>
  `;
}

/**
 * Create loading skeleton for forex card
 * @returns {string} HTML string
 */
export function createForexLoadingCard() {
  return `
    <div class="glass-card rounded-2xl p-4">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-8 h-8 rounded-lg loading-skeleton"></div>
        <div class="flex-1">
          <div class="h-3 w-16 rounded loading-skeleton mb-1"></div>
          <div class="h-2 w-20 rounded loading-skeleton"></div>
        </div>
      </div>
      <div class="h-6 w-24 rounded loading-skeleton"></div>
    </div>
  `;
}
