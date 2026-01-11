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
  // Starke Weltwährungen
  { base: 'EUR', target: 'USD', name: 'Euro', color: '#0052b4' },
  { base: 'GBP', target: 'USD', name: 'Britisches Pfund', color: '#c8102e' },
  { base: 'CHF', target: 'USD', name: 'Schweizer Franken', color: '#d52b1e' },

  // Asien - Ostasien
  { base: 'JPY', target: 'USD', name: 'Japanischer Yen', color: '#bc002d', inverse: true },
  { base: 'CNY', target: 'USD', name: 'Chinesischer Yuan', color: '#de2910', inverse: true },
  { base: 'HKD', target: 'USD', name: 'Hongkong-Dollar', color: '#de2910', inverse: true },
  { base: 'KRW', target: 'USD', name: 'Südkoreanischer Won', color: '#003478', inverse: true },

  // Asien - Südostasien
  { base: 'SGD', target: 'USD', name: 'Singapur-Dollar', color: '#ef3340' },
  { base: 'MYR', target: 'USD', name: 'Malaysischer Ringgit', color: '#010066', inverse: true },
  { base: 'THB', target: 'USD', name: 'Thailändischer Baht', color: '#2d2a4a', inverse: true },
  { base: 'IDR', target: 'USD', name: 'Indonesische Rupiah', color: '#ce1126', inverse: true },
  { base: 'PHP', target: 'USD', name: 'Philippinischer Peso', color: '#0038a8', inverse: true },

  // Asien - Südasien
  { base: 'INR', target: 'USD', name: 'Indische Rupie', color: '#ff9933', inverse: true },
  { base: 'PKR', target: 'USD', name: 'Pakistanische Rupie', color: '#01411c', inverse: true },

  // Arabische / Naher Osten (Starke Währungen)
  { base: 'KWD', target: 'USD', name: 'Kuwait-Dinar', color: '#007a3d' },
  { base: 'BHD', target: 'USD', name: 'Bahrain-Dinar', color: '#ce1126' },
  { base: 'OMR', target: 'USD', name: 'Omanischer Rial', color: '#db161b' },
  { base: 'JOD', target: 'USD', name: 'Jordanischer Dinar', color: '#007a3d' },
  { base: 'AED', target: 'USD', name: 'VAE-Dirham', color: '#00732f', inverse: true },
  { base: 'SAR', target: 'USD', name: 'Saudi-Riyal', color: '#006c35', inverse: true },
  { base: 'QAR', target: 'USD', name: 'Katar-Riyal', color: '#8d1b3d', inverse: true },
  { base: 'EGP', target: 'USD', name: 'Ägyptisches Pfund', color: '#ce1126', inverse: true },
  { base: 'ILS', target: 'USD', name: 'Israelischer Schekel', color: '#0038b8', inverse: true },

  // Europa
  { base: 'SEK', target: 'USD', name: 'Schwedische Krone', color: '#006aa7', inverse: true },
  { base: 'NOK', target: 'USD', name: 'Norwegische Krone', color: '#ba0c2f', inverse: true },
  { base: 'DKK', target: 'USD', name: 'Dänische Krone', color: '#c8102e', inverse: true },
  { base: 'PLN', target: 'USD', name: 'Polnischer Zloty', color: '#dc143c', inverse: true },
  { base: 'CZK', target: 'USD', name: 'Tschechische Krone', color: '#11457e', inverse: true },
  { base: 'HUF', target: 'USD', name: 'Ungarischer Forint', color: '#436f4d', inverse: true },
  { base: 'TRY', target: 'USD', name: 'Türkische Lira', color: '#e30a17', inverse: true },
  { base: 'RUB', target: 'USD', name: 'Russischer Rubel', color: '#0039a6', inverse: true },

  // Amerika
  { base: 'CAD', target: 'USD', name: 'Kanadischer Dollar', color: '#ff0000' },
  { base: 'MXN', target: 'USD', name: 'Mexikanischer Peso', color: '#006847', inverse: true },
  { base: 'BRL', target: 'USD', name: 'Brasilianischer Real', color: '#009c3b', inverse: true },

  // Ozeanien & Afrika
  { base: 'AUD', target: 'USD', name: 'Australischer Dollar', color: '#00008b' },
  { base: 'NZD', target: 'USD', name: 'Neuseeland-Dollar', color: '#00247d' },
  { base: 'ZAR', target: 'USD', name: 'Südafrikanischer Rand', color: '#007a4d', inverse: true },

  // Krypto
  { base: 'BTC', target: 'USD', name: 'Bitcoin', color: '#f7931a', crypto: true },
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
    // Starke Weltwährungen
    EUR: 1.08,
    GBP: 1.27,
    CHF: 1.13,
    // Ostasien
    JPY: 0.0067,
    CNY: 0.14,
    HKD: 0.128,
    KRW: 0.00072,
    // Südostasien
    SGD: 0.74,
    MYR: 0.22,
    THB: 0.029,
    IDR: 0.000063,
    PHP: 0.018,
    // Südasien
    INR: 0.012,
    PKR: 0.0036,
    // Arabisch / Naher Osten
    KWD: 3.26,
    BHD: 2.65,
    OMR: 2.60,
    JOD: 1.41,
    AED: 0.27,
    SAR: 0.27,
    QAR: 0.27,
    EGP: 0.020,
    ILS: 0.27,
    // Europa
    SEK: 0.094,
    NOK: 0.089,
    DKK: 0.145,
    PLN: 0.245,
    CZK: 0.042,
    HUF: 0.0027,
    TRY: 0.029,
    RUB: 0.010,
    // Amerika
    CAD: 0.74,
    MXN: 0.050,
    BRL: 0.17,
    // Ozeanien & Afrika
    AUD: 0.65,
    NZD: 0.62,
    ZAR: 0.055,
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
