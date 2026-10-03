export type GadgetCategory = 'iphones' | 'samsung' | 'laptops' | 'gaming' | 'gadgets';

export interface Product {
  id: string;
  serial: string;
  name: string;
  category: GadgetCategory;
  categoryLabel: string;
  condition: 'Direct UK' | 'Brand New' | 'USA Used' | 'Refurbished Grade A';
  specsSummary: string;
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
  conditionBadge: string;
  subtitle: string;
  image: string;
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
