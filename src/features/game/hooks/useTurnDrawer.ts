import { useState } from 'react';

export const useTurnDrawer = (isMyTurn: boolean) => {
  const [open, setOpen] = useState(isMyTurn);
  const [wasMyTurn, setWasMyTurn] = useState(isMyTurn);

  // On ouvre le panel quand c'est le tour du jour
  if (isMyTurn !== wasMyTurn) {
    setWasMyTurn(isMyTurn);
    if (isMyTurn) {
      setOpen(true);
    }
  }

  return [open, setOpen] as const;
};
