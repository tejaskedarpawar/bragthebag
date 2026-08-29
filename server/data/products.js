// Server-side product pricing data
// Used to validate order amounts — never trust frontend-supplied prices
export const PRODUCTS = [
  { id: 'p001', name: 'The Classic Tote', price: 3499 },
  { id: 'p002', name: 'Executive Office Bag', price: 4999 },
  { id: 'p003', name: 'Evening Pouch', price: 1899 },
  { id: 'p004', name: 'The Boho Crossbody', price: 2799 },
  { id: 'p005', name: 'Minimalist Wallet', price: 1299 },
  { id: 'p006', name: 'The Canvas Weekender', price: 5499 },
  { id: 'p007', name: 'The Silk Potli', price: 1599 },
  { id: 'p008', name: 'Structured Satchel', price: 3999 },
];

// Thread color add-on prices
export const THREAD_COLORS = {
  'Forest Green': 0,
  'Cream': 0,
  'Charcoal': 0,
  'Rose Gold': 199,
  'Royal Blue': 199,
  'Burnt Sienna': 299,
  'Ivory White': 0,
  'Midnight': 0,
};

// Pattern add-on prices
export const PATTERNS = {
  'None': 0,
  'Floral Vines': 399,
  'Geometric Grid': 299,
  'Abstract Splatter': 499,
  'Mandala Bloom': 599,
  'Minimal Lines': 199,
};

// Base bag prices (for custom "Brag Your Own" bags)
export const BASE_BAGS = {
  'Handbag': 3499,
  'Office Bag': 4999,
  'Pouch': 1299,
  'Purse': 2199,
  'Canvas/Sketch': 1999,
  'The Classic Tote': 3499,
  'Executive Office Bag': 4999,
  'Evening Pouch': 1899,
  'The Boho Crossbody': 2799,
  'Minimalist Wallet': 1299,
  'The Canvas Weekender': 5499,
  'The Silk Potli': 1599,
  'Structured Satchel': 3999,
};

export const MONOGRAM_PRICE = 499;

/**
 * Calculate the true server-side unit price for a cart item.
 * Supports both standard catalog products and custom "Brag Your Own" bags.
 */
export function calculateItemPrice(item) {
  if (!item) return 0;

  // 1. Check if it's a custom bag with customization details
  if (item.customization && typeof item.customization === 'object') {
    const baseName =
      item.customization.base ||
      item.customization.baseName ||
      item.customization.bagType ||
      item.name?.replace(/^Custom\s+/i, '');

    let basePrice = BASE_BAGS[baseName];
    if (basePrice === undefined) {
      // Look up in standard PRODUCTS
      const matchedProd = PRODUCTS.find(
        (p) => p.name === baseName || (baseName && p.name.toLowerCase() === baseName.toLowerCase())
      );
      if (matchedProd) {
        basePrice = matchedProd.price;
      }
    }
    if (basePrice === undefined) {
      // Search partial match in BASE_BAGS
      const foundKey = Object.keys(BASE_BAGS).find(
        (k) => baseName && (baseName.includes(k) || k.includes(baseName))
      );
      basePrice = foundKey ? BASE_BAGS[foundKey] : 0;
    }

    const threadPrice =
      THREAD_COLORS[item.customization.threadColor] !== undefined
        ? THREAD_COLORS[item.customization.threadColor]
        : 0;

    const patternPrice =
      PATTERNS[item.customization.pattern] !== undefined
        ? PATTERNS[item.customization.pattern]
        : 0;

    const monogramPrice =
      item.customization.text && String(item.customization.text).trim().length > 0
        ? MONOGRAM_PRICE
        : 0;

    const customCalculated = basePrice + threadPrice + patternPrice + monogramPrice;
    if (customCalculated > 0) {
      return customCalculated;
    }
  }

  // 2. Standard catalog product lookup by ID or exact Name
  const product = PRODUCTS.find(
    (p) =>
      p.id === item.id ||
      p.name === item.name ||
      (item.name && item.name.toLowerCase() === p.name.toLowerCase())
  );
  if (product) {
    return Number(product.price);
  }

  // 3. Fallback: if item.price is a valid positive number
  const parsedPrice = Number(item.price);
  if (!isNaN(parsedPrice) && parsedPrice > 0 && Number.isFinite(parsedPrice)) {
    return parsedPrice;
  }

  return 0;
}
