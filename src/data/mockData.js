export const PRODUCTS = [
  {
    id: 'p001',
    name: 'The Classic Tote',
    tagline: 'Effortless everyday elegance.',
    price: 3499,
    badge: null,
    category: 'tote',
    description:
      'Hand-stitched in genuine leather with a soft suede interior. Fits a 15" laptop and all your daily essentials. Available in Forest Green, Cream, and Charcoal.',
    colors: ['#1A3626', '#F5F5DC', '#2D2D2D'],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  },
  {
    id: 'p002',
    name: 'Executive Office Bag',
    tagline: 'Walk in, own the room.',
    price: 4999,
    badge: 'Bestseller',
    category: 'office',
    description:
      'Structured silhouette with a premium croco-textured flap. Dedicated laptop sleeve, card pockets, and a magnetic closure.',
    colors: ['#2D2D2D', '#8B6914', '#1A3626'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  },
  {
    id: 'p003',
    name: 'Evening Pouch',
    tagline: 'Small bag, big statement.',
    price: 1899,
    badge: 'New',
    category: 'pouch',
    description:
      'A compact, exquisite clutch adorned with handpainted florals. Perfect for events and evenings out.',
    colors: ['#C13A6B', '#F5F5DC', '#2D2D2D'],
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1ac880ce7?w=600&q=80',
  },
  {
    id: 'p004',
    name: 'The Boho Crossbody',
    tagline: 'Wander with purpose.',
    price: 2799,
    badge: null,
    category: 'crossbody',
    description:
      'Bohemian-inspired weave pattern on a compact structured body. Adjustable strap, two-tone zipper, and room for your essentials.',
    colors: ['#8B6914', '#F5F5DC', '#A0522D'],
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  },
  {
    id: 'p005',
    name: 'Minimalist Wallet',
    tagline: 'Clean lines, clean life.',
    price: 1299,
    badge: 'Trending',
    category: 'wallet',
    description:
      'Slim profile bi-fold wallet in full-grain leather. Holds 6 cards, has a cash sleeve, and a coin pocket. Embossed monogramming available.',
    colors: ['#1A3626', '#2D2D2D', '#8B6914'],
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
  },
  {
    id: 'p006',
    name: 'The Canvas Weekender',
    tagline: 'Your weekend, redefined.',
    price: 5499,
    badge: 'Premium',
    category: 'tote',
    description:
      'A large-format waxed canvas weekender bag with full leather trim. Waterproof base, two interior pockets, and a removable shoulder strap.',
    colors: ['#2D2D2D', '#1A3626', '#6B4F3A'],
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80',
  },
  {
    id: 'p007',
    name: 'The Silk Potli',
    tagline: 'Tradition meets luxury.',
    price: 1599,
    badge: 'Trending',
    category: 'pouch',
    description:
      'Handwoven silk potli with zardozi embroidery, a drawstring closure, and a satin lining. A timeless gifting piece.',
    colors: ['#C13A6B', '#8B6914', '#1A3626'],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  },
  {
    id: 'p008',
    name: 'Structured Satchel',
    tagline: 'Precision in every stitch.',
    price: 3999,
    badge: 'Bestseller',
    category: 'satchel',
    description:
      'A clean, architectural satchel with a top handle and detachable crossbody strap. Three compartments and a hidden back pocket.',
    colors: ['#2D2D2D', '#A0522D', '#F5F5DC'],
    image: 'https://images.unsplash.com/photo-1614179818511-86b3d57b6d8e?w=600&q=80',
  },
];

export const TRENDING_IDS = ['p002', 'p005', 'p007', 'p008'];

export const MOCK_ORDERS = [
  { id: '#ORD-1042', customer: 'Riya Sharma', city: 'Mumbai', product: 'Custom Tote - Forest', status: 'Processing', total: 4298 },
  { id: '#ORD-1041', customer: 'Aman Gupta', city: 'Pune', product: 'Executive Office Bag', status: 'Shipped', total: 4999 },
  { id: '#ORD-1040', customer: 'Sneha Patel', city: 'Nagpur', product: 'Evening Pouch - Pink', status: 'Delivered', total: 1899 },
  { id: '#ORD-1039', customer: 'Vikram Joshi', city: 'Delhi', product: 'Canvas Weekender', status: 'Processing', total: 5499 },
  { id: '#ORD-1038', customer: 'Priya Singh', city: 'Bangalore', product: 'Silk Potli + Monogram', status: 'Shipped', total: 2098 },
  { id: '#ORD-1037', customer: 'Rahul Mehta', city: 'Hyderabad', product: 'Minimalist Wallet x2', status: 'Delivered', total: 2598 },
  { id: '#ORD-1036', customer: 'Kavya Nair', city: 'Chennai', product: 'Boho Crossbody', status: 'Processing', total: 2799 },
  { id: '#ORD-1035', customer: 'Arjun Das', city: 'Kolkata', product: 'Structured Satchel', status: 'Shipped', total: 3999 },
];

export const THREAD_COLORS = [
  { name: 'Forest Green', hex: '#1A3626', price: 0 },
  { name: 'Cream', hex: '#F5F5DC', price: 0 },
  { name: 'Charcoal', hex: '#2D2D2D', price: 0 },
  { name: 'Rose Gold', hex: '#B76E79', price: 199 },
  { name: 'Royal Blue', hex: '#2C4A7C', price: 199 },
  { name: 'Burnt Sienna', hex: '#A0522D', price: 299 },
  { name: 'Ivory White', hex: '#FFFFF0', price: 0 },
  { name: 'Midnight', hex: '#0C0C1E', price: 0 },
];

export const PATTERNS = [
  { name: 'None', price: 0, icon: '—' },
  { name: 'Floral Vines', price: 399, icon: '🌿' },
  { name: 'Geometric Grid', price: 299, icon: '◈' },
  { name: 'Abstract Splatter', price: 499, icon: '✦' },
  { name: 'Mandala Bloom', price: 599, icon: '❀' },
  { name: 'Minimal Lines', price: 199, icon: '≡' },
];

export const BASE_BAGS = [
  { name: 'Handbag', basePrice: 3499, icon: '👜' },
  { name: 'Office Bag', basePrice: 4999, icon: '💼' },
  { name: 'Pouch', basePrice: 1299, icon: '👝' },
  { name: 'Purse', basePrice: 2199, icon: '💛' },
  { name: 'Canvas/Sketch', basePrice: 1999, icon: '🎨' },
];

export const DELIVERED_GALLERY = [
  {
    id: 1,
    client: 'Meera T., Mumbai',
    product: 'Custom Monogrammed Tote',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
  },
  {
    id: 2,
    client: 'Ananya R., Pune',
    product: 'Handpainted Evening Pouch',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1ac880ce7?w=500&q=80',
  },
  {
    id: 3,
    client: 'Preethi K., Bangalore',
    product: 'Silk Zardozi Potli',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
  },
  {
    id: 4,
    client: 'Sneha D., Nagpur',
    product: 'Executive Office Bag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
  },
  {
    id: 5,
    client: 'Radhika M., Delhi',
    product: 'Boho Crossbody (Custom)',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
  },
  {
    id: 6,
    client: 'Corporate Gifting – TCS',
    product: 'Canvas Weekender x50',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80',
  },
];
