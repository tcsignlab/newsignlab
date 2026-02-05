// Admin panel logic
let currentTab = 'products';
let editingProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
});

// Check admin authentication
function checkAdminAuth() {
    if (CONFIG_HELPERS.isAdminAuthenticated()) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        
        if (password === CONFIG.adminPassword) {
            CONFIG_HELPERS.setAdminAuth(true);
            showAdminPanel();
        } else {
            alert('Incorrect password');
        }
    });
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    setupAdminEvents();
    loadProductsTab();
}

// Setup admin event listeners
function setupAdminEvents() {
    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Logout
    document.getElementById('adminLogoutBtn').addEventListener('click', () => {
        CONFIG_HELPERS.setAdminAuth(false);
        window.location.reload();
    });
    
    // Products tab
    document.getElementById('addProductBtn').addEventListener('click', () => {
        editingProduct = null;
        openProductModal();
    });
    
    document.getElementById('syncSheetsBtn').addEventListener('click', syncWithGoogleSheets);
    
    // Categories tab
    document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
    
    // Settings tab
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
    loadSettings();
    
    // Product modal
    document.getElementById('cancelProductBtn').addEventListener('click', closeProductModal);
    document.getElementById('productForm').addEventListener('submit', saveProduct);
    
    // Close modal
    const modal = document.getElementById('productModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', closeProductModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
}

// Switch tab
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Hide all content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected content
    const contentMap = {
        'products': 'productsTab',
        'categories': 'categoriesTab',
        'images': 'imagesTab',
        'settings': 'settingsTab'
    };
    
    const contentId = contentMap[tabName];
    if (contentId) {
        document.getElementById(contentId).style.display = 'block';
    }
    
    // Load content
    switch(tabName) {
        case 'products':
            loadProductsTab();
            break;
        case 'categories':
            loadCategoriesTab();
            break;
        case 'images':
            loadImagesTab();
            break;
    }
}

// Load products tab
function loadProductsTab() {
    const productsJson = localStorage.getItem('signs365_products');
    const products = productsJson ? JSON.parse(productsJson) : SAMPLE_PRODUCTS;
    
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = createProductRow(product);
        tbody.appendChild(row);
    });
}

// Create product row
function createProductRow(product) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${product.id}</td>
        <td><img src="${product.image || 'https://via.placeholder.com/60'}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.description || ''}</td>
        <td><span class="status-badge ${product.status}">${product.status}</span></td>
        <td class="table-actions">
            <i class="fas fa-edit action-icon" data-action="edit"></i>
            <i class="fas fa-trash action-icon delete" data-action="delete"></i>
        </td>
    `;
    
    // Edit button
    tr.querySelector('[data-action="edit"]').addEventListener('click', () => {
        editingProduct = product;
        openProductModal(product);
    });
    
    // Delete button
    tr.querySelector('[data-action="delete"]').addEventListener('click', () => {
        deleteProduct(product.id);
    });
    
    return tr;
}

// Open product modal
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    
    if (product) {
        title.textContent = 'Edit Product';
        populateProductForm(product);
    } else {
        title.textContent = 'Add New Product';
        document.getElementById('productForm').reset();
    }
    
    modal.classList.add('active');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProduct = null;
}

// Populate product form
function populateProductForm(product) {
    document.getElementById('productNameInput').value = product.name;
    document.getElementById('productCategoryInput').value = product.category;
    document.getElementById('productDescriptionInput').value = product.description || '';
    document.getElementById('productImageInput').value = product.image || '';
    document.getElementById('productStatusInput').value = product.status;
    
    if (product.materials) {
        document.getElementById('productMaterialsInput').value = JSON.stringify(product.materials, null, 2);
    }
    
    if (product.options) {
        document.getElementById('productOptionsInput').value = JSON.stringify(product.options, null, 2);
    }
}

// Save product
function saveProduct(e) {
    e.preventDefault();
    
    const productsJson = localStorage.getItem('signs365_products');
    let products = productsJson ? JSON.parse(productsJson) : SAMPLE_PRODUCTS;
    
    // Get form data
    const name = document.getElementById('productNameInput').value;
    const category = document.getElementById('productCategoryInput').value;
    const description = document.getElementById('productDescriptionInput').value;
    const image = document.getElementById('productImageInput').value;
    const status = document.getElementById('productStatusInput').value;
    
    let materials = [];
    let options = {};
    
    try {
        const materialsInput = document.getElementById('productMaterialsInput').value;
        if (materialsInput) {
            materials = JSON.parse(materialsInput);
        }
    } catch (e) {
        alert('Invalid materials JSON');
        return;
    }
    
    try {
        const optionsInput = document.getElementById('productOptionsInput').value;
        if (optionsInput) {
            options = JSON.parse(optionsInput);
        }
    } catch (e) {
        alert('Invalid options JSON');
        return;
    }
    
    // Generate pricing from materials
    const pricing = {
        singleSided: {},
        doubleSided: {}
    };
    
    materials.forEach(mat => {
        pricing.singleSided[mat.name] = mat.price;
        pricing.doubleSided[mat.name] = mat.price * 1.8; // 1.8x for double-sided
    });
    
    if (editingProduct) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProduct.id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                description,
                image,
                status,
                materials,
                options,
                pricing
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            name,
            category,
            description,
            image,
            status,
            materials,
            options,
            pricing
        };
        products.push(newProduct);
    }
    
    // Save to localStorage
    localStorage.setItem('signs365_products', JSON.stringify(products));
    
    // Refresh table
    loadProductsTab();
    closeProductModal();
    
    showNotification('Product saved successfully');
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const productsJson = localStorage.getItem('signs365_products');
    let products = productsJson ? JSON.parse(productsJson) : [];
    
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('signs365_products', JSON.stringify(products));
    
    loadProductsTab();
    showNotification('Product deleted');
}

// Sync with Google Sheets
async function syncWithGoogleSheets() {
    const btn = document.getElementById('syncSheetsBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
    
    try {
        const sheetUrl = CONFIG_HELPERS.getSheetUrl(CONFIG.sheets.products);
        
        if (!sheetUrl) {
            throw new Error('Google Sheets not configured. Please add your Sheets ID and API Key in Settings.');
        }
        
        const response = await fetch(sheetUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch from Google Sheets');
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
            throw new Error('No data found in sheet');
        }
        
        // Parse sheet data
        const headers = data.values[0];
        const products = [];
        
        for (let i = 1; i < data.values.length; i++) {
            const row = data.values[i];
            const product = {};
            
            headers.forEach((header, index) => {
                const value = row[index] || '';
                
                // Parse JSON fields
                if (header === 'materials' || header === 'options' || header === 'pricing') {
                    try {
                        product[header] = JSON.parse(value);
                    } catch (e) {
                        product[header] = value;
                    }
                } else {
                    product[header] = value;
                }
            });
            
            if (product.id && product.name) {
                products.push(product);
            }
        }
        
        // Save to localStorage
        localStorage.setItem('signs365_products', JSON.stringify(products));
        
        // Refresh table
        loadProductsTab();
        
        showNotification(`Synced ${products.length} products from Google Sheets`);
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sync"></i> Sync with Google Sheets';
    }
}

// Load categories tab
function loadCategoriesTab() {
    const categories = [
        { name: 'Banner', icon: 'fa-flag', description: 'Vinyl banners and flexible materials' },
        { name: 'Rigid', icon: 'fa-square', description: 'Hard substrates and boards' },
        { name: 'Adhesive', icon: 'fa-sticky-note', description: 'Stickers and decals' },
        { name: 'Handheld', icon: 'fa-sign', description: 'Portable signs and displays' },
        { name: 'Magnet', icon: 'fa-magnet', description: 'Magnetic materials' },
        { name: 'Apparel', icon: 'fa-tshirt', description: 'Clothing and wearables' },
        { name: 'Misc', icon: 'fa-th', description: 'Other products' }
    ];
    
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <i class="fas ${cat.icon}"></i>
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
        `;
        grid.appendChild(card);
    });
}

// Add category
function addCategory() {
    showNotification('Category management coming soon', 'error');
}

// Load images tab
function loadImagesTab() {
    const imagesJson = localStorage.getItem(CONFIG.storageKeys.images);
    const images = imagesJson ? JSON.parse(imagesJson) : [];
    
    const grid = document.getElementById('adminImagesGrid');
    grid.innerHTML = '';
    
    if (images.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #666;">No images uploaded yet. Go to Image Zone to upload images.</p>';
        return;
    }
    
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.innerHTML = `
            <img src="${image.data}" alt="${image.name}">
            <div class="image-info">
                <div class="image-name">${image.name}</div>
            </div>
        `;
        grid.appendChild(item);
    });
}

// Load settings
function loadSettings() {
    const settings = CONFIG_HELPERS.getSettings();
    
    if (settings.sheetsId) {
        document.getElementById('sheetsId').value = settings.sheetsId;
        CONFIG.sheetsId = settings.sheetsId;
    }
    
    if (settings.apiKey) {
        document.getElementById('apiKey').value = settings.apiKey;
        CONFIG.apiKey = settings.apiKey;
    }
}

// Save settings
function saveSettings() {
    const sheetsId = document.getElementById('sheetsId').value;
    const apiKey = document.getElementById('apiKey').value;
    
    const settings = {
        sheetsId,
        apiKey
    };
    
    CONFIG_HELPERS.saveSettings(settings);
    
    // Update CONFIG
    CONFIG.sheetsId = sheetsId;
    CONFIG.apiKey = apiKey;
    
    showNotification('Settings saved successfully');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
