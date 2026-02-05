
/* FIXED CONFIG FILE — auto-generated */

const CONFIG = {
  sheetsId: "1BXHZ_6EO7oKgIt1IxpuRFsDuu2-0LS2M7reuX4sAPfM",
  apiKey: "AIzaSyB4VkXCiACigBico7QE8j0EUD7bG3OAEBY",
  adminPassword: "admin123",
  storageKeys: {
    auth: "adminAuth",
    cart: "cart",
    settings: "settings"
  }
};

const CONFIG_HELPERS = {
  getSheetUrl: (sheetName, range="") => {
    const base =
      `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheetsId}/values/${sheetName}`;
    const r = range ? `!${range}` : "";
    return `${base}${r}?key=${CONFIG.apiKey}`;
  },

  isAdminAuthenticated: () =>
    localStorage.getItem(CONFIG.storageKeys.auth) === "true",

  setAdminAuth: v =>
    localStorage.setItem(CONFIG.storageKeys.auth, String(v)),

  getCart: () =>
    JSON.parse(localStorage.getItem(CONFIG.storageKeys.cart) || "[]"),

  saveCart: cart =>
    localStorage.setItem(CONFIG.storageKeys.cart, JSON.stringify(cart)),

  formatPrice: p => `$${parseFloat(p||0).toFixed(2)}`
};
