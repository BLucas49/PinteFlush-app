import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native';
import { type BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { BackLink } from '@/shared/components/BackLink';
import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { useTheme } from '@/shared/hooks/useTheme';
import { DARK_COLORS, LIGHT_COLORS } from '@/shared/styles/tokens/COLORS';

const FRAME_SIZE = 260;
const CORNER_SIZE = 28;
const CORNER_WIDTH = 3;
const CODE_PATTERN = /([A-Z0-9]{6})$/i; // code à redéfinir si le format change (ex. code à 8 caractères, avec tirets, etc.)

const extractCode = (data: string) => data.trim().match(CODE_PATTERN)?.[1]?.toUpperCase() ?? null;

const ScannerScreen = () => {
  const { colors, radii, spacing, typography } = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [invalid, setInvalid] = useState(false);
  const scanned = useRef(false);

  const onBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned.current) {
      return;
    }
    const roomId = extractCode(data);
    if (!roomId) {
      setInvalid(true);
      return;
    }
    scanned.current = true;
    navigation.dispatch(StackActions.replace('WaitingRoom', { roomId }));
  };

  const renderCamera = () => {
    if (!permission) {
      return null;
    }

    if (!permission.granted) {
      return (
        <View style={{ gap: spacing.md }}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            L&apos;accès à la caméra est nécessaire pour scanner le QR code.
          </Text>
          <AppButton onPress={permission.canAskAgain ? requestPermission : Linking.openSettings}>
            {permission.canAskAgain ? 'Autoriser la caméra' : 'Ouvrir les réglages'}
          </AppButton>
        </View>
      );
    }

    const corner = {
      borderColor: LIGHT_COLORS.surface,
      width: CORNER_SIZE,
      height: CORNER_SIZE,
    };

    return (
      <View
        style={[
          styles.camera,
          {
            marginHorizontal: -spacing.lg,
            marginBottom: -spacing.lg,
          },
        ]}
      >
        {isFocused && (
          <CameraView
            style={StyleSheet.absoluteFill} // étire la caméra sur tout l'écran
            facing="back" // caméra arrière
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }} // limite la détection aux QR codes
            onBarcodeScanned={onBarcodeScanned}
          />
        )}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, { gap: spacing.lg }]}>
          <View style={styles.frame}>
            <View style={[styles.corner, corner, styles.topLeft, { borderTopLeftRadius: radii.md }]} />
            <View style={[styles.corner, corner, styles.topRight, { borderTopRightRadius: radii.md }]} />
            <View style={[styles.corner, corner, styles.bottomLeft, { borderBottomLeftRadius: radii.md }]} />
            <View style={[styles.corner, corner, styles.bottomRight, { borderBottomRightRadius: radii.md }]} />
          </View>
          <View
            style={[
              styles.hint,
              {
                backgroundColor: DARK_COLORS.surface,
                borderRadius: radii.full,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
              },
            ]}
          >
            <Text style={[typography.caption, { color: invalid ? DARK_COLORS.danger : DARK_COLORS.textPrimary }]}>
              {invalid ? 'QR code non reconnu' : 'Placez le QR code dans le cadre'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <PlaceholderScreen
      centered={false}
      header={<BackLink label="Jouer" />}
      title="Scanner un QR code"
      subtitle="Scannez le code d'invitation de l'hôte pour rejoindre sa partie."
    >
      {renderCamera()}
    </PlaceholderScreen>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    overflow: 'hidden',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
  },
  corner: { position: 'absolute' },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  hint: { opacity: 0.9 },
});

export default ScannerScreen;
