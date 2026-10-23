import { SwavyShot } from '../types';

/**
 * Editorial fashion lookbook mapping for raw photograph captures and attached hashes.
 * Ensures no cryptographic hashes (like bf43b75b, 6509dd09, f922eefa, etc.) ever appear as image labels.
 */
export const FITTING_FASHION_LOOKS: Record<string, { title: string; caption: string }> = {
  '6509dd09': {
    title: 'Crimson Floral Wrap Dress & Tied Shoulder Accents',
    caption: 'Vibrant crimson floral v-neck cocktail wrap dress with delicate tie-shoulder accents, styled with crystal-embellished stiletto sandals.'
  },
  'f922eefa': {
    title: 'Royal Black Embroidered Agbada & Coral Beads',
    caption: 'Intricately embroidered black and silver royal Agbada paired with multi-strand authentic coral beads and a patterned velvet fila cap.'
  },
  '39968ef2': {
    title: 'Earthy Floral Smocked Co-ord & Braided Crown',
    caption: 'Warm earth-toned floral print button-down shirt and skirt co-ord set captured in natural daylight afternoon shadows.'
  },
  'f50040d9': {
    title: 'Bubblegum Ribbed Cutout Top & Dainty Studs',
    caption: 'Form-fitting bubblegum pink ribbed long-sleeve knit featuring keyhole button cutouts and delicate silver stud earrings.'
  },
  'd9e96a12': {
    title: 'Terracotta Cord Lace & Purple Gele Trio',
    caption: 'Ceremonial trio in matching burnt-orange corded lace dresses, layered coral bead necklaces, and sculpted purple gele crowns.'
  },
  'df02e180': {
    title: 'Monochrome Open-Back Halter & Waterfall Fringe',
    caption: 'Dramatic black-and-white silhouette highlighting a textured backless halter top, braided ponytail, and cascading rhinestone earrings.'
  },
  '97056234': {
    title: 'Indigo-Striped Aso-Oke Agbada & Modern Shades',
    caption: 'Regal purple-and-white striped handwoven Aso-Oke agbada with matching fila cap, modern sunglasses, and dark bead necklace.'
  },
  'c148628f': {
    title: 'Handwoven Metallic Aso-Oke Sash Adjustment',
    caption: 'Candid styling moment adjusting a metallic-striped ceremonial Aso-Oke sash draped gracefully over a magenta silk buba.'
  },
  '67ee252d': {
    title: 'Magenta Silk Satin Buba & Striped Aso-Oke',
    caption: 'Rich magenta silk-satin top paired with a coordinating striped Aso-Oke sash, matching gele headpiece, and gold chevron necklace.'
  },
  '98c692b6': {
    title: 'Studio Ring-Light Portrait & Pleated Gele',
    caption: 'Studio editorial capture framing vibrant magenta silk attire, sculpted striped gele, and polished gold necklace inside a ring-light halo.'
  },
  'f5657b93': {
    title: 'Executive Mustard Shirt & Patterned Silk Tie',
    caption: 'Sharp menswear portrait featuring a tailored mustard-yellow dress shirt, navy cross-embroidered tie, and tailored charcoal slacks.'
  },
  // Legacy hash mappings as safety guardrail
  'bf43b75b': {
    title: 'Handwoven Metallic Aso-Oke Sash Adjustment',
    caption: 'Intricate metallic-thread handwoven Aso-Oke sash adjustment over rich draped ceremonial attire.'
  },
  'fc217119': {
    title: 'Studio Ring-Light Portrait & Pleated Gele',
    caption: 'Lustrous magenta silk attire complemented by an architectural pleated gele headpiece inside a ring-light halo.'
  },
  '59c7ce0e': {
    title: 'Royal Black Embroidered Agbada & Coral Beads',
    caption: 'Hand-embroidered royal agbada robe paired with authentic multi-strand coral beads and velvet fila cap.'
  }
};

/**
 * Detects if a text string is a raw hash, UUID, or unformatted filename (e.g., bf43b75b, 6509dd09, image.jpg)
 */
export function isRawHashOrFilename(str?: string): boolean {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  
  // Standard UUID format (8-4-4-4-12) or starting with 8-char hex
  if (/^[0-9a-f]{8}(-[0-9a-f]{4}){1,4}/i.test(s)) return true;
  // Raw 8 to 40 char hex token
  if (/^[0-9a-f]{8,40}$/i.test(s)) return true;
  // File extensions
  if (/\.(jpe?g|png|webp|avif|gif)$/i.test(s)) return true;
  // Series of hex tokens separated by spaces or hyphens (e.g. bf43b75b 5ed2 4dba)
  if (/^[0-9a-f]{4,8}[\s-_][0-9a-f]{4,8}/i.test(s)) return true;
  // WhatsApp or camera auto filenames
  if (/whatsapp_image/i.test(s)) return true;
  // Contains common hash patterns
  if (/(?:bf43b75b|fc217119|59c7ce0e|6509dd09|f922eefa|39968ef2|f50040d9|d9e96a12|df02e180|97056234|c148628f|67ee252d|98c692b6|f5657b93)/i.test(s)) return true;

  return false;
}

/**
 * Resolves an elegant, fitting fashion title and caption for a photograph.
 * Never allows raw hashes like bf43b75b or filenames to be displayed as labels.
 */
export function resolveFittingLook(
  rawIdentifier: string,
  currentTitle: string | undefined,
  currentCaption: string | undefined,
  serialNumber: string
): { title: string; caption: string } {
  const combined = `${rawIdentifier} ${currentTitle || ''}`.toLowerCase();

  // Match against known captures
  for (const [key, look] of Object.entries(FITTING_FASHION_LOOKS)) {
    if (combined.includes(key)) {
      return look;
    }
  }

  // If the title is missing or is a raw hash/filename
  if (!currentTitle || isRawHashOrFilename(currentTitle)) {
    return {
      title: `Curated Look ${serialNumber}`,
      caption: currentCaption && !isRawHashOrFilename(currentCaption)
        ? currentCaption
        : 'Editorial raw photographic capture by Swavy.'
    };
  }

  // Otherwise keep the curated title
  return {
    title: currentTitle,
    caption: currentCaption && !isRawHashOrFilename(currentCaption)
      ? currentCaption
      : 'Editorial raw photographic capture by Swavy.'
  };
}

/**
 * Sanitizes a SwavyShot completely so no hash or raw filename leaks into UI labels.
 */
export function sanitizeShot(shot: SwavyShot, index: number): SwavyShot {
  const serialNum = (index + 1).toString().padStart(2, '0');
  const resolved = resolveFittingLook(
    `${shot.id} ${shot.filename || ''} ${shot.image || ''}`,
    shot.title,
    shot.caption,
    serialNum
  );

  return {
    ...shot,
    serial: serialNum,
    title: resolved.title,
    caption: resolved.caption,
  };
}
