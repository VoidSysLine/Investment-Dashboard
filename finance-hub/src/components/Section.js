/**
 * Section Component
 * Collapsible section with header and content area
 */

import { store } from '../state/store.js';
import { getSectionIcon } from './icons.js';

/**
 * Create section HTML
 * @param {Object} options - Section options
 * @param {string} options.id - Section ID
 * @param {string} options.title - Section title
 * @param {string} options.icon - Icon name
 * @param {string} options.color - Accent color
 * @param {string} options.apiLabel - API source label
 * @param {string} options.gridId - Grid container ID
 * @param {string} options.gridCols - Grid columns class
 * @returns {string} HTML string
 */
export function createSection({ id, title, icon, color, apiLabel, gridId, gridCols = 'lg:grid-cols-3' }) {
  const isCollapsed = store.isSectionCollapsed(id);
  const collapseIcon = isCollapsed ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7';

  return `
    <section class="mb-10" data-section="${id}">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent-${color}/20 flex items-center justify-center">
            ${getSectionIcon(icon, color)}
          </div>
          <h2 class="text-xl font-semibold">${title}</h2>
          ${apiLabel ? `<span class="text-xs text-gray-500 bg-surface-700 px-2 py-1 rounded-full">${apiLabel}</span>` : ''}
        </div>
        <div class="flex items-center gap-2">
          <!-- Sort Dropdown -->
          <select class="sort-select text-xs bg-surface-700 border border-white/5 rounded-lg px-2 py-1 text-gray-400 focus:outline-none focus:border-accent-cyan/50"
                  data-section="${id}">
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-desc">Preis ↓</option>
            <option value="price-asc">Preis ↑</option>
            <option value="change24h-desc">24h ↓</option>
            <option value="change24h-asc">24h ↑</option>
          </select>
          <!-- Collapse Toggle -->
          <button class="collapse-toggle w-8 h-8 rounded-lg bg-surface-700 hover:bg-surface-600 flex items-center justify-center transition-colors border border-white/5"
                  data-section="${id}" title="${isCollapsed ? 'Aufklappen' : 'Einklappen'}">
            <svg class="w-4 h-4 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${collapseIcon}"/>
            </svg>
          </button>
        </div>
      </div>
      <div id="${gridId}" class="grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4 section-content ${isCollapsed ? 'hidden' : ''}" data-section="${id}">
        <!-- Cards will be inserted here -->
      </div>
    </section>
    <div class="section-divider mb-10"></div>
  `;
}

/**
 * Create watchlist section
 * @returns {string} HTML string
 */
export function createWatchlistSection() {
  return `
    <section class="mb-10" data-section="watchlist" id="watchlistSection">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent-amber/20 flex items-center justify-center">
            <svg class="w-4 h-4 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold">Watchlist</h2>
          <span id="watchlistCount" class="text-xs text-gray-500 bg-surface-700 px-2 py-1 rounded-full">0 Favoriten</span>
        </div>
      </div>
      <div id="watchlistGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <p class="text-gray-500 text-sm col-span-full py-4 text-center" id="watchlistEmpty">
          Klicke auf ★ um Assets zu deiner Watchlist hinzuzufügen
        </p>
      </div>
    </section>
    <div class="section-divider mb-10"></div>
  `;
}

/**
 * Create market summary bar
 * @returns {string} HTML string
 */
export function createMarketSummary() {
  return `
    <div id="marketSummary" class="glass-card rounded-2xl p-4 mb-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4 sm:gap-6">
          <div class="text-center">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">NYSE/NASDAQ</p>
            <p id="marketStatus" class="text-sm font-medium text-accent-emerald">● Offen</p>
          </div>
          <div class="w-px h-8 bg-white/10"></div>
          <div class="text-center">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Assets</p>
            <p id="totalAssets" class="text-sm font-mono font-medium">—</p>
          </div>
          <div class="w-px h-8 bg-white/10 hidden sm:block"></div>
          <div class="text-center hidden sm:block">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Trend</p>
            <p id="marketTrend" class="text-sm font-medium">—</p>
          </div>
          <div class="w-px h-8 bg-white/10 hidden md:block"></div>
          <div class="text-center hidden md:block">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Anzeige</p>
            <p id="currencyDisplay" class="text-sm font-mono font-medium text-accent-cyan">USD</p>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>API Status:</span>
          <span id="apiStatus" class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
            Verbunden
          </span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize section event listeners
 */
export function initSectionEvents() {
  // Collapse toggles
  document.querySelectorAll('.collapse-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      const isCollapsed = store.toggleSection(sectionId);
      const content = document.querySelector(`.section-content[data-section="${sectionId}"]`);
      const icon = btn.querySelector('svg');

      if (content) {
        content.classList.toggle('hidden', isCollapsed);
      }
      if (icon) {
        icon.classList.toggle('rotate-180', !isCollapsed);
      }
    });
  });

  // Sort selects
  document.querySelectorAll('.sort-select').forEach((select) => {
    select.addEventListener('change', (e) => {
      const [field, direction] = e.target.value.split('-');
      store.setSortPreference(field, direction);
      document.dispatchEvent(new CustomEvent('sort-updated'));
    });
  });
}
