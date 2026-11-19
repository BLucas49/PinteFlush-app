import { MAX_CARD_DISTANCE_M, MIN_CARD_FLATNESS } from '../constants/AR';
import type { Position } from '../types/position.types';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Rejette les positions absurdes (valeurs infinies ou carte à des kilomètres)
export const isValidCardPosition = (position: Position) =>
  position.every(Number.isFinite) && Math.hypot(...position) <= MAX_CARD_DISTANCE_M;

// Cap de la carte en degrés, ou null si elle n'est pas posée à plat
export const getCardYaw = (rotation: number[]): number | null => {
  if (rotation.length < 3 || !rotation.every(Number.isFinite)) {
    return null;
  }
  // Viro tourne dans l'ordre Z puis Y puis X
  const [x, y, z] = rotation.map((angle) => angle * DEG_TO_RAD);
  // Part verticale de la normale de la carte : 1 si elle est parfaitement à plat
  const normalUp = Math.sin(z) * Math.sin(y) * Math.sin(x) + Math.cos(z) * Math.cos(x);
  if (normalUp < MIN_CARD_FLATNESS) {
    return null;
  }
  // Direction du bord de la carte, projetée à l'horizontale
  const axisX = Math.cos(z) * Math.cos(y);
  const axisZ = -Math.sin(y);
  return Math.atan2(-axisZ, axisX) * RAD_TO_DEG;
};
