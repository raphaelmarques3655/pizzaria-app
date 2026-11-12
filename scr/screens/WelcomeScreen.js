
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

const ORANGE = '#FF6500';

export default function WelcomeScreen({
  onLogin,
  onRegister,
  onContinueGuest,
}) {
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 600;

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=2000&q=90',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="#17110D" />

      <View style={styles.overlay} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: height },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.container,
            { width: isSmallScreen ? '90%' : 560 },
          ]}
        >
          {/* LOGO */}
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🍕</Text>
            </View>

            <Text style={styles.brand}>
              d'Lucas <Text style={styles.brandOrange}>Delivery</Text>
            </Text>

            <Text style={styles.brandSubtitle}>
              PIZZAS FEITAS PARA VOCÊ
            </Text>
          </View>

          {/* APRESENTAÇÃO */}
          <View style={styles.hero}>
            <View style={styles.tag}>
              <View style={styles.tagDot} />
              <Text style={styles.tagText}>
                SEU MOMENTO MERECE MAIS SABOR
              </Text>
            </View>

            <Text style={styles.title}>
    {'\n'}
  <Text style={styles.titleOrange}></Text>
</Text>

            <Text
              style={[
                styles.title,
                { fontSize: isSmallScreen ? 36 : 48 },
              ]}
            >
              
              

              Aproveite cada{' '}
              <Text style={styles.titleOrange}>pedaço!</Text>

              



            </Text>
            
            <Text style={styles.title}>
    {'\n'}
  <Text style={styles.titleOrange}></Text>
</Text>


            <Text style={styles.description}>
              Sabor irresistível, ingredientes selecionados e
              aquela pizza que transforma qualquer momento
              em algo especial.
            </Text>
            

            <View style={styles.features}>
              <Text style={styles.feature}>🔥 Muito sabor</Text>
              <Text style={styles.feature}>🛵 Na sua porta</Text>
            </View>
          </View>

          {/* BOTÕES */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={onLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginText}>Entrar na conta</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={onRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.registerText}>Criar conta</Text>
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
          </View>

          <Text style={styles.footer}>
            FEITO COM AMOR. SERVIDO COM SABOR
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#17110D',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.66)',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 0,
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: ORANGE,
    borderWidth: 2,
    borderColor: '#FFB16D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  logoEmoji: {
    fontSize: 36,
  },

  brand: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },

  brandOrange: {
    color: ORANGE,
  },

  brandSubtitle: {
    color: '#E6E0DC',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 10,
  },

  hero: {
    marginBottom: 40,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: 'rgba(255,101,0,0.14)',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
  },

  tagDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ORANGE,
    marginRight: 9,
  },

  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '900',
    lineHeight: 1.2,
    letterSpacing: -1.5,
    marginBottom: 12,
  },

  titleOrange: {
    color: ORANGE,
  },

  description: {
    color: '#F0EBE7',
    fontSize: 16,
    lineHeight: 25,
    maxWidth: 480,
  },

  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 26,
    gap: 24,
  },

  feature: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  actions: {
    width: '100%',
    gap: 12,
  },

  loginButton: {
    height: 66,
    backgroundColor: ORANGE,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 5,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 26,
    position: 'absolute',
    right: 24,
    top: 15,
  },

  registerButton: {
    height: 62,
    backgroundColor: 'rgba(35,35,35,0.95)',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  guestButton: {
    alignItems: 'center',
    paddingVertical: 13,
  },

  guestText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },

  footer: {
    color: '#BDB5AF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.8,
    textAlign: 'center',
    marginTop: 18,
  },
});
