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
    adminPassword: 'admin123',
    
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
    // BANNER PRODUCTS
    {
        id: 'hd-banner-vinyl',
        name: 'HD BANNER (VINYL)',
        category: 'banner',
        description: 'Premium Vinyl Scrim Banner - Most Popular',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '13oz', price: 1.25, description: 'Standard weight vinyl' },
            { name: '15oz', price: 1.75, description: 'Medium weight vinyl' },
            { name: '18oz', price: 2.25, description: 'Heavy duty vinyl' }
        ],
        options: {
            printSides: ['single', 'double'],
            welding: ['yes', 'no'],
            rope: ['none', 'included'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both'],
            windSlits: ['no', 'yes']
        },
        pricing: {
            singleSided: { '13oz': 1.25, '15oz': 1.75, '18oz': 2.25 },
            doubleSided: 4.25
        }
    },
    {
        id: 'hdpe-banner',
        name: 'HDPE',
        category: 'banner',
        description: 'Water & Tear Resistant Paper Banner',
        image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Standard HDPE', price: 2.50, description: 'Durable synthetic paper' }
        ],
        options: {
            printSides: ['single', 'double'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both']
        },
        pricing: {
            singleSided: { 'Standard HDPE': 2.50 },
            doubleSided: 4.50
        }
    },
    {
        id: 'canvas-banner',
        name: 'CANVAS',
        category: 'banner',
        description: 'Poly-Cotton Blend, Stretch & Frame Ready',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Premium Canvas', price: 3.50, description: 'Museum quality poly-cotton' }
        ],
        options: {
            printSides: ['single'],
            grommets: ['yes', 'no']
        },
        pricing: {
            singleSided: { 'Premium Canvas': 3.50 }
        }
    },
    {
        id: 'mesh-banner',
        name: 'MESH',
        category: 'banner',
        description: 'Polyester with Air-Flow Perforation - Wind Resistant',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '9oz Mesh', price: 2.75, description: 'Wind resistant with micro perforations' }
        ],
        options: {
            printSides: ['single'],
            grommets: ['yes', 'no'],
            polePockets: ['none', 'top', 'bottom', 'both']
        },
        pricing: {
            singleSided: { '9oz Mesh': 2.75 }
        }
    },
    {
        id: 'poster-banner',
        name: 'POSTER',
        category: 'banner',
        description: 'Bright White Paper, Short-Term Indoor Use',
        image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Paper Poster', price: 0.95, description: 'Economy indoor poster' }
        ],
        options: {
            printSides: ['single']
        },
        pricing: {
            singleSided: { 'Paper Poster': 0.95 }
        }
    },
    {
        id: 'no-curl-banner',
        name: 'NO CURL',
        category: 'banner',
        description: 'No Edge Curl Material, Lays Flat & Stays Flat',
        image: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'No Curl', price: 3.25, description: 'Anti-curl synthetic material' }
        ],
        options: {
            printSides: ['single', 'double'],
            grommets: ['yes', 'no']
        },
        pricing: {
            singleSided: { 'No Curl': 3.25 },
            doubleSided: 5.50
        }
    },
    {
        id: 'econostand-banner',
        name: 'ECONOSTAND',
        category: 'banner',
        description: 'Economical Banner Stand Solution with Carrying Case',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Standard', price: 4.00, description: 'Includes retractable stand' }
        ],
        options: {
            printSides: ['single']
        },
        pricing: {
            singleSided: { 'Standard': 4.00 }
        }
    },
    
    // RIGID PRODUCTS
    {
        id: 'coroplast',
        name: 'COROPLAST',
        category: 'rigid',
        description: 'High Definition Yard Signs - Most Popular Rigid',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '4mm', price: 3.00, description: 'Standard corrugated plastic' },
            { name: '10mm', price: 4.50, description: 'Extra thick corrugated plastic' }
        ],
        options: {
            printSides: ['single', 'double'],
            stakes: ['none', 'h-stakes', 'wire-stakes']
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
        image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '3/16" Clear', price: 8.50, description: 'Premium transparent acrylic' },
            { name: '3/16" White', price: 8.50, description: 'White backed acrylic' },
            { name: '1/8" Clear', price: 7.00, description: 'Thinner clear acrylic' }
        ],
        options: {
            printSides: ['single'],
            mounting: ['none', 'standoffs', 'wall-mount', 'easel']
        },
        pricing: {
            singleSided: { '3/16" Clear': 8.50, '3/16" White': 8.50, '1/8" Clear': 7.00 }
        }
    },
    {
        id: 'foamcore',
        name: 'FOAMCORE',
        category: 'rigid',
        description: 'Foam Board, Sturdy & Durable for Indoor Use',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '3/16"', price: 4.00, description: 'Lightweight foam board' },
            { name: '1/2"', price: 5.50, description: 'Thick foam board' }
        ],
        options: {
            printSides: ['single', 'double'],
            mounting: ['none', 'easel']
        },
        pricing: {
            singleSided: { '3/16"': 4.00, '1/2"': 5.50 },
            doubleSided: { '3/16"': 6.50, '1/2"': 9.00 }
        }
    },
    {
        id: 'pvc-board',
        name: 'PVC',
        category: 'rigid',
        description: 'Great For Displays, Indoor or Outdoor',
        image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '3mm', price: 5.50, description: 'Standard PVC thickness' },
            { name: '6mm', price: 7.50, description: 'Heavy duty PVC' }
        ],
        options: {
            printSides: ['single', 'double'],
            mounting: ['none', 'wall-mount', 'standoffs']
        },
        pricing: {
            singleSided: { '3mm': 5.50, '6mm': 7.50 },
            doubleSided: { '3mm': 9.00, '6mm': 12.00 }
        }
    },
    {
        id: 'polystyrene',
        name: 'POLYSTYRENE',
        category: 'rigid',
        description: 'Sign Inserts, Indoor or Outdoors',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Standard', price: 3.50, description: 'Durable plastic sheet' }
        ],
        options: {
            printSides: ['single', 'double']
        },
        pricing: {
            singleSided: { 'Standard': 3.50 },
            doubleSided: { 'Standard': 6.00 }
        }
    },
    {
        id: 'aluminum-composite',
        name: 'ALUMINUM',
        category: 'rigid',
        description: 'Heavy Duty Signage, Post or Frame',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '3mm ACM', price: 9.50, description: 'Aluminum composite material' },
            { name: '.040" Aluminum', price: 11.00, description: 'Solid aluminum sheet' }
        ],
        options: {
            printSides: ['single', 'double'],
            corners: ['square', 'rounded'],
            mounting: ['none', 'wall-mount', 'post-mount']
        },
        pricing: {
            singleSided: { '3mm ACM': 9.50, '.040" Aluminum': 11.00 },
            doubleSided: { '3mm ACM': 15.00, '.040" Aluminum': 18.00 }
        }
    },
    {
        id: 'backlit',
        name: 'BACKLIT',
        category: 'rigid',
        description: 'Polycarbonate, Refracts Back Lighting',
        image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Backlit Film', price: 12.00, description: 'Translucent backlit material' }
        ],
        options: {
            printSides: ['single']
        },
        pricing: {
            singleSided: { 'Backlit Film': 12.00 }
        }
    },
    {
        id: 'jbond',
        name: 'JBOND',
        category: 'rigid',
        description: 'Smooth Aluminum Faces with a Polyethylene Core',
        image: 'https://images.unsplash.com/photo-1568587095211-2f49c94ad0fd?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Standard', price: 10.50, description: 'Premium aluminum composite' }
        ],
        options: {
            printSides: ['single', 'double'],
            mounting: ['none', 'wall-mount']
        },
        pricing: {
            singleSided: { 'Standard': 10.50 },
            doubleSided: { 'Standard': 17.00 }
        }
    },
    
    // ADHESIVE PRODUCTS
    {
        id: 'adhesive-vinyl',
        name: 'ADHESIVE VINYL',
        category: 'adhesive',
        description: 'Premium Vinyl Stickers - Removable or Permanent',
        image: 'https://images.unsplash.com/photo-1611329532992-fd977e522f7f?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Removable', price: 2.75, description: 'Easy removal, no residue' },
            { name: 'Permanent', price: 2.75, description: 'Strong permanent adhesive' },
            { name: 'Clear', price: 3.25, description: 'Transparent vinyl' }
        ],
        options: {
            printSides: ['single'],
            laminate: ['none', 'gloss', 'matte'],
            contourCut: ['no', 'yes']
        },
        pricing: {
            singleSided: { 'Removable': 2.75, 'Permanent': 2.75, 'Clear': 3.25 }
        }
    },
    {
        id: 'window-cling',
        name: 'WINDOW CLING',
        category: 'adhesive',
        description: 'Static Cling Material - No Adhesive Required',
        image: 'https://images.unsplash.com/photo-1593073862407-a3ce22748763?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'White Static Cling', price: 3.50, description: 'Opaque static cling' },
            { name: 'Clear Static Cling', price: 3.75, description: 'See-through cling' }
        ],
        options: {
            printSides: ['single', 'double']
        },
        pricing: {
            singleSided: { 'White Static Cling': 3.50, 'Clear Static Cling': 3.75 },
            doubleSided: { 'White Static Cling': 6.00, 'Clear Static Cling': 6.50 }
        }
    },
    {
        id: 'floor-graphics',
        name: 'FLOOR GRAPHICS',
        category: 'adhesive',
        description: 'Non-Slip Floor Decals with Protective Laminate',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Anti-Slip', price: 5.50, description: 'Textured non-slip surface' }
        ],
        options: {
            printSides: ['single'],
            laminate: ['yes']
        },
        pricing: {
            singleSided: { 'Anti-Slip': 5.50 }
        }
    },
    {
        id: 'wall-graphic',
        name: 'WALL GRAPHIC',
        category: 'adhesive',
        description: 'Removable Wall Decals for Interior Decoration',
        image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Fabric', price: 4.50, description: 'Repositionable fabric' },
            { name: 'Vinyl', price: 3.75, description: 'Smooth vinyl' }
        ],
        options: {
            printSides: ['single']
        },
        pricing: {
            singleSided: { 'Fabric': 4.50, 'Vinyl': 3.75 }
        }
    },
    {
        id: 'perforated-vinyl',
        name: 'PERFORATED VINYL',
        category: 'adhesive',
        description: 'One-Way Vision Window Graphics - 60/40 Perforation',
        image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '60/40 Perf', price: 4.25, description: 'See-through from inside' }
        ],
        options: {
            printSides: ['single'],
            laminate: ['none', 'gloss', 'matte']
        },
        pricing: {
            singleSided: { '60/40 Perf': 4.25 }
        }
    },
    
    // HANDHELD PRODUCTS
    {
        id: 'handheld-signs',
        name: 'HANDHELD SIGNS',
        category: 'handheld',
        description: 'Foam Board Signs with Wooden Handles',
        image: 'https://images.unsplash.com/photo-1620147461831-a97b99ade1d3?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '3/16" Foamcore', price: 5.00, description: 'Includes wooden handle' }
        ],
        options: {
            printSides: ['single', 'double'],
            shape: ['rectangle', 'circle', 'custom']
        },
        pricing: {
            singleSided: { '3/16" Foamcore': 5.00 },
            doubleSided: { '3/16" Foamcore': 7.50 }
        }
    },
    
    // MAGNET PRODUCTS
    {
        id: 'vehicle-magnets',
        name: 'VEHICLE MAGNETS',
        category: 'magnet',
        description: 'Car Door Magnets - 30 mil Magnetic Material',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '30 mil Magnet', price: 6.50, description: 'Heavy duty vehicle magnet' }
        ],
        options: {
            printSides: ['single'],
            corners: ['square', 'rounded'],
            size: ['12x18', '12x24', '18x24', '24x24']
        },
        pricing: {
            singleSided: { '30 mil Magnet': 6.50 }
        }
    },
    {
        id: 'fridge-magnets',
        name: 'FRIDGE MAGNETS',
        category: 'magnet',
        description: 'Business Card Magnets - 20 mil Material',
        image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '20 mil Magnet', price: 4.00, description: 'Standard fridge magnet' }
        ],
        options: {
            printSides: ['single'],
            corners: ['square', 'rounded']
        },
        pricing: {
            singleSided: { '20 mil Magnet': 4.00 }
        }
    },
    
    // APPAREL PRODUCTS
    {
        id: 'custom-tshirts',
        name: 'CUSTOM T-SHIRTS',
        category: 'apparel',
        description: 'Direct-to-Garment Printed Apparel',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Cotton', price: 12.00, description: '100% cotton t-shirt' },
            { name: 'Blend', price: 10.00, description: '50/50 cotton-poly blend' }
        ],
        options: {
            printSides: ['front', 'back', 'both'],
            size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
            color: ['white', 'black', 'gray', 'navy', 'red']
        },
        pricing: {
            singleSided: { 'Cotton': 12.00, 'Blend': 10.00 }
        }
    },
    
    // MISC PRODUCTS
    {
        id: 'table-covers',
        name: 'TABLE COVERS',
        category: 'misc',
        description: 'Custom Printed Tablecloths for Trade Shows',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: '6ft Cover', price: 45.00, description: 'Fits 6ft table' },
            { name: '8ft Cover', price: 55.00, description: 'Fits 8ft table' }
        ],
        options: {
            printSides: ['front', 'full-wrap'],
            fitted: ['no', 'yes']
        },
        pricing: {
            singleSided: { '6ft Cover': 45.00, '8ft Cover': 55.00 }
        }
    },
    {
        id: 'feather-flags',
        name: 'FEATHER FLAGS',
        category: 'misc',
        description: 'Outdoor Advertising Flags with Ground Spike',
        image: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Small (8ft)', price: 65.00, description: 'Includes pole and base' },
            { name: 'Medium (11ft)', price: 85.00, description: 'Includes pole and base' },
            { name: 'Large (13ft)', price: 105.00, description: 'Includes pole and base' }
        ],
        options: {
            printSides: ['single', 'double'],
            base: ['ground-spike', 'cross-base', 'water-base']
        },
        pricing: {
            singleSided: { 'Small (8ft)': 65.00, 'Medium (11ft)': 85.00, 'Large (13ft)': 105.00 }
        }
    },
    {
        id: 'aframe-signs',
        name: 'A-FRAME SIGNS',
        category: 'misc',
        description: 'Sidewalk Signs with Coroplast Inserts',
        image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
        status: 'active',
        materials: [
            { name: 'Standard Frame', price: 75.00, description: 'Metal frame with 2 inserts' }
        ],
        options: {
            printSides: ['double'],
            frameColor: ['black', 'white', 'silver']
        },
        pricing: {
            doubleSided: { 'Standard Frame': 75.00 }
        }
    }
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
