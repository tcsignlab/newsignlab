/*******************************
 CONFIGURATION
********************************/

const CONFIG = {
  sheetsId: '',
  apiKey: '',

  sheets: {
    products: 'Products',
    categories: 'Categories',
    materials: 'Materials',
    finishing: 'Finishing'
  },

  // md5("admin123")
  adminPasswordHash: "240be518fabd2724ddb6f04eeb1da596",

  storageKeys: {
    auth: "signs365_auth",
    cart: "signs365_cart",
    settings: "signs365_settings"
  }
};


/*******************************
 SAMPLE PRODUCTS
********************************/

const SAMPLE_PRODUCTS = [
  {
    id:"banner-vinyl",
    name:"Vinyl Banner",
    category:"banner",
    description:"Heavy Duty Vinyl Banner",
    image:"https://via.placeholder.com/400x300?text=Vinyl+Banner",
    status:"active"
  },
  {
    id:"coroplast",
    name:"Coroplast Sign",
    category:"rigid",
    description:"Corrugated Plastic Sign",
    image:"https://via.placeholder.com/400x300?text=Coroplast",
    status:"active"
  },
  {
    id:"acrylic",
    name:"Acrylic Sign",
    category:"rigid",
    description:"Clear Acrylic Sign",
    image:"https://via.placeholder.com/400x300?text=Acrylic",
    status:"active"
  }
];


/*******************************
 HELPERS
********************************/

const CONFIG_HELPERS = {

  isAdminAuthenticated() {
    return localStorage.getItem(CONFIG.storageKeys.auth) === "true";
  },

  setAdminAuth(val) {
    localStorage.setItem(CONFIG.storageKeys.auth, val);
  },

  async md5(str) {
    const data = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("MD5", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

};
