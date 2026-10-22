
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const LARANJA = '#FF6600';

export default function WelcomeScreen({
  onLogin,
  onRegister,
  onContinueGuest,
}) {
  const { width, height } = useWindowDimensions();
  const pequeno = height < 720;
  const desktop = width >= 750;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=85',
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              minHeight: height,
              paddingHorizontal: desktop ? 48 : 24,
              paddingVertical: pequeno ? 22 : 30,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🍕</Text>
            </View>

            <Text style={styles.brandName}>
              d'Lucas <Text style={{ color: LARANJA }}>Delivery</Text>
            </Text>

            <Text style={styles.tagline}>
              PIZZAS FEITAS PARA VOCÊ
            </Text>
          </View>

          <View
            style={[
              styles.hero,
              { width: '100%', maxWidth: desktop ? 560 : 460 },
            ]}
          >
            <View style={styles.badge}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>
                SEU MOMENTO MERECE MAIS SABOR
              </Text>
            </View><br></br>

            <Text
              style={[
                styles.title,
                { fontSize: desktop ? 49 : pequeno ? 34 : 40 },
              ]}
            >
              A melhor pizza
            </Text> <br></br> <br></br>

            <Text
              style={[
                styles.title,
                styles.titleSecond,
                { fontSize: desktop ? 49 : pequeno ? 34 : 40 },
              ]}
            >
              chega até <Text style={styles.orange}>você.</Text>
            </Text>
            <br></br>

            <Text style={styles.description}>
              Sabor irresistível, ingredientes selecionados
              e aquela pizza que transforma qualquer
              momento em algo especial.
            </Text>

            <View style={styles.highlights}>
              <Text style={styles.highlight}>🔥  Muito sabor</Text>
              <Text style={styles.highlight}>🛵  Na sua porta</Text>
            </View>
          </View>

          <View style={[styles.actions, { maxWidth: 460 }]}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryText}>Entrar na conta</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryText}>Criar conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestButton}
              onPress={onContinueGuest}
              activeOpacity={0.7}
            >
              <Text style={styles.guestText}>
                Continuar sem conta
              </Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
              FEITO COM AMOR, SERVIDO COM SABOR
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.70)',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: LARANJA,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  logoText: {
    fontSize: 35,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  tagline: {
    color: '#DDDDDD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginTop: 8,
  },
  hero: {
    alignSelf: 'center',
    marginBottom: 28,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,102,0,0.65)',
    backgroundColor: 'rgba(255,102,0,0.15)',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: LARANJA,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFE0CD',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    lineHeight: 1.25,
    includeFontPadding: true,
  },
  titleSecond: {
    marginTop: 0,
  },
  orange: {
    color: LARANJA,
  },
  description: {
    color: '#E2E2E2',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
    maxWidth: 390,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 22,
    marginTop: 23,
  },
  highlight: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  actions: {
    width: '100%',
    alignSelf: 'center',
  },
  primaryButton: {
    minHeight: 60,
    borderRadius: 16,
    backgroundColor: LARANJA,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    marginLeft: 22,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 25,
  },
  secondaryButton: {
    minHeight: 57,
    borderRadius: 16,
    backgroundColor: 'rgba(35,35,35,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  guestButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  footer: {
    color: '#BBBBBB',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
});
