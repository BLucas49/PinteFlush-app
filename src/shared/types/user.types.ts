export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  elo: number;
  bio: string | null;
}
