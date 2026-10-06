import { SwavyShot } from '../types';

/**
 * Editorial fashion lookbook mapping for raw photograph captures and attached hashes.
 * Ensures no cryptographic hashes (like bf43b75b) ever appear as image labels.
 */
export const FITTING_FASHION_LOOKS: Record<string, { title: string; caption: string }> = {
  'bf43b75b': {
    title: 'Metallic Handwoven Aso-Oke Sash Adjustment',
    caption: 'Intricate metallic-thread handwoven Aso-Oke sash adjustment over rich draped ceremonial attire.'
  },
  'fc217119': {
    title: 'The Magenta Silk Wrap & Pleated Gele',
    caption: 'Lustrous magenta silk-satin wrap dress complemented by an architectural pleated gele headpiece.'
  },
  '59c7ce0e': {
    title: 'Embroidered Royal Agbada & Coral Beads',
    caption: 'Hand-embroidered emerald agbada robe paired with authentic multi-strand royal coral beads and velvet fila cap.'
  },
  '6c03cb70': {
    title: 'Ditsy Floral Smocked Sun Dress',
    caption: 'Natural ambient daylight portrait captured outdoors in a vibrant summer floral print silhouette.'
  },
  'e598de67': {
    title: 'Minimalist Studio Scoop & Dewy Glow',
    caption: 'Clean, radiant close-up portrait with minimal styling and sculptural softbox studio illumination.'
  },
  'fa743d42': {
    title: 'Twin Cord Lace Buba & Sculpted Gele Crowns',
    caption: 'Festive celebratory elegance featuring intricately patterned white cord lace buba and towering gele headties.'
  },
  '984f6d95': {
    title: 'Braided Open-Back Halter Silhouette',
    caption: 'Monochrome editorial portrait highlighting architectural braided hair lines and backless form.'
  },
  'bcbf78b1': {
    title: 'High-Shine Metallic Satin & Gele Headtie',
    caption: 'Striking metallic satin blouse accented with luminous ring-light catchlights and a matching gele.'
  },
  'e6aab908': {
    title: 'Handwoven Indigo Aso-Oke & Modern Shades',
    caption: 'Regal indigo-striped Aso-Oke traditional agbada juxtaposed with contemporary dark sunglasses.'
  },
  '1c7d616a': {
    title: 'Tailored Three-Piece Executive Suit',
    caption: 'Refined menswear portrait of a gentleman in a bespoke tailored suit seated in an executive leather armchair.'
  },
  'ce6abacf': {
    title: 'High-Key Magenta Silk Satin & Pleated Gele',
    caption: 'Bright editorial high-key framing showcasing vibrant magenta silk-satin with dramatic pleated gele headpiece.'
  }
};

/**
 * Detects if a text string is a raw hash, UUID, or unformatted filename (e.g., bf43b75b, 59c7ce0e-..., image.jpg)
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
  // Contains common hash patterns
  if (/(?:bf43b75b|fc217119|59c7ce0e|6c03cb70|e598de67|fa743d42|984f6d95|bcbf78b1|e6aab908|1c7d616a|ce6abacf)/i.test(s)) return true;

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
      title: `Fashion Look ${serialNumber}`,
      caption: currentCaption && !isRawHashOrFilename(currentCaption)
        ? currentCaption
        : 'Editorial raw photographic capture by Swavy.'
    };
  }

  // Otherwise keep the user's custom or sanitized title
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
    `${shot.id} ${shot.filename || ''}`,
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
