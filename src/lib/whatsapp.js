export const WA_NUMBER = '201063764483';

export function waLink(message = '') {
  const encoded = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${WA_NUMBER}${encoded}`;
}