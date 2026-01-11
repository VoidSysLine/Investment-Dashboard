/**
 * Asset Card Component
 * Renders a card for crypto, stocks, ETFs, metals, commodities
 */

import { formatPrice, formatChange, formatCommodityPrice } from '../utils/formatters.js';
import { generateMiniChart } from '../utils/charts.js';
import { store } from '../state/store.js';

/**
 * Create asset card HTML
 * @param {Object} asset - Asset data
 * @param {string} type - Asset type (crypto, stocks, etfs, metals, softCommodities)
 * @param {number} index - Card index for animation stagger
 * @returns {string} HTML string
 */
export function createAssetCard(asset, type, index) {
  const state = store.getState();
  const isPositive = asset.change24h >= 0;
  const changeClass = isPositive ? 'price-up' : 'price-down';
  const arrow = isPositive ? '↑' : '↓';
  const changeFormatted = formatChange(asset.change24h);

  let priceFormatted;
  if (asset.unit) {
    priceFormatted = formatCommodityPrice(asset.price, asset.unit, state.currency);
  } else {
    priceFormatted = formatPrice(asset.price, state.currency, {
      maxDecimals: asset.price < 1 ? 4 : 2,
    });
  }

  const unitText = asset.unit ? `pro ${asset.unit}` : state.currency;
  const isFav = store.isFavorite(type, asset.symbol || asset.id);
  const favClass = isFav ? 'text-accent-amber' : 'text-gray-600 hover:text-accent-amber';

  const statusBadge = asset.simulated
    ? '<span class="text-[10px] text-amber-500/70 bg-amber-500/10 px-1.5 py-0.5 rounded">Demo</span>'
    : asset.error
      ? '<span class="text-[10px] text-rose-500/70 bg-rose-500/10 px-1.5 py-0.5 rounded">Offline</span>'
      : '';

  const chartId = `${type}-${index}-${Date.now()}`;

  return `
    <div class="glass-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] opacity-0 fade-in stagger-${(index % 6) + 1}"
         style="animation-fill-mode: forwards;" data-type="${type}" data-id="${asset.symbol || asset.id}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="asset-icon" style="background: ${asset.color}20; color: ${asset.color};">
            ${(asset.symbol || '').substring(0, 3)}
          </div>
          <div>
            <h3 class="font-semibold text-white">${asset.name}</h3>
            <p class="text-xs text-gray-500">${asset.symbol || ''}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${statusBadge}
          <button class="favorite-btn p-1 transition-colors ${favClass}"
                  data-type="${type}" data-id="${asset.symbol || asset.id}" title="Favorit">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-end justify-between">
        <div>
          <p class="text-2xl font-mono font-semibold text-white tracking-tight">
            ${priceFormatted}
          </p>
          <p class="text-xs text-gray-500 mt-1">${unitText}</p>
        </div>
        <div class="text-right">
          <p class="font-mono text-sm font-medium ${changeClass}">
            ${arrow} ${changeFormatted}
          </p>
          <p class="text-xs text-gray-500">24h</p>
        </div>
      </div>

      <div class="mt-4 h-10 rounded-lg overflow-hidden bg-surface-800/50">
        ${generateMiniChart(isPositive, chartId)}
      </div>
    </div>
  `;
}

/**
 * Create loading skeleton card
 * @returns {string} HTML string
 */
export function createLoadingCard() {
  return `
    <div class="glass-card rounded-2xl p-5">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl loading-skeleton"></div>
        <div class="flex-1">
          <div class="h-4 w-20 rounded loading-skeleton mb-2"></div>
          <div class="h-3 w-12 rounded loading-skeleton"></div>
        </div>
      </div>
      <div class="h-8 w-32 rounded loading-skeleton mb-2"></div>
      <div class="h-4 w-16 rounded loading-skeleton"></div>
    </div>
  `;
}
