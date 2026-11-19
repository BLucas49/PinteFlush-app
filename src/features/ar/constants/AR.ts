import type { Position } from '@/features/ar/types/position.types';

// Nom de la carte à reconnaître
export const CARD_TARGET_NAME = 'cardMarker';

// Largeur réelle de l'image cible (m) : card-marker.png est en portrait, donc c'est le petit côté de la carte
export const CARD_PHYSICAL_WIDTH_M = 0.054;

// Au-delà de cette distance (en mètres), la position de la carte est considérée comme fausse
export const MAX_CARD_DISTANCE_M = 5;

// Carte acceptée si elle est à plat, avec environ 35° d'inclinaison au plus
export const MIN_CARD_FLATNESS = 0.8;

// Délai minimal entre deux logs de pose ignorée
export const IGNORED_POSE_LOG_INTERVAL_MS = 1000;

// Taille du tapis
export const TABLE_SCALE: Position = [0.2, 0.2, 0.2];
export const TABLE_POSITION: Position = [0, 0, 0];

// Emplacements des 5 cartes communes, en unités du modèle tapis_poker_large.glb
const BOARD_SLOT_Y = 0.004;
const BOARD_SLOT_Z = 0.06;
export const BOARD_SLOTS: Position[] = [-0.158, -0.079, 0, 0.079, 0.158].map((x) => [x, BOARD_SLOT_Y, BOARD_SLOT_Z]);

export const BOARD_CARD_WIDTH = 0.063;
export const BOARD_CARD_HEIGHT = 0.088;

// Animations : le tapis apparaît, puis les cartes sont distribuées
export const TABLE_APPEAR_DURATION_MS = 600;

// Marge avant d'afficher les cartes si la fin de l'animation n'est jamais signalée
export const TABLE_APPEAR_TIMEOUT_MARGIN_MS = 500;

// Durée maximale d'attente du chargement du tapis
export const TABLE_LOAD_TIMEOUT_MS = 15_000;
export const BOARD_DECK_POSITION: Position = [0.38, 0.004, BOARD_SLOT_Z];
export const CARD_DEAL_DURATION_MS = 400;
export const CARD_DEAL_STAGGER_MS = 150;

// Retournement d'une carte, elle se soulève, tourne, puis se repose
export const CARD_LIFT_HEIGHT = 0.03;
export const CARD_LIFT_DURATION_MS = 120;
export const CARD_TURN_DURATION_MS = 300;

// Rotation en degrés. Le tapis est déjà à plat, on le tourne seulement sur y
export const TABLE_ROTATION: Position = [0, -90, 0];
