import { Image, StyleSheet, View } from 'react-native';

import { CARD_IMAGES, type CardId } from '@/features/ar';
import { useTheme } from '@/shared/hooks/useTheme';

interface PlayerHandProps {
  cards: [CardId, CardId];
}

const CARD_HEIGHT = 56;
// Ratio d'une carte (630 x 880), la largeur est fixée pour ne pas dépendre de la taille de l'image
const CARD_WIDTH = Math.round((CARD_HEIGHT * 630) / 880);

const PlayerHand = ({ cards }: PlayerHandProps) => {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { gap: spacing.xs }]}>
      {cards.map((id) => (
        <Image key={id} source={CARD_IMAGES[id]} style={styles.card} resizeMode="contain" accessibilityLabel={id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export default PlayerHand;
