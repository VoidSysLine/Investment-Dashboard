/**
 * Forex Card Component
 * Renders a card for currency pairs
 */

import { formatForexRate, formatChange } from '../utils/formatters.js';

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
            <p class="text-sm font-medium text-white">${pair.base}/${pair.target}</p>
            <p class="text-[10px] text-gray-500">${pair.name}</p>
          </div>
        </div>
        ${statusBadge}
      </div>

      <div class="flex items-end justify-between">
        <p class="price-display font-mono font-semibold text-white text-xl">
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
