import { Product, ShowcaseItem, StoreLocation } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'abeokuta',
    name: 'Abeokuta Experience Hub',
    tag: 'OGUN STATE / FUNAAB CAMPUS AXIS',
    address: 'Lalubu Street, Oke-Ilewo Tarmac, Abeokuta, Ogun State',
    landmark: 'Serving FUNAAB students, tech founders & creatives across Ogun State',
    region: 'Abeokuta, Ogun State',
    phone: '08113841519',
    whatsapp: '09063192326',
    hours: 'Mon – Sat: 9:00 AM – 7:30 PM',
    highlights: ['Walk-in Desk Testing', 'Instant Pickup', 'Campus Delivery to FUNAAB', 'Cable Customization']
  },
  {
    id: 'lagos',
    name: 'Ikeja Tech Flagship',
    tag: 'COMPUTER VILLAGE LAGOS',
    address: 'Otigba Street, Computer Village, Ikeja, Lagos State',
    landmark: 'Heart of West Africa’s premier electronics and gadget capital',
    region: 'Ikeja, Lagos State',
    phone: '08113841519',
    whatsapp: '09063192326',
    hours: 'Mon – Sat: 8:30 AM – 8:00 PM',
    highlights: ['Complete Setup Showroom', 'Same-Day Lagos Express Dispatch', 'Bulk Corporate Supply', 'Warranty Service']
  }
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'setup-walnut-studio',
    serial: '01',
    title: 'Solid Walnut Dual-Tier Desk Shelf System',
    category: 'Minimalist Setups',
    subtitle: 'Handcrafted American walnut with integrated anodized aluminum tray',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦68,000',
    specs: ['Solid Walnut Wood', '45kg Load Capacity', 'Anodized Aluminum Legs', 'Under-shelf Keyboard Dock']
  },
  {
    id: 'gear-mech-keyboard',
    serial: '02',
    title: 'Custom Low-Profile Wireless Mechanical Keyboard',
    category: 'Keyboards & Mice',
    subtitle: 'Hot-swappable PBT keycaps, gasket-mounted sound dampening & tri-mode connectivity',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦52,000',
    specs: ['Tri-mode (BT 5.3/2.4G/Type-C)', 'Linear Factory Lubed Switches', 'RGB Backlit Ambient', 'Aluminum Top Frame']
  },
  {
    id: 'setup-screenbar-light',
    serial: '03',
    title: 'Minimalist Asymmetric ScreenBar Halo LED Light',
    category: 'Minimalist Setups',
    subtitle: 'Zero screen glare, auto-dimming sensor, and wireless desktop rotary dial',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦38,500',
    specs: ['Zero Screen Glare Optics', 'Rotary Wireless Puck', '2700K - 6500K Stepless CCT', 'Ra97 High CRI']
  },
  {
    id: 'gear-magsafe-dock',
    serial: '04',
    title: '3-in-1 CNC Aluminum Fast MagSafe Charging Station',
    category: 'Charging & Docks',
    subtitle: 'Simultaneous 15W MagSafe for iPhone, Apple Watch Ultra, and AirPods Pro',
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦34,000',
    specs: ['15W True Qi2 Fast Charge', 'Solid Space Grey Aluminum', 'Weighted Anti-Slip Base', 'Hidden Cable Routing']
  },
  {
    id: 'setup-curved-workspace',
    serial: '05',
    title: 'The Clean Monolithic Workspace Architecture',
    category: 'Minimalist Setups',
    subtitle: 'Curved ultrawide display with floating heavy-duty gas spring monitor arm',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦85,000',
    specs: ['Heavy Gas Spring Arm', 'Hidden Conduit Track', 'VESA 75/100 Universal', 'Full 360° Articulation']
  },
  {
    id: 'gear-wool-deskmat',
    serial: '06',
    title: 'Oversized Merino Wool Felt & Vegan Leather Desk Mat',
    category: 'Tech Accessories',
    subtitle: '900 x 400mm water-resistant desk protector with anti-fray stitched border',
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦18,500',
    specs: ['900 x 400mm Surface', 'Premium Water-Repellent', 'Non-Slip Micro-Suede Back', 'Acoustic Sound Absorbing']
  },
  {
    id: 'gear-gan-charger',
    serial: '07',
    title: '140W GaN Pro Multi-Port PD3.1 Desktop Charger',
    category: 'Charging & Docks',
    subtitle: 'Fast charges MacBook Pro 16", iPad, and flagship smartphones at maximum speed',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦42,000',
    specs: ['PD 3.1 140W Single Port', '3x USB-C + 1x USB-A', 'Gallium Nitride Gen V', 'Active Temperature Shield']
  },
  {
    id: 'gear-ergonomic-mouse',
    serial: '08',
    title: 'Precision Master Ergonomic Silent Wireless Mouse',
    category: 'Keyboards & Mice',
    subtitle: '57-degree natural handshake posture with tactile MagSpeed electromagnetic scroll',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦45,000',
    specs: ['57° Ergonomic Handshake', 'MagSpeed Electromagnetic Wheel', '8000 DPI Darkfield Sensor', 'Silent Click Dampening']
  },
  {
    id: 'setup-studio-speakers',
    serial: '09',
    title: 'Acoustic Desktop Studio Monitors on Isolation Stands',
    category: 'Audio & Acoustics',
    subtitle: 'Tilted acoustic foam risers paired with high-fidelity studio reference sound',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦72,000',
    specs: ['16° Upward Tilt Angle', 'Silicone Vibration Decoupling', 'Bluetooth 5.2 AptX HD', 'Matte Carbon Finish']
  },
  {
    id: 'gear-cable-organizer',
    serial: '10',
    title: 'Under-Desk Steel Cable Raceway & Magnetic Organizers',
    category: 'Tech Accessories',
    subtitle: 'Eliminate wire clutter beneath your workspace with magnetic cable drops',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    priceTag: '₦22,500',
    specs: ['Powder-Coated Alloy Steel', 'Magnetic Cable Guides', 'No-Drill Clamp Mount', 'High Airflow Ventilation']
  }
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'prod-walnut-shelf',
    serial: '01',
    name: 'Solid Walnut Dual-Tier Desk Shelf System',
    category: 'setups',
    categoryLabel: 'MINIMALIST SETUPS',
    price: 68000,
    originalPrice: 78000,
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Handcrafted solid American walnut riser with anodized aluminum legs.',
    fullDesc: 'Elevate your monitors to ergonomic eye-level while unlocking clean storage below for keyboards, audio interfaces, and notebooks. Crafted from genuine kiln-dried walnut with matte chamfered edges.',
    features: ['Solid American Walnut', 'Heavy Load Aluminum Legs', 'Fits 2x 27" or 1x 49" Displays', 'Under-shelf storage'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)'],
    tag: 'BESTSELLER'
  },
  {
    id: 'prod-screenbar-light',
    serial: '02',
    name: 'Asymmetric ScreenBar Halo LED Monitor Light',
    category: 'setups',
    categoryLabel: 'MINIMALIST SETUPS',
    price: 38500,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Asymmetric optics with wireless rotary desktop control puck.',
    fullDesc: 'Illuminates your workspace without bouncing harsh glare onto your screen. Features automatic ambient lux compensation, stepless color temperature tuning, and a wireless battery-powered aluminum dial.',
    features: ['Zero Screen Reflection', 'Wireless Precision Dial', '2700K - 6500K CCT', 'USB-C Powered'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)'],
    tag: 'ESSENTIAL'
  },
  {
    id: 'prod-mech-keyboard',
    serial: '03',
    name: 'Custom Low-Profile Gasket Mechanical Keyboard',
    category: 'keyboards',
    categoryLabel: 'KEYBOARDS & MICE',
    price: 52000,
    originalPrice: 60000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Ultra-thin wireless mechanical keyboard with factory-lubed switches.',
    fullDesc: 'Engineered for coders, designers, and writers. Sleek aluminum top plate, hot-swappable switches, sound-dampening silicone gaskets, and seamless connection across Mac, Windows, and iPad.',
    features: ['Tri-mode (Bluetooth / 2.4GHz / USB-C)', 'Double-Shot PBT Keycaps', 'Hot-Swappable Sockets', 'Mac & Windows Layouts'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)'],
    tag: 'TOP RATED'
  },
  {
    id: 'prod-gas-arm',
    serial: '04',
    name: 'Heavy-Duty Gas Spring Dual Monitor Arm',
    category: 'setups',
    categoryLabel: 'MINIMALIST SETUPS',
    price: 64000,
    originalPrice: 75000,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Full-motion gas spring mount with internal cable conduits.',
    fullDesc: 'Reclaim 40% of your physical desktop surface. Smooth finger-touch height adjustments, 360-degree rotation for vertical coding displays, and heavy gauge C-clamp or grommet mounting.',
    features: ['Supports up to 34" Ultrawides', 'Built-in Cable Routing', 'Quick-Release VESA Plates', 'Sturdy Cold-Rolled Steel'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)'],
    tag: 'POPULAR'
  },
  {
    id: 'prod-magsafe-dock',
    serial: '05',
    name: '3-in-1 Aluminum Fast MagSafe Charging Station',
    category: 'charging',
    categoryLabel: 'CHARGING & DOCKS',
    price: 34000,
    originalPrice: 40000,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Weighted magnetic dock for Phone, Apple Watch, and Earbuds.',
    fullDesc: 'Clean single-cable solution for your nightstand or desktop. Precision CNC machined metal chassis with strong N52 neodymium magnets for snap-on portrait or landscape StandBy mode.',
    features: ['15W Fast Wireless Output', 'Weighted Anti-Slip Base', 'Apple StandBy Mode Ready', 'Overheat & Surge Protection'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)']
  },
  {
    id: 'prod-wool-mat',
    serial: '06',
    name: 'Merino Wool Felt & Vegan Leather Large Desk Mat',
    category: 'accessories',
    categoryLabel: 'TECH ACCESSORIES',
    price: 18500,
    originalPrice: 24000,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '900 x 400mm scratch-resistant, water-repellent desk pad.',
    fullDesc: 'Brings warm texture and tactile luxury to cold glass or wooden desks. Dampens mechanical keyboard reverberations and provides ultra-smooth tracking for optical mice.',
    features: ['Generous 900x400mm Surface', 'Anti-Fray Precision Stitching', 'Hydrophobic Splash Resistance', 'Non-Slip Base'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)']
  },
  {
    id: 'prod-gan-140w',
    serial: '07',
    name: '140W GaN Pro Multi-Port PD3.1 Rapid Charger',
    category: 'charging',
    categoryLabel: 'CHARGING & DOCKS',
    price: 42000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Gallium Nitride wall & desk fast charger with 4 output ports.',
    fullDesc: 'Charges hungry laptops like the MacBook Pro M3 Max to 50% in just 28 minutes. Intelligent power distribution across 3 USB-C ports and 1 USB-A port without overheating.',
    features: ['PD 3.1 140W Peak', 'GaN V High Efficiency', 'Simultaneous 4-Device Fast Charge', 'Universal 100V-240V Support'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)'],
    tag: 'STUDIO GRADE'
  },
  {
    id: 'prod-ergo-mouse',
    serial: '08',
    name: 'Precision Master Ergonomic Silent Wireless Mouse',
    category: 'keyboards',
    categoryLabel: 'KEYBOARDS & MICE',
    price: 45000,
    originalPrice: 52000,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    shortDesc: '57° ergonomic handshake posture with electromagnetic scroll.',
    fullDesc: 'Engineered to reduce wrist strain and forearm muscle tension during long working sprints. Tracks on glass surfaces, features whisper-quiet clicks, and lasts up to 70 days per USB-C charge.',
    features: ['57-Degree Ergonomic Angle', 'Hyper-Fast MagSpeed Wheel', 'Dual Bluetooth + 2.4G', 'USB-C Quick Recharge'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)']
  },
  {
    id: 'prod-cable-system',
    serial: '09',
    name: 'Under-Desk Heavy Steel Cable Raceway System',
    category: 'accessories',
    categoryLabel: 'TECH ACCESSORIES',
    price: 22500,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Zero-drill clamp-on steel tray with magnetic cable clips.',
    fullDesc: 'Hide power bricks, surge protectors, and messy adapter cables out of sight. Heavy powder-coated steel clamps securely to any desktop without drilling holes.',
    features: ['No-Drill C-Clamp Mounting', 'Heavy Gauge Alloy Steel', 'Ventilated Cooling Slits', 'Includes 6x Cable Ties'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)']
  },
  {
    id: 'prod-laptop-stand',
    serial: '10',
    name: 'Aviation Aluminum Ergonomic Laptop Riser Stand',
    category: 'accessories',
    categoryLabel: 'TECH ACCESSORIES',
    price: 26000,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
    shortDesc: 'Foldable dual-axis aluminum riser with silicone protective pads.',
    fullDesc: 'Matches Space Grey and Silver MacBooks and workstations. Lifts your screen up to 6 inches to align directly with external monitors and promote upright posture.',
    features: ['Solid CNC Aluminum', 'Dual Damped Hinges', 'Passive Heat Heat-Sink Vents', 'Folds Flat for Bag'],
    inStock: true,
    hubAvailability: ['Abeokuta (FUNAAB)', 'Lagos (Computer Village)']
  }
];
