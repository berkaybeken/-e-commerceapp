const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

const FALLBACK_PRODUCTS = [
  { id: 1, title: 'Fallback Backpack', price: 109.95, description: 'Fallback item', category: "men's clothing", image: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Fallback T-Shirt',  price: 22.3,   description: 'Fallback item', category: "men's clothing", image: 'https://via.placeholder.com/300' }
];

function loadDb() {
  if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  return { products: [], users: [], orders: [] };
}

async function getProductsSafe() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('fetch failed ' + res.status);
    const arr = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('empty array');
    return arr.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
    }));
  } catch (e) {
    console.warn('[seed] fakestore fetch failed, using fallback. Reason:', e.message);
    return FALLBACK_PRODUCTS;
  }
}

(async () => {
  const db = loadDb();
  const products = await getProductsSafe();

  if (Array.isArray(products) && products.length > 0) {
    db.products = products;
  } else if (!db.products || db.products.length === 0) {
    db.products = FALLBACK_PRODUCTS;
  }

  if (!db.users || db.users.length === 0) {
    db.users = [{ id: 1, email: 'demo@mobiversite.com', password: '123456', name: 'Demo User' }];
  }
  if (!db.orders) db.orders = [];

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  console.log(`Seeded ${db.products.length} products → ${dbPath}`);
})();
