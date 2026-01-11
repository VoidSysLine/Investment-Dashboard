/**
 * Header Component
 * Top navigation bar with controls
 */

import { store } from '../state/store.js';
import { formatDateTime } from '../utils/formatters.js';
import { getUSMarketStatus } from '../utils/marketStatus.js';
import { themes } from '../config/assets.js';

/**
 * Create header HTML
 * @returns {string} HTML string
 */
export function createHeader() {
  const state = store.getState();
  const isEur = state.currency === 'EUR';

  return `
    <header class="sticky top-0 z-50 border-b border-white/5 bg-surface-900/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo & Title -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-semibold tracking-tight">Finance Hub</h1>
              <p class="text-xs text-gray-500">Live Market Data</p>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Search -->
            <div class="relative hidden sm:block">
              <input type="text" id="searchInput" placeholder="Suchen..."
                     class="w-32 lg:w-48 px-3 py-1.5 pl-8 text-sm bg-surface-700 border border-white/5 rounded-lg
                            focus:outline-none focus:border-accent-cyan/50 text-white placeholder-gray-500">
              <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <button id="clearSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white hidden">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Theme Toggle -->
            <button id="themeToggle" class="w-9 h-9 rounded-lg bg-surface-700 hover:bg-surface-600 flex items-center justify-center transition-colors border border-white/5" title="Theme wechseln">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </button>

            <!-- Currency Toggle -->
            <div id="currencyToggle" class="currency-toggle ${isEur ? 'eur' : ''}" title="Währung wechseln">
              <div class="currency-toggle-slider"></div>
              <div class="currency-toggle-labels">
                <span class="currency-toggle-label usd">USD</span>
                <span class="currency-toggle-label eur">EUR</span>
              </div>
            </div>

            <!-- Exchange Rate Display -->
            <div class="hidden md:flex items-center gap-2 text-xs text-gray-400 bg-surface-700 px-3 py-1.5 rounded-lg">
              <span>1 USD =</span>
              <span id="exchangeRateDisplay" class="font-mono text-accent-cyan">—</span>
              <span>EUR</span>
            </div>

            <!-- Last Update -->
            <div class="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span id="lastUpdate">—</span>
            </div>

            <!-- Countdown -->
            <div class="relative w-9 h-9 flex items-center justify-center">
              <svg class="absolute w-9 h-9 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--surface-600)" stroke-width="2"/>
                <circle id="countdownRing" cx="18" cy="18" r="15" fill="none" stroke="var(--accent-cyan)" stroke-width="2" class="countdown-ring"/>
              </svg>
              <span id="countdownText" class="text-xs font-mono text-gray-400">60</span>
            </div>

            <!-- Refresh Button -->
            <button id="refreshBtn" class="refresh-btn w-10 h-10 rounded-xl bg-surface-700 hover:bg-surface-600 flex items-center justify-center transition-all duration-300 border border-white/5">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Update header display elements
 */
export function updateHeaderDisplay() {
  const state = store.getState();

  // Update exchange rate
  const rateEl = document.getElementById('exchangeRateDisplay');
  if (rateEl) {
    rateEl.textContent = state.exchangeRate.toFixed(4);
  }

  // Update last update time
  const lastUpdateEl = document.getElementById('lastUpdate');
  if (lastUpdateEl && state.lastUpdate) {
    lastUpdateEl.textContent = `Update: ${formatDateTime(state.lastUpdate)}`;
  }

  // Update currency toggle
  const toggle = document.getElementById('currencyToggle');
  if (toggle) {
    toggle.classList.toggle('eur', state.currency === 'EUR');
  }
}

/**
 * Initialize header event listeners
 * @param {Function} onRefresh - Refresh callback
 */
export function initHeaderEvents(onRefresh) {
  // Refresh button
  document.getElementById('refreshBtn')?.addEventListener('click', onRefresh);

  // Currency toggle
  document.getElementById('currencyToggle')?.addEventListener('click', () => {
    store.toggleCurrency();
    onRefresh();
  });

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    store.cycleTheme();
    applyTheme();
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');

  searchInput?.addEventListener('input', (e) => {
    store.setSearchQuery(e.target.value);
    clearBtn?.classList.toggle('hidden', !e.target.value);
    document.dispatchEvent(new CustomEvent('search-updated'));
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    store.setSearchQuery('');
    clearBtn.classList.add('hidden');
    document.dispatchEvent(new CustomEvent('search-updated'));
  });
}

/**
 * Apply current theme to document
 */
export function applyTheme() {
  const state = store.getState();
  const theme = themes[state.theme] || themes.dark;

  // Set data-theme attribute for CSS selectors
  document.documentElement.setAttribute('data-theme', state.theme);

  document.documentElement.style.setProperty('--surface-900', theme.surface900);
  document.documentElement.style.setProperty('--surface-800', theme.surface800);
  document.documentElement.style.setProperty('--surface-700', theme.surface700);
  document.documentElement.style.setProperty('--surface-600', theme.surface600);
  document.documentElement.style.setProperty('--bg-color', theme.bg);

  document.body.style.background = theme.bg;
}
