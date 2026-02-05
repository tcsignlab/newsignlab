// Configuration for Google Sheets integration
const CONFIG = {
    // Google Sheets Configuration
    sheetsId: '1BXHZ_6EO7oKgIt1IxpuRFsDuu2-0LS2M7reuX4sAPfM', // Add your Google Sheets ID here
    apiKey: 'AIzaSyB4VkXCiACigBico7QE8j0EUD7bG3OAEBY', // Add your Google API key here
    
    // Sheet names
    sheets: {
        products: 'Products',
        categories: 'Categories',
        materials: 'Materials',
        finishing: 'Finishing'
    },
    
    // Admin password (change this!)
    adminPassword: '240be518fabd2724ddb6f04eeb1da596',
    
    // Default settings
    defaultCategory: 'banner',
    defaultCurrency: 'USD',
    productionTime: '24 Hours',
    
    // Image storage
    imageFolder: 'product-images',
    
    // Local storage keys
    storageKeys: {
        auth: 'signs365_auth',
        settings: 'signs365_settings',
        cart: 'signs365_cart',
        images: 'signs365_images'
    }
};

// Sample product data structure (for initial setup)
const SAMPLE_PRODUCTS = [

/* =======================
   BANNERS
======================= */

{
  id: 'hd-banner-vinyl',
  name: 'HD BANNER (VINYL)',
  category: 'banner',
  description: 'Premium Vinyl Scrim Banner - Most Popular',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  status: 'active',
  materials: [
    { name: '13oz', price: 1.25 },
    { name: '15oz', price: 1.75 },
    { name: '18oz', price: 2.25 }
  ],
  options: { printSides:['single','double'], grommets:['yes','no'] },
  pricing: {
    singleSided:{ '13oz':1.25,'15oz':1.75,'18oz':2.25 },
    doubleSided:4.25
  }
},

{
  id:'mesh-banner',
  name:'MESH',
  category:'banner',
  description:'Wind resistant perforated mesh banner',
  image:'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
  status:'active',
  materials:[{name:'9oz Mesh',price:2.75}],
  options:{ printSides:['single'], grommets:['yes','no'] },
  pricing:{ singleSided:{'9oz Mesh':2.75} }
},

{
  id:'canvas-banner',
  name:'CANVAS',
  category:'banner',
  description:'Poly-Cotton Blend Canvas',
  image:'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop',
  status:'active',
  materials:[{name:'Premium Canvas',price:3.50}],
  options:{ printSides:['single'] },
  pricing:{ singleSided:{'Premium Canvas':3.50} }
},

/* =======================
   RIGID
======================= */

{
  id:'coroplast',
  name:'COROPLAST',
  category:'rigid',
  description:'Corrugated Plastic Yard Signs',
  image:'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
  status:'active',
  materials:[
    {name:'4mm',price:3.00},
    {name:'10mm',price:4.50}
  ],
  options:{ printSides:['single','double'] },
  pricing:{
    singleSided:{'4mm':3,'10mm':4.5},
    doubleSided:{'4mm':5,'10mm':7}
  }
},

{
  id:'acrylic',
  name:'ACRYLIC',
  category:'rigid',
  description:'Clear Acrylic Signage',
  image:'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=300&fit=crop',
  status:'active',
  materials:[{name:'3/16 Clear',price:8.5}],
  options:{ printSides:['single'] },
  pricing:{ singleSided:{'3/16 Clear':8.5} }
},

{
  id:'pvc',
  name:'PVC',
  category:'rigid',
  description:'PVC Board Signs',
  image:'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop',
  status:'active',
  materials:[
    {name:'3mm',price:5.5},
    {name:'6mm',price:7.5}
  ],
  options:{ printSides:['single','double'] },
  pricing:{
    singleSided:{'3mm':5.5,'6mm':7.5},
    doubleSided:{'3mm':9,'6mm':12}
  }
}

];

    {
        id: 'hdpe-banner',
        name: 'HDPE',
        category: 'banner',
        description: 'Water & Tear Resistant Paper',
        image: 'https://via.placeholder.com/400x300?text=HDPE+Banner',
        status: 'active',
        materials: [
            { name: 'Standard', price: 2.50, description: 'Durable paper material' }
        ],
        options: {
            printSides: ['single', 'double'],
            grommets: ['yes', 'no']
        },
        pricing: {
            singleSided: { 'Standard': 2.50 },
            doubleSided: 4.50
        }
    },
    {
        id: 'canvas-banner',
        name: 'CANVAS',
        category: 'banner',
        description: 'Poly-Cotton Blend, Stretch & Frame',
        image: 'https://via.placeholder.com/400x300?text=Canvas+Banner',
        status: 'active',
        materials: [
            { name: 'Premium Canvas', price: 3.50, description: 'Museum quality canvas' }
        ],
        options: {
            printSides: ['single']
        },
        pricing: {
            singleSided: { 'Premium Canvas': 3.50 }
        }
    },
    {
        id: 'mesh-banner',
        name: 'MESH',
        category: 'banner',
        description: 'Polyester with Air-Flow Perforation',
        image: 'https://via.placeholder.com/400x300?text=Mesh+Banner',
        status: 'active',
        materials: [
            { name: '9oz Mesh', price: 2.75, description: 'Wind resistant mesh' }
        ],
        options: {
            printSides: ['single'],
            grommets: ['yes', 'no']
        },
        pricing: {
            singleSided: { '9oz Mesh': 2.75 }
        }
    },
    {
        id: 'coroplast',
        name: 'COROPLAST',
        category: 'rigid',
        description: 'High Definition Yard Signs',
        image: 'https://via.placeholder.com/400x300?text=Coroplast+Sign',
        status: 'active',
        materials: [
            { name: '4mm', price: 3.00, description: 'Standard thickness' },
            { name: '10mm', price: 4.50, description: 'Extra thick' }
        ],
        options: {
            printSides: ['single', 'double']
        },
        pricing: {
            singleSided: { '4mm': 3.00, '10mm': 4.50 },
            doubleSided: { '4mm': 5.00, '10mm': 7.00 }
        }
    },
    {
        id: 'acrylic',
        name: 'ACRYLIC',
        category: 'rigid',
        description: 'Rigid Plastic, Great for Photos & Indoor Signage',
        image: 'https://via.placeholder.com/400x300?text=Acrylic+Sign',
        status: 'active',
        materials: [
            { name: '3/16" Clear', price: 8.50, description: 'Premium clear acrylic' },
            { name: '3/16" White', price: 8.50, description: 'White backed acrylic' }
        ],
        options: {
            printSides: ['single'],
            mounting: ['none', 'standoffs', 'wall-mount']
        },
        pricing: {
            singleSided: { '3/16" Clear': 8.50, '3/16" White': 8.50 }
        }
    },
    {
        id: 'foamcore',
        name: 'FOAMCORE',
        category: 'rigid',
        description: 'Foam Board, Sturdy & Durable',
        image: 'https://via.placeholder.com/400x300?text=Foamcore',
        status: 'active',
        materials: [
            { name: '3/16"', price: 4.00, description: 'Lightweight foam board' }
        ],
        options: {
            printSides: ['single', 'double']
        },
        pricing: {
            singleSided: { '3/16"': 4.00 },
            doubleSided: { '3/16"': 6.50 }
        }
    },
    {
        id: 'pvc',
        name: 'PVC',
        category: 'rigid',
        description: 'Great For Displays, Indoor or Outdoor',
        image: 'https://via.placeholder.com/400x300?text=PVC+Board',
        status: 'active',
        materials: [
            { name: '3mm', price: 5.50, description: 'Standard PVC' },
            { name: '6mm', price: 7.50, description: 'Thick PVC' }
        ],
        options: {
            printSides: ['single', 'double']
        },
        pricing: {
            singleSided: { '3mm': 5.50, '6mm': 7.50 },
            doubleSided: { '3mm': 9.00, '6mm': 12.00 }
        }
    }
];

// Helper functions
const CONFIG_HELPERS = {
    // Get sheet URL for API calls
    getSheetUrl: (sheetName, range = '') => {
        if (!CONFIG.sheetsId || !CONFIG.apiKey) {
            console.warn('Google Sheets not configured');
            return null;
        }
        const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheetsId}/values/${sheetName}`;
        const rangeParam = range ? `!${range}` : '';
        return `${baseUrl}${rangeParam}?key=${CONFIG.apiKey}`;
    },
    
    // Check if admin is authenticated
    isAdminAuthenticated: () => {
        const auth = localStorage.getItem(CONFIG.storageKeys.auth);
        return auth === 'true';
    },
    
    // Save admin authentication
    setAdminAuth: (value) => {
        localStorage.setItem(CONFIG.storageKeys.auth, value.toString());
    },
    
    // Get cart from localStorage
    getCart: () => {
        const cart = localStorage.getItem(CONFIG.storageKeys.cart);
        return cart ? JSON.parse(cart) : [];
    },
    
    // Save cart to localStorage
    saveCart: (cart) => {
        localStorage.setItem(CONFIG.storageKeys.cart, JSON.stringify(cart));
    },
    
    // Get settings from localStorage
    getSettings: () => {
        const settings = localStorage.getItem(CONFIG.storageKeys.settings);
        return settings ? JSON.parse(settings) : {};
    },
    
    // Save settings to localStorage
    saveSettings: (settings) => {
        localStorage.setItem(CONFIG.storageKeys.settings, JSON.stringify(settings));
    },
    
    // Format price
    formatPrice: (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    },
    
    // Calculate square footage
    calculateSqft: (width, height) => {
        return (width * height) / 144; // Convert square inches to square feet
    }
};
CONFIG_HELPERS.hash = async (str) => {
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('MD5', buf);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');
};
