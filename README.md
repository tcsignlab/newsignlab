# Signs365 Clone - Product Catalog System

A full-featured product catalog system cloned from Signs365.com with Google Sheets integration, Image Zone, and password-protected admin panel.

## Features

### Public Facing
- **Product Catalog** - Browse products by category (Banner, Rigid, Adhesive, Handheld, Magnet, Apparel, Misc)
- **Product Configurator** - Configure products with:
  - Custom dimensions
  - Material selection
  - Print sides (single/double)
  - Finishing options (welding, rope, grommets, pole pockets, wind slits)
  - Real-time pricing calculator
- **Image Zone** - Upload and manage product images
  - Folder organization
  - Search and sort
  - Image details (dimensions, DPI, file size)
- **Shopping Cart** - Add configured products to cart (stored in localStorage)

### Admin Panel
- **Password Protected** - Secure access (default password: `admin123`)
- **Product Management** - Full CRUD operations for products
- **Google Sheets Sync** - Import products from Google Sheets
- **Category Management** - View and manage product categories
- **Settings** - Configure Google Sheets integration

## Setup Instructions

### 1. Basic Setup (No Google Sheets)

The system works out of the box with sample data stored in localStorage.

1. Upload all files to your GitHub repository
2. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save
3. Access your site at: `https://[username].github.io/[repository-name]`

### 2. Google Sheets Integration (Optional)

To use Google Sheets as your database:

#### Step 1: Create Google Sheet

Create a new Google Sheet with the following sheets and structure:

**Sheet: Products**
Columns: `id`, `name`, `category`, `description`, `image`, `status`, `materials`, `options`, `pricing`

Example data:
```
id              | name          | category | description                    | image        | status | materials                                           | options                                              | pricing
hd-banner       | HD BANNER     | banner   | Premium Vinyl Scrim Banner     | [image_url]  | active | [{"name":"13oz","price":1.25},{"name":"15oz",...}] | {"printSides":["single","double"],"welding":...}     | {"singleSided":{"13oz":1.25,...},...}
```

**Sheet: Categories**
Columns: `id`, `name`, `description`, `icon`, `sort_order`

**Sheet: Materials**
Columns: `id`, `product_id`, `name`, `price_multiplier`, `description`

**Sheet: Finishing**
Columns: `id`, `name`, `type`, `options`, `prices`

#### Step 2: Make Sheet Public

1. Click "Share" button
2. Change to "Anyone with the link can view"
3. Copy the Sheet ID from the URL (between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

#### Step 3: Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google Sheets API"
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key

#### Step 4: Configure in Admin Panel

1. Go to your site's admin panel: `[your-site]/admin.html`
2. Login with password: `admin123` (change this in `config.js`)
3. Go to Settings tab
4. Enter your Sheet ID and API Key
5. Click "Save Settings"
6. Go to Products tab and click "Sync with Google Sheets"

## File Structure

```
/
├── index.html              # Main catalog page
├── product.html            # Product configurator
├── image-zone.html         # Image management
├── admin.html              # Admin panel
├── styles.css              # All styles
├── app.js                  # Main application logic
├── configurator.js         # Product configuration
├── image-zone.js           # Image management
├── admin.js                # Admin panel logic
├── config.js               # Configuration & helpers
└── README.md              # This file
```

## Configuration

Edit `config.js` to customize:

```javascript
const CONFIG = {
    sheetsId: '',              // Your Google Sheets ID
    apiKey: '',                // Your Google API Key
    adminPassword: 'admin123', // Change this!
    defaultCategory: 'banner',
    productionTime: '24 Hours'
};
```

## Admin Panel Usage

### Access Admin
1. Click menu → Admin Panel (after logging in once)
2. Or go directly to `/admin.html`
3. Enter password (default: `admin123`)

### Add Product
1. Click "Add New Product"
2. Fill in details:
   - Name, category, description
   - Upload image or enter URL
   - Materials (JSON format):
     ```json
     [
       {"name": "13oz", "price": 1.25, "description": "Standard"},
       {"name": "15oz", "price": 1.75, "description": "Medium"}
     ]
     ```
   - Options (JSON format):
     ```json
     {
       "printSides": ["single", "double"],
       "welding": ["yes", "no"],
       "grommets": ["yes", "no"]
     }
     ```
3. Click "Save Product"

### Edit Product
1. Click edit icon on product row
2. Modify fields
3. Click "Save Product"

### Delete Product
1. Click delete icon on product row
2. Confirm deletion

### Sync from Google Sheets
1. Configure Sheet ID and API Key in Settings
2. Go to Products tab
3. Click "Sync with Google Sheets"
4. Products will be imported and overwrite local data

## Image Zone Usage

### Upload Images
1. Go to Image Zone
2. Click "Upload Image"
3. Select one or multiple images
4. Images are stored in browser localStorage

### Organize Images
- **Create Folder**: Create new folders for organization
- **Rename Folder**: Rename existing folders
- **Delete Folder**: Delete folder and all images in it
- **Search**: Search images by filename
- **Sort**: Sort by date, name, or size

### Use Images in Products
1. Upload image to Image Zone
2. Right-click image → Copy image address
3. Use URL in admin panel when adding/editing products

## Data Storage

### Without Google Sheets
- All data stored in browser's localStorage
- Products: `signs365_products`
- Cart: `signs365_cart`
- Images: `signs365_images`
- Settings: `signs365_settings`

### With Google Sheets
- Products synced from Google Sheets
- Local changes not synced back to Sheets
- Click "Sync" to refresh from Sheets

## Customization

### Change Colors
Edit `styles.css`:
- Primary color: `#4CAF50`
- Secondary color: `#667eea`
- Accent color: `#ffd700`

### Add Product Categories
1. Edit `config.js` → Add to `SAMPLE_PRODUCTS`
2. Edit `index.html` → Add nav item
3. Edit `styles.css` → Add icon styling

### Change Admin Password
Edit `config.js`:
```javascript
adminPassword: 'your-secure-password'
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Responsive design

## Storage Limits

- localStorage: ~5-10MB per domain
- Images: Store as base64 (larger file = more storage)
- Recommended: Use image URLs from external hosting for production

## Security Notes

1. **Change admin password** in `config.js`
2. Admin auth stored in localStorage (clear to logout)
3. Google Sheets API key is public-safe (read-only)
4. Don't store sensitive data in public sheets

## Troubleshooting

### Products not loading
1. Check browser console for errors
2. Verify Google Sheets is public
3. Check API key is correct
4. Clear localStorage and refresh

### Images not displaying
1. Check image URLs are accessible
2. Try re-uploading images
3. Check localStorage isn't full

### Admin panel not accessible
1. Clear localStorage
2. Enter password again
3. Check `config.js` for correct password

## Future Enhancements

- Shopping cart functionality
- Payment integration
- Order history
- Email notifications
- Advanced image editor
- Bulk product import
- Customer accounts

## Support

For issues or questions, create an issue in the GitHub repository.

## License

Free to use and modify for your projects.
