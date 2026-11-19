// Espace insécable comme séparateur de milliers : 1975 donne « 1 975 » sans retour à la ligne
export function formatChips(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// « 1 jeton », « 2 200 jetons » (pluriel à partir de 2)
export function formatChipsLabel(amount: number): string {
  return `${formatChips(amount)} jeton${amount > 1 ? 's' : ''}`;
}
