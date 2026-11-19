// Initiales pour Avatar.Text de react-native-paper : première lettre du prénom et du nom
export function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName?.trim()[0] ?? '';
  const lastInitial = lastName?.trim()[0] ?? '';
  const initials = (firstInitial + lastInitial).toUpperCase();

  return initials || '?';
}
