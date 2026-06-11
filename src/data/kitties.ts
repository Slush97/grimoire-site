/*
 * Shared roster for the cursor-chasing neko. Imported by both Neko.astro
 * (the global cat) and the Geocities "CHOOSE YOUR KITTY" selector so the
 * two can never disagree about which skins exist.
 *
 * Sprite sheets are classic 256x128 oneko sheets (8x4 grid of 32px
 * frames), self-hosted under public/neko/ as <id>.png. No CDN. Skins are
 * the community oneko set (trebor048/OnekoSkins), same provenance as the
 * original lucy.png.
 */

export const KITTY_KEY = 'grimoire-kitty';
export const DEFAULT_KITTY = 'lucy';

export const KITTIES = [
  { id: 'lucy', label: 'LUCY' },
  { id: 'ace', label: 'ACE' },
  { id: 'black', label: 'MIDNITE' },
  { id: 'blue', label: 'BLU' },
  { id: 'blue-tabby', label: 'BLU TABBY' },
  { id: 'boobookitty', label: 'BOOBOO' },
  { id: 'calico', label: 'CALICO' },
  { id: 'calico-tabby', label: 'CALI TABBY' },
  { id: 'caz', label: 'CAZ' },
  { id: 'colourful', label: 'COLOURZ' },
  { id: 'fancy', label: 'FANCY' },
  { id: 'ghost', label: 'GHOST' },
  { id: 'gray', label: 'GRAY' },
  { id: 'green-ghost', label: 'GLOWY' },
  { id: 'holiday', label: 'HOLIDAY' },
  { id: 'jess', label: 'JESS' },
  { id: 'kina', label: 'KINA' },
  { id: 'lucky', label: 'LUCKY' },
  { id: 'marmalade', label: 'MARMALADE' },
  { id: 'mike', label: 'MIKE' },
  { id: 'moka', label: 'MOKA' },
  { id: 'multi', label: 'MULTI' },
  { id: 'nekocool', label: 'KEWL KAT' },
  { id: 'neon', label: 'NEON' },
  { id: 'orange', label: 'PUNKIN' },
  { id: 'peach', label: 'PEACH' },
  { id: 'pink', label: 'PINKY' },
  { id: 'pink-nose-neko', label: 'PINKNOSE' },
  { id: 'rainbow', label: 'RAINBOW' },
  { id: 'rose', label: 'ROSE' },
  { id: 'royal', label: 'ROYAL' },
  { id: 'silver', label: 'SILVER' },
  { id: 'silversky', label: 'SILVRSKY' },
  { id: 'socks', label: 'SOCKS' },
  { id: 'spirit', label: 'SPIRIT' },
  { id: 'spooky', label: 'SPOOKY' },
  { id: 'tabby', label: 'TABBY' },
  { id: 'valentine', label: 'VALENTINE' },
  { id: 'white', label: 'WHITEY' },
] as const;

export type KittyId = (typeof KITTIES)[number]['id'];

export function kittySprite(id: KittyId): string {
  return `/neko/${id}.png`;
}

export function coerceKitty(value: string | null | undefined): KittyId {
  return KITTIES.some((k) => k.id === value) ? (value as KittyId) : DEFAULT_KITTY;
}

export function kittyLabel(id: KittyId): string {
  return KITTIES.find((k) => k.id === id)?.label ?? DEFAULT_KITTY;
}

export function kittyIndex(id: KittyId): number {
  return Math.max(0, KITTIES.findIndex((k) => k.id === id));
}
