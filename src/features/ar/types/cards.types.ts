export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type CardSuit = 'hearts' | 'diamonds' | 'spades' | 'clubs';

export type CardId = `${CardValue}_${CardSuit}`;

export interface BoardCard {
  id: CardId;
  faceUp: boolean;
}
