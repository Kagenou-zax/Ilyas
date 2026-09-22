export interface Product {
  id: string;
  serial: string;
  name: string;
  category: 'setups' | 'accessories' | 'keyboards' | 'charging' | 'audio';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  inStock: boolean;
  hubAvailability: ('Abeokuta (FUNAAB)' | 'Lagos (Computer Village)')[];
  tag?: string;
}

export interface ShowcaseItem {
  id: string;
  serial: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  priceTag?: string;
  specs: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  tag: string;
  address: string;
  landmark: string;
  region: string;
  phone: string;
  whatsapp: string;
  hours: string;
  highlights: string[];
}
