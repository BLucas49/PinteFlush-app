import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OVERLAY_COLORS } from '@/shared/styles/tokens/COLORS';

import { useARBoardStore } from '../store/arBoardStore';

interface BoardDebugButtonsProps {
  bottom: number;
}

const BoardDebugButtons = ({ bottom }: BoardDebugButtonsProps) => {
  const board = useARBoardStore((state) => state.board);
  const toggleCard = useARBoardStore((state) => state.toggleCard);
  const toggleAllCards = useARBoardStore((state) => state.toggleAllCards);
  const addCard = useARBoardStore((state) => state.addCard);
  const removeCard = useARBoardStore((state) => state.removeCard);

  return (
    <View style={[styles.container, { bottom }]}>
      {board.map((card, index) => (
        <Pressable key={index} accessibilityRole="button" style={styles.button} onPress={() => toggleCard(index)}>
          <Text style={styles.text}>{`${index + 1} ${card.faceUp ? '▲' : '▼'}`}</Text>
        </Pressable>
      ))}
      <Pressable accessibilityRole="button" style={styles.button} onPress={toggleAllCards}>
        <Text style={styles.text}>Tout</Text>
      </Pressable>
      <Pressable accessibilityRole="button" style={styles.button} onPress={addCard}>
        <Text style={styles.text}>+</Text>
      </Pressable>
      <Pressable accessibilityRole="button" style={styles.button} onPress={removeCard}>
        <Text style={styles.text}>−</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '75%',
    gap: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: OVERLAY_COLORS.background,
  },
  text: {
    color: OVERLAY_COLORS.content,
  },
});

export default BoardDebugButtons;
