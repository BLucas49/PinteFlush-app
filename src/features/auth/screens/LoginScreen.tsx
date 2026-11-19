import { Link } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { AppInput } from '@/shared/components/Input';
import { useTheme } from '@/shared/hooks/useTheme';

import { useLogin } from '../hooks/useLogin';

const LoginScreen = () => {
  const { colors } = useTheme();
  const { email, setEmail, password, setPassword, emailError, passwordError, submitting, error, submit } = useLogin();

  return (
    <View style={styles.main}>
      <View style={styles.container_logo}>
        <Image source={require('../../../../assets/images/LogoPinteFlush.png')} />
        <Text style={[styles.title, { color: colors.textPrimary }]}>PinteFlush</Text>
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Connexion</Text>
      <View style={styles.form}>
        <AppInput
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="Ex. john.doe@gmail.com"
          keyboard="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={emailError}
        />
        <AppInput
          label="Mot de passe"
          value={password}
          setValue={setPassword}
          placeholder="Ex. UnSuperJeuDePokerEnAR"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          error={passwordError}
        />
        {error && <Text style={{ color: colors.danger }}>{error}</Text>}
      </View>
      <View style={styles.container_validation}>
        <AppButton onPress={submit} loading={submitting} disabled={submitting} style={{ width: '100%' }}>
          Se connecter
        </AppButton>
        <View style={styles.container_delimiter}>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text style={[styles.text, { color: colors.textSecondary }]}>Ou</Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </View>

        <Link screen="Auth" params={{ screen: 'Register' }}>
          Créer un compte
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
    paddingBottom: 100,
    paddingTop: 50,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  container_logo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    flexDirection: 'row',
    fontWeight: 600,
  },
  form: {
    gap: 25,
    flexDirection: 'column',
  },
  container_delimiter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
  },
  line: {
    flex: 1,
    height: 2,
  },
  text: {
    fontSize: 15,
  },
  container_validation: {
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },
});
export default LoginScreen;
