/**
 * Charts Utility
 * Mini chart generation for asset cards
 */

/**
 * Generate random chart points with trend
 * @param {boolean} isPositive - Positive trend direction
 * @param {number} count - Number of points
 * @returns {number[]}
 */
export function generateChartPoints(isPositive = true, count = 20) {
  const trend = isPositive ? -0.5 : 0.5;
  const points = [];
  let y = 20 + Math.random() * 10;

  for (let i = 0; i < count; i++) {
    y += (Math.random() - 0.5 + trend) * 3;
    y = Math.max(5, Math.min(35, y));
    points.push(y);
  }

  return points;
}

/**
 * Generate SVG path for filled area chart
 * @param {number[]} points - Y coordinates
 * @param {number} height - Chart height
 * @returns {string}
 */
export function generateAreaPath(points, height = 40) {
  if (points.length === 0) return '';

  let path = `M 0 ${height} L 0 ${points[0]}`;

  points.forEach((y, i) => {
    const x = (i / (points.length - 1)) * 100;
    path += ` L ${x} ${y}`;
  });

  path += ` L 100 ${height} Z`;
  return path;
}

/**
 * Generate SVG path for line chart
 * @param {number[]} points - Y coordinates
 * @returns {string}
 */
export function generateLinePath(points) {
  if (points.length === 0) return '';

  let path = `M 0 ${points[0]}`;

  points.forEach((y, i) => {
    if (i === 0) return;
    const x = (i / (points.length - 1)) * 100;
    path += ` L ${x} ${y}`;
  });

  return path;
}

/**
 * Generate mini chart SVG markup
 * @param {boolean} isPositive - Positive trend
 * @param {string} id - Unique ID for gradient
 * @returns {string}
 */
export function generateMiniChart(isPositive, id) {
  const points = generateChartPoints(isPositive);
  const areaPath = generateAreaPath(points);
  const linePath = generateLinePath(points);
  const color = isPositive ? '#10b981' : '#f43f5e';

  return `
    <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
      <defs>
        <linearGradient id="chartGradient${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#chartGradient${id})" />
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
}

/**
 * Generate sparkline from historical data
 * @param {number[]} data - Historical price data
 * @param {number} height - Chart height
 * @returns {string}
 */
export function generateSparkline(data, height = 40) {
  if (!data || data.length < 2) return '';

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value) => {
    return height - ((value - min) / range) * (height - 4) - 2;
  });

  return generateLinePath(points);
}
