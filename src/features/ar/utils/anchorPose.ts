import { MAX_CARD_DISTANCE_M } from '../constants/AR';
import type { Position } from '../types/position.types';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// En dessous, le bord de la carte est presque vertical et son cap n'a plus de sens
const MIN_HORIZONTAL_LENGTH = 0.1;

// Rejette les positions absurdes (valeurs infinies ou carte à des kilomètres)
export const isValidCardPosition = (position: Position) =>
  position.every(Number.isFinite) && Math.hypot(...position) <= MAX_CARD_DISTANCE_M;

// Cap de la carte en degrés, lu sur la direction de son bord et non sur un seul angle d'Euler
export const getCardYaw = (rotation: number[]): number | null => {
  if (rotation.length < 3 || !rotation.every(Number.isFinite)) {
    return null;
  }
  const [, y, z] = rotation.map((angle) => angle * DEG_TO_RAD);
  // Viro tourne dans l'ordre Z puis Y puis X : on calcule où pointe l'axe X de la carte
  const axisX = Math.cos(z) * Math.cos(y);
  const axisZ = -Math.sin(y);
  if (Math.hypot(axisX, axisZ) < MIN_HORIZONTAL_LENGTH) {
    return null;
  }
  return Math.atan2(-axisZ, axisX) * RAD_TO_DEG;
};
