/**
 * Asset Configuration
 * Central configuration for all tracked assets
 */

export const CONFIG = {
  refreshInterval: 60, // seconds
  baseCurrency: 'USD',
  targetCurrency: 'EUR',
};

/**
 * Forex currency pairs
 */
export const forex = [
  { base: 'EUR', target: 'USD', name: 'Euro / US-Dollar', color: '#0052b4' },
  { base: 'GBP', target: 'USD', name: 'Pfund / US-Dollar', color: '#c8102e' },
  { base: 'JPY', target: 'USD', name: 'Yen / US-Dollar', color: '#bc002d', inverse: true },
  { base: 'CHF', target: 'USD', name: 'Franken / US-Dollar', color: '#d52b1e' },
  { base: 'CNY', target: 'USD', name: 'Yuan / US-Dollar', color: '#de2910', inverse: true },
  { base: 'AUD', target: 'USD', name: 'AUD / US-Dollar', color: '#00008b' },
  { base: 'CAD', target: 'USD', name: 'CAD / US-Dollar', color: '#ff0000' },
  { base: 'SEK', target: 'USD', name: 'Schwedische Krone', color: '#006aa7' },
  { base: 'NOK', target: 'USD', name: 'Norwegische Krone', color: '#ba0c2f' },
  { base: 'PLN', target: 'USD', name: 'Polnischer Zloty', color: '#dc143c' },
  { base: 'TRY', target: 'USD', name: 'Türkische Lira', color: '#e30a17' },
  { base: 'INR', target: 'USD', name: 'Indische Rupie', color: '#ff9933' },
  { base: 'BTC', target: 'USD', name: 'Bitcoin / US-Dollar', color: '#f7931a', crypto: true },
];

/**
 * Cryptocurrencies - fetched via CoinGecko API
 */
export const crypto = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: '#627eea' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', color: '#00ffa3' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', color: '#0033ad' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple', color: '#00aae4' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', color: '#e6007a' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', color: '#f3ba2f' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', color: '#e84142' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', color: '#2a5ada' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', color: '#ff007a' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', color: '#bfbbbb' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', color: '#c2a633' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', color: '#fda32b' },
];

/**
 * Stocks - fetched via Finnhub API
 */
export const stocks = [
  { symbol: 'AAPL', name: 'Apple', color: '#a2aaad' },
  { symbol: 'MSFT', name: 'Microsoft', color: '#00a4ef' },
  { symbol: 'NVDA', name: 'NVIDIA', color: '#76b900' },
  { symbol: 'GOOGL', name: 'Alphabet', color: '#4285f4' },
  { symbol: 'AMZN', name: 'Amazon', color: '#ff9900' },
  { symbol: 'TSLA', name: 'Tesla', color: '#cc0000' },
  { symbol: 'META', name: 'Meta', color: '#0668e1' },
  { symbol: 'AMD', name: 'AMD', color: '#ed1c24' },
  { symbol: 'INTC', name: 'Intel', color: '#0071c5' },
  { symbol: 'CRM', name: 'Salesforce', color: '#00a1e0' },
  { symbol: 'NFLX', name: 'Netflix', color: '#e50914' },
  { symbol: 'PYPL', name: 'PayPal', color: '#003087' },
];

/**
 * ETFs - Exchange Traded Funds
 */
export const etfs = [
  { symbol: 'SPY', name: 'S&P 500 ETF', color: '#ff6b6b' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', color: '#4ecdc4' },
  { symbol: 'VTI', name: 'Total Stock Market', color: '#45b7d1' },
  { symbol: 'IWM', name: 'Russell 2000', color: '#96ceb4' },
  { symbol: 'EEM', name: 'Emerging Markets', color: '#ffeaa7' },
  { symbol: 'GLD', name: 'Gold ETF', color: '#ffd700' },
  { symbol: 'TLT', name: '20+ Year Treasury', color: '#a29bfe' },
  { symbol: 'VNQ', name: 'Real Estate ETF', color: '#fd79a8' },
];

/**
 * Precious Metals - fetched via Metals.dev API
 */
export const metals = [
  { symbol: 'XAU', name: 'Gold', unit: 'oz', color: '#ffd700' },
  { symbol: 'XAG', name: 'Silber', unit: 'oz', color: '#c0c0c0' },
  { symbol: 'XPT', name: 'Platin', unit: 'oz', color: '#e5e4e2' },
];

/**
 * Soft Commodities / Agricultural
 */
export const softCommodities = [
  { symbol: 'COCOA', name: 'Kakao', unit: 'MT', color: '#5c3317' },
  { symbol: 'COFFEE', name: 'Kaffee', unit: 'lb', color: '#6f4e37' },
  { symbol: 'SUGAR', name: 'Zucker', unit: 'lb', color: '#f5f5dc' },
  { symbol: 'WHEAT', name: 'Weizen', unit: 'bu', color: '#f5deb3' },
  { symbol: 'CORN', name: 'Mais', unit: 'bu', color: '#fbec5d' },
  { symbol: 'COTTON', name: 'Baumwolle', unit: 'lb', color: '#fffaf0' },
];

/**
 * Base prices for simulation/fallback (January 2025 values)
 */
export const basePrices = {
  stocks: {
    AAPL: 232.5,
    MSFT: 425.8,
    NVDA: 138.5,
    GOOGL: 193.2,
    AMZN: 225.4,
    TSLA: 410.5,
    META: 595.0,
    AMD: 125.0,
    INTC: 22.5,
    CRM: 340.0,
    NFLX: 920.0,
    PYPL: 90.0,
  },
  etfs: {
    SPY: 595.0,
    QQQ: 520.0,
    VTI: 285.0,
    IWM: 225.0,
    EEM: 42.0,
    GLD: 245.0,
    TLT: 88.0,
    VNQ: 92.0,
  },
  metals: {
    XAU: 2650.0,
    XAG: 31.5,
    XPT: 980.0,
  },
  softCommodities: {
    COCOA: 9500.0,
    COFFEE: 3.25,
    SUGAR: 0.21,
    WHEAT: 5.45,
    CORN: 4.35,
    COTTON: 0.72,
  },
  forex: {
    EUR: 1.08,
    GBP: 1.27,
    JPY: 0.0067,
    CHF: 1.13,
    CNY: 0.14,
    AUD: 0.65,
    CAD: 0.74,
    SEK: 0.094,
    NOK: 0.089,
    PLN: 0.245,
    TRY: 0.029,
    INR: 0.012,
  },
};

/**
 * Theme configurations
 */
export const themes = {
  dark: {
    name: 'Dark',
    bg: '#0a0a0f',
    surface900: '#0a0a0f',
    surface800: '#12121a',
    surface700: '#1a1a24',
    surface600: '#24242f',
    accent: '#06b6d4',
  },
  light: {
    name: 'Light',
    bg: '#f8fafc',
    surface900: '#f8fafc',
    surface800: '#ffffff',
    surface700: '#f1f5f9',
    surface600: '#e2e8f0',
    accent: '#0891b2',
  },
  oled: {
    name: 'OLED',
    bg: '#000000',
    surface900: '#000000',
    surface800: '#0a0a0a',
    surface700: '#121212',
    surface600: '#1a1a1a',
    accent: '#06b6d4',
  },
};

/**
 * Section configuration
 */
export const sections = [
  { id: 'watchlist', name: 'Watchlist', icon: 'star', color: 'amber' },
  { id: 'forex', name: 'Währungen', icon: 'currency', color: 'sky', api: 'frankfurter' },
  { id: 'crypto', name: 'Kryptowährungen', icon: 'crypto', color: 'amber', api: 'coingecko' },
  { id: 'stocks', name: 'Aktien', icon: 'chart', color: 'cyan', api: 'finnhub' },
  { id: 'etfs', name: 'ETFs', icon: 'layers', color: 'emerald', api: 'finnhub' },
  { id: 'metals', name: 'Edelmetalle', icon: 'cube', color: 'violet', api: 'metals' },
  { id: 'softCommodities', name: 'Agrarrohstoffe', icon: 'globe', color: 'lime', api: 'simulated' },
];
