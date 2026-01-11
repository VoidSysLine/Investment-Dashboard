/**
 * Finance Hub - Main Entry Point
 * Live Market Dashboard
 */

import './styles/main.css';

import { store } from './state/store.js';
import { CONFIG } from './config/assets.js';
import { logger } from './utils/logger.js';
import { getUSMarketStatus } from './utils/marketStatus.js';

// Services
import { fetchExchangeRate, fetchForexData } from './services/frankfurter.js';
import { fetchCryptoData, fetchBitcoinPrice } from './services/coingecko.js';
import { fetchStockData, fetchETFData } from './services/finnhub.js';
import { fetchMetalsData, fetchSoftCommoditiesData } from './services/metals.js';

// Components
import { createHeader, updateHeaderDisplay, initHeaderEvents, applyTheme } from './components/Header.js';
import { createSection, createWatchlistSection, createMarketSummary, initSectionEvents } from './components/Section.js';
import { createAssetCard, createLoadingCard } from './components/AssetCard.js';
import { createForexCard, createForexLoadingCard } from './components/ForexCard.js';

/**
 * Render main layout
 */
function renderLayout() {
  const app = document.getElementById('app');

  app.innerHTML = `
    ${createHeader()}
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      ${createMarketSummary()}
      ${createWatchlistSection()}
      ${createSection({ id: 'forex', title: 'Währungen', icon: 'currency', color: 'sky', apiLabel: 'Live via Frankfurter API', gridId: 'forexGrid', gridCols: 'lg:grid-cols-4' })}
      ${createSection({ id: 'crypto', title: 'Kryptowährungen', icon: 'crypto', color: 'amber', apiLabel: 'Live via CoinGecko', gridId: 'cryptoGrid' })}
      ${createSection({ id: 'stocks', title: 'Aktien', icon: 'chart', color: 'cyan', apiLabel: 'Live via Finnhub', gridId: 'stocksGrid' })}
      ${createSection({ id: 'etfs', title: 'ETFs', icon: 'layers', color: 'emerald', apiLabel: 'Live via Finnhub', gridId: 'etfsGrid' })}
      ${createSection({ id: 'metals', title: 'Edelmetalle', icon: 'cube', color: 'violet', apiLabel: 'Live via Metals.dev', gridId: 'metalsGrid' })}
      ${createSection({ id: 'softCommodities', title: 'Agrarrohstoffe', icon: 'globe', color: 'lime', apiLabel: 'Soft Commodities', gridId: 'softCommoditiesGrid' })}
    </main>
    <footer class="border-t border-white/5 py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 class="text-sm font-semibold text-white mb-2">Finance Hub</h4>
            <p class="text-xs text-gray-500">Live Market Dashboard für Echtzeit-Finanzdaten. Krypto, Aktien, ETFs, Forex und Rohstoffe auf einen Blick.</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-2">Datenquellen</h4>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• CoinGecko — Kryptowährungen</li>
              <li>• Finnhub — Aktien & ETFs</li>
              <li>• Frankfurter API — Forex</li>
              <li>• Metals.dev — Edelmetalle</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-2">Hinweis</h4>
            <p class="text-xs text-gray-500">Alle Kurse dienen nur zur Information und stellen keine Anlageberatung dar. Verzögerungen möglich.</p>
          </div>
        </div>
        <div class="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>&copy; ${new Date().getFullYear()} Finance Hub</p>
          <p>Daten werden alle 60 Sekunden aktualisiert</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Render section data
 * @param {string} containerId - Grid container ID
 * @param {Array} data - Asset data array
 * @param {string} type - Asset type
 * @param {boolean} isForex - Is forex section
 */
function renderSection(containerId, data, type, isForex = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = store.getState();

  if (state.isLoading && data.length === 0) {
    const loadingCard = isForex ? createForexLoadingCard() : createLoadingCard();
    const count = isForex ? 4 : 3;
    container.innerHTML = Array(count).fill(loadingCard).join('');
    return;
  }

  // Filter and sort data
  let filteredData = store.filterBySearch(data);
  filteredData = store.sortAssets(filteredData);

  if (isForex) {
    container.innerHTML = filteredData.map((pair, i) => createForexCard(pair, i)).join('');
  } else {
    container.innerHTML = filteredData.map((asset, i) => createAssetCard(asset, type, i)).join('');
  }

  // Add favorite button listeners
  container.querySelectorAll('.favorite-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const { type: assetType, id } = btn.dataset;
      const isFav = store.toggleFavorite(assetType, id);
      btn.classList.toggle('text-accent-amber', isFav);
      btn.classList.toggle('text-gray-600', !isFav);
      updateWatchlist();
    });
  });
}

/**
 * Update watchlist section
 */
function updateWatchlist() {
  const favorites = store.getFavoritesData();
  const grid = document.getElementById('watchlistGrid');
  const empty = document.getElementById('watchlistEmpty');
  const count = document.getElementById('watchlistCount');
  const section = document.getElementById('watchlistSection');

  if (!grid) return;

  if (favorites.length === 0) {
    grid.innerHTML = `<p class="text-gray-500 text-sm col-span-full py-4 text-center">
      Klicke auf ★ um Assets zu deiner Watchlist hinzuzufügen
    </p>`;
    section?.classList.add('hidden');
  } else {
    grid.innerHTML = favorites.map((asset, i) => {
      // Use ForexCard for forex favorites
      if (asset.assetType === 'forex') {
        return createForexCard(asset, i);
      }
      return createAssetCard(asset, asset.assetType, i);
    }).join('');
    section?.classList.remove('hidden');

    // Re-add favorite button listeners
    grid.querySelectorAll('.favorite-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { type: assetType, id } = btn.dataset;
        store.toggleFavorite(assetType, id);
        updateWatchlist();
        refreshAllData(); // Re-render all sections to update star states
      });
    });
  }

  if (count) {
    count.textContent = `${favorites.length} Favorit${favorites.length !== 1 ? 'en' : ''}`;
  }
}

/**
 * Update market summary bar
 */
function updateMarketSummary() {
  const state = store.getState();

  // Market status
  const marketStatus = getUSMarketStatus();
  const statusEl = document.getElementById('marketStatus');
  if (statusEl) {
    statusEl.innerHTML = `<span class="text-accent-${marketStatus.color}">${marketStatus.indicator} ${marketStatus.label}</span>`;
  }

  // Total assets
  const totalAssets =
    state.data.crypto.length +
    state.data.stocks.length +
    state.data.etfs.length +
    state.data.metals.length +
    state.data.softCommodities.length +
    state.data.forex.filter((f) => f.loaded).length;

  document.getElementById('totalAssets').textContent = totalAssets;
  document.getElementById('currencyDisplay').textContent = state.currency;

  // Market trend
  const allChanges = [
    ...state.data.crypto.map((a) => a.change24h),
    ...state.data.stocks.map((a) => a.change24h),
    ...state.data.etfs.map((a) => a.change24h),
    ...state.data.metals.map((a) => a.change24h),
    ...state.data.softCommodities.map((a) => a.change24h),
  ].filter((c) => !isNaN(c));

  const avgChange = allChanges.reduce((a, b) => a + b, 0) / allChanges.length;
  const trendEl = document.getElementById('marketTrend');

  if (avgChange >= 0.5) {
    trendEl.innerHTML = '<span class="price-up">↑ Bullish</span>';
  } else if (avgChange <= -0.5) {
    trendEl.innerHTML = '<span class="price-down">↓ Bearish</span>';
  } else {
    trendEl.innerHTML = '<span class="text-gray-400">→ Neutral</span>';
  }

  // API status
  const hasErrors = Object.values(state.errors).some((e) => e);
  const apiStatusEl = document.getElementById('apiStatus');

  if (hasErrors) {
    apiStatusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-accent-amber"></span> Teilweise';
  } else {
    apiStatusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span> Verbunden';
  }
}

/**
 * Update countdown display
 */
function updateCountdown() {
  const state = store.getState();
  const ring = document.getElementById('countdownRing');
  const text = document.getElementById('countdownText');

  const circumference = 2 * Math.PI * 15;
  const offset = circumference * (1 - state.countdown / CONFIG.refreshInterval);

  if (ring) {
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
  }
  if (text) {
    text.textContent = state.countdown;
  }

  if (state.countdown <= 0) {
    refreshAllData();
    store.setCountdown(CONFIG.refreshInterval);
  } else {
    store.setCountdown(state.countdown - 1);
  }
}

/**
 * Refresh all data from APIs
 */
async function refreshAllData() {
  const state = store.getState();
  if (state.isLoading) return;

  store.setLoading(true);
  logger.info('Refreshing all data...');

  // Show loading state
  renderSection('forexGrid', [], 'forex', true);
  renderSection('cryptoGrid', [], 'crypto');
  renderSection('stocksGrid', [], 'stocks');
  renderSection('etfsGrid', [], 'etfs');
  renderSection('metalsGrid', [], 'metals');
  renderSection('softCommoditiesGrid', [], 'softCommodities');

  try {
    // Fetch exchange rate first
    const exchangeRate = await fetchExchangeRate();
    store.setExchangeRate(exchangeRate);

    const currency = store.getState().currency;

    // Fetch all data in parallel
    const [forexData, cryptoData, stockData, etfData, metalsData, softCommoditiesData] = await Promise.all([
      fetchForexData(),
      fetchCryptoData(currency),
      fetchStockData(exchangeRate, currency),
      fetchETFData(exchangeRate, currency),
      fetchMetalsData(exchangeRate, currency),
      fetchSoftCommoditiesData(exchangeRate, currency),
    ]);

    // Update store
    store.setData('forex', forexData);
    store.setData('crypto', cryptoData);
    store.setData('stocks', stockData);
    store.setData('etfs', etfData);
    store.setData('metals', metalsData);
    store.setData('softCommodities', softCommoditiesData);

    // Update BTC in forex from crypto data
    const btcCrypto = cryptoData.find((c) => c.symbol === 'BTC');
    const btcForex = forexData.find((f) => f.crypto);
    if (btcCrypto && btcForex) {
      btcForex.rate = btcCrypto.price;
      btcForex.change24h = btcCrypto.change24h;
      btcForex.loaded = true;
    }

    // Render sections
    renderSection('forexGrid', forexData, 'forex', true);
    renderSection('cryptoGrid', cryptoData, 'crypto');
    renderSection('stocksGrid', stockData, 'stocks');
    renderSection('etfsGrid', etfData, 'etfs');
    renderSection('metalsGrid', metalsData, 'metals');
    renderSection('softCommoditiesGrid', softCommoditiesData, 'softCommodities');

    // Update UI
    store.updateLastRefresh();
    updateHeaderDisplay();
    updateMarketSummary();
    updateWatchlist();

    logger.info('Data refresh complete');
  } catch (error) {
    logger.error('Refresh error:', error);
  } finally {
    store.setLoading(false);
    store.setCountdown(CONFIG.refreshInterval);
  }
}

/**
 * Initialize the application
 */
function init() {
  logger.info('Finance Hub initializing...');

  // Apply theme
  applyTheme();

  // Render layout
  renderLayout();

  // Initialize event listeners
  initHeaderEvents(refreshAllData);
  initSectionEvents();

  // Listen for search/sort updates
  document.addEventListener('search-updated', () => {
    const state = store.getState();
    renderSection('forexGrid', state.data.forex, 'forex', true);
    renderSection('cryptoGrid', state.data.crypto, 'crypto');
    renderSection('stocksGrid', state.data.stocks, 'stocks');
    renderSection('etfsGrid', state.data.etfs, 'etfs');
    renderSection('metalsGrid', state.data.metals, 'metals');
    renderSection('softCommoditiesGrid', state.data.softCommodities, 'softCommodities');
  });

  document.addEventListener('sort-updated', () => {
    const state = store.getState();
    renderSection('forexGrid', state.data.forex, 'forex', true);
    renderSection('cryptoGrid', state.data.crypto, 'crypto');
    renderSection('stocksGrid', state.data.stocks, 'stocks');
    renderSection('etfsGrid', state.data.etfs, 'etfs');
    renderSection('metalsGrid', state.data.metals, 'metals');
    renderSection('softCommoditiesGrid', state.data.softCommodities, 'softCommodities');
  });

  // Initial data load
  refreshAllData();

  // Start countdown
  setInterval(updateCountdown, 1000);

  logger.info('Finance Hub initialized');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
