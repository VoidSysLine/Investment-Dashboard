# Finance Hub

Live Market Dashboard für Echtzeit-Finanzdaten.

![Finance Hub Dashboard](https://via.placeholder.com/800x450/0a0a0f/06b6d4?text=Finance+Hub+Dashboard)

## Features

- **Kryptowährungen** - Bitcoin, Ethereum, Solana, und mehr via CoinGecko API
- **Aktien** - Apple, Microsoft, NVIDIA, Tesla und weitere via Finnhub API
- **ETFs** - S&P 500, Nasdaq 100, Emerging Markets und mehr
- **Forex** - EUR/USD, GBP/USD, JPY/USD und weitere Währungspaare
- **Edelmetalle** - Gold, Silber, Platin
- **Agrarrohstoffe** - Kakao, Kaffee, Weizen, Mais

### Zusätzliche Features

- **Watchlist** - Favorisiere Assets mit einem Klick
- **Suche** - Echtzeit-Filter über alle Assets
- **Sortierung** - Nach Name, Preis oder 24h-Änderung
- **Sections einklappen** - Minimiere einzelne Kategorien
- **Theme System** - Dark, Light und OLED Themes
- **Währungsumrechnung** - USD/EUR Toggle
- **Markt-Status** - NYSE/NASDAQ Handelszeiten
- **PWA Support** - Installierbar auf dem Homescreen
- **Responsive Design** - Optimiert für alle Bildschirmgrößen

## Tech Stack

- **Vite** - Build Tool & Dev Server
- **Vanilla JS** - Kein Framework, pure ES Modules
- **Tailwind CSS** - Utility-first CSS Framework
- **ES Modules** - Moderne JavaScript Module

## Installation

```bash
# Repository klonen
git clone https://github.com/your-username/finance-hub.git
cd finance-hub

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Der Dev Server läuft auf `http://localhost:3000`.

## API Keys

Das Dashboard nutzt folgende APIs:

| API | Key benötigt | Free Tier |
|-----|--------------|-----------|
| CoinGecko | Nein | 30 Calls/min |
| Frankfurter | Nein | Unbegrenzt |
| Finnhub | Ja | 60 Calls/min |
| Metals.dev | Ja | 25 Calls/Monat |

### API Keys einrichten

1. Kopiere `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Füge deine API Keys ein:
   ```env
   VITE_FINNHUB_API_KEY=dein_finnhub_key
   VITE_METALS_API_KEY=dein_metals_key
   ```

3. API Keys bekommst du hier:
   - Finnhub: https://finnhub.io/
   - Metals.dev: https://metals.dev/

> **Hinweis:** Ohne API Keys werden simulierte Daten angezeigt (mit "Demo" Badge).

## Scripts

```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run preview  # Preview Production Build
npm run lint     # ESLint ausführen
npm run format   # Prettier ausführen
```

## Projektstruktur

```
finance-hub/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.js              # Entry Point
│   ├── styles/
│   │   └── main.css         # Tailwind + Custom Styles
│   ├── config/
│   │   ├── assets.js        # Asset-Konfiguration
│   │   └── api-keys.js      # API Keys
│   ├── services/
│   │   ├── api.js           # Base API Utilities
│   │   ├── coingecko.js     # Crypto API
│   │   ├── finnhub.js       # Stocks/ETFs API
│   │   ├── frankfurter.js   # Forex API
│   │   └── metals.js        # Metals API
│   ├── components/
│   │   ├── AssetCard.js     # Asset Card Component
│   │   ├── ForexCard.js     # Forex Card Component
│   │   ├── Header.js        # Header Component
│   │   ├── Section.js       # Section Component
│   │   └── icons.js         # SVG Icons
│   ├── utils/
│   │   ├── formatters.js    # Preis-/Währungsformatierung
│   │   ├── storage.js       # localStorage Handling
│   │   ├── charts.js        # Mini-Chart Generierung
│   │   ├── marketStatus.js  # Markt-Status Logik
│   │   └── logger.js        # Logging Utility
│   └── state/
│       └── store.js         # Zentraler State
├── public/
│   ├── favicon.svg          # App Icon
│   └── manifest.json        # PWA Manifest
└── .env.example             # API Keys Template
```

## Design

- **Dark Theme** als Default
- **Glassmorphism** Cards mit Blur-Effekt
- **Outfit** Font für UI, **JetBrains Mono** für Zahlen
- **Cyan** (#06b6d4) und **Violet** (#8b5cf6) Akzente
- **Grün** für positive, **Rot** für negative Änderungen

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## Lizenz

MIT

---

**Disclaimer:** Kurse dienen nur zur Information — keine Anlageberatung.
