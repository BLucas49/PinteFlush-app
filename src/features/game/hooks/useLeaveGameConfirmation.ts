import { useNavigation, usePreventRemove } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useLeaveGameConfirmation = (enabled = true) => {
  const navigation = useNavigation();

  usePreventRemove(enabled, ({ data }) => {
    Alert.alert('Quitter la partie ?', 'Vous allez quitter la partie en cours.', [
      {
        text: 'Rester',
        style: 'cancel',
      },
      {
        text: 'Quitter',
        style: 'destructive',
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  // Sans écran précédent (ex. jeu affiché dans un onglet), il n'y a rien à quitter
  return useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);
};
