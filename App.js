import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import WelcomeScreen from './scr/screens/WelcomeScreen';
import TrackingScreen from './scr/screens/TrackingScreen';

const ORANGE = '#FF6600';
const BG = '#F7F7F7';

const PRODUCTS = [
  { id:'p1', name:'Calabresa Especial', category:'Pizzas', description:'Calabresa, cebola, muçarela e orégano', price:39.90, image:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80' },
  { id:'p2', name:'Frango com Catupiry', category:'Pizzas', description:'Frango temperado, catupiry e muçarela', price:44.90, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80' },
  { id:'p3', name:'Quatro Queijos', category:'Pizzas', description:'Muçarela, provolone, parmesão e gorgonzola', price:47.90, image:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80' },
  { id:'p4', name:'Portuguesa', category:'Pizzas', description:'Presunto, ovo, cebola, azeitona e queijo', price:45.90, image:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80' },
  { id:'p5', name:'Margherita', category:'Pizzas', description:'Tomate, manjericão fresco e muçarela', price:39.90, image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80' },
  { id:'p6', name:'Pepperoni', category:'Pizzas', description:'Pepperoni especial e queijo derretido', price:49.90, image:'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80' },
  { id:'p7', name:'Bacon Crocante', category:'Pizzas', description:'Bacon, muçarela e toque de barbecue', price:46.90, image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80' },
  { id:'p8', name:'Moda da Casa', category:'Pizzas', description:'Uma combinação especial do chef', price:52.90, image:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80' },
  { id:'d1', name:'Pizza de Chocolate', category:'Doces', description:'Chocolate cremoso e granulado', price:36.90, image:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80' },
  { id:'d2', name:'Pizza de Banana', category:'Doces', description:'Banana, canela e leite condensado', price:34.90, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80' },
  { id:'s1', name:'Brownie', category:'Sobremesas', description:'Brownie de chocolate com calda', price:14.90, image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80' },
  { id:'s2', name:'Petit Gâteau', category:'Sobremesas', description:'Bolinho quente com recheio cremoso', price:19.90, image:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80' },
  { id:'s3', name:'Pudim', category:'Sobremesas', description:'Pudim de leite condensado', price:12.90, image:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80' },
  { id:'b1', name:'Coca-Cola 2 L', category:'Bebidas', description:'Refrigerante gelado para compartilhar', price:13.90, image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80' },
  { id:'b2', name:'Guaraná 2 L', category:'Bebidas', description:'Refrigerante de guaraná', price:11.90, image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80' },
  { id:'b3', name:'Água mineral', category:'Bebidas', description:'Água mineral sem gás, 500 ml', price:4.50, image:'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=700&q=80' },
  { id:'b4', name:'Suco de laranja', category:'Bebidas', description:'Suco natural de laranja', price:9.90, image:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80' },
];

const CATEGORIES = ['Todos','Pizzas','Doces','Sobremesas','Bebidas'];

const money = value =>
  Number(value || 0).toLocaleString('pt-BR', {
    style:'currency',
    currency:'BRL',
  });

const emailValid = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

// COMPONENTES REUTILIZÁVEIS

function Header({ title, onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerLogo}>🍕</Text>
    </View>
  );
}

function Button({ title, onPress, secondary = false, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        secondary && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={[
        styles.buttonText,
        secondary && styles.buttonTextSecondary,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secure = false,
  keyboardType = 'default',
  maxLength,
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value ?? ''}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor="#999"
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCapitalize={
          keyboardType === 'email-address' ? 'none' : 'sentences'
        }
        autoCorrect={false}
        spellCheck={false}
        maxLength={maxLength}
        blurOnSubmit={false}
        returnKeyType="next"
        underlineColorAndroid="transparent"
        selectionColor={ORANGE}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function Option({ title, selected, onPress, subtitle }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <View style={{ flex:1 }}>
        <Text style={styles.optionTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.muted}>{subtitle}</Text>}
      </View>
      <Text style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? '●' : '○'}
      </Text>
    </TouchableOpacity>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>
        {label}
      </Text>
      <Text style={[styles.summaryValue, bold && styles.summaryBold]}>
        {value}
      </Text>
    </View>
  );
}

function ProductCard({ product, onOpen, onAdd }) {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => onOpen(product)}>
        <Image
          source={{ uri:product.image }}
          style={styles.productImage}
        />
      </TouchableOpacity>

      <View style={styles.productInfo}>
        <View style={styles.productTitleRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.rating}>★ 4.8</Text>
        </View>

        <Text style={styles.productDescription}>
          {product.description}
        </Text>

        <View style={styles.productBottom}>
          <Text style={styles.price}>{money(product.price)}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAdd(product)}
          >
            <Text style={styles.addButtonText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ProductList({ items, onOpen, onAdd }) {
  return (
    <View>
      {items.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onOpen={onOpen}
          onAdd={onAdd}
        />
      ))}
    </View>
  );
}

function BottomNav({ screen, cartCount, setScreen }) {
  const navItems = [
    ['home','⌂','Início'],
    ['menu','🍕','Cardápio'],
    ['cart','🛒',`Carrinho (${cartCount})`],
    ['orders','📦','Pedidos'],
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map(([id, icon, label]) => (
        <TouchableOpacity
          key={id}
          style={styles.navItem}
          onPress={() => setScreen(id)}
        >
          <Text style={[
            styles.navIcon,
            screen === id && styles.navActive,
          ]}>
            {icon}
          </Text>
          <Text style={[
            styles.navLabel,
            screen === id && styles.navActive,
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// APLICATIVO PRINCIPAL

export default function App() {
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [screen, setScreen] = useState('welcome');
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Grande');
  const [flavor, setFlavor] = useState('Tradicional');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [loginError, setLoginError] = useState({});

  const [delivery, setDelivery] = useState('Entrega');
  const [shipping, setShipping] = useState('Padrão');
  const [payment, setPayment] = useState(null);

  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const [customer, setCustomer] = useState({
    name:'',
    phone:'',
    cep:'',
    street:'',
    number:'',
    neighborhood:'',
    city:'',
    state:'',
    complement:'',
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingPrice =
    delivery === 'Retirada' ? 0 :
    shipping === 'Expressa' ? 12 :
    shipping === 'Agendar' ? 6 : 7;

  const discount = payment === 'PIX' ? subtotal * 0.05 : 0;
  const total = Math.max(0, subtotal + shippingPrice - discount);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const fullAddress = [
    customer.street,
    customer.number,
    customer.neighborhood,
    customer.city,
    customer.state,
    customer.cep,
    customer.complement,
  ].filter(Boolean).join(', ');

  function updateCustomer(field, value) {
    setCustomer(current => ({
      ...current,
      [field]:value,
    }));
  }

  // INTEGRAÇÃO COM VIACEP

  async function consultarCep(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);

    const formattedCep = digits.length > 5
      ? `${digits.slice(0, 5)}-${digits.slice(5)}`
      : digits;

    setCustomer(current => ({
      ...current,
      cep:formattedCep,
    }));

    setCepError('');

    if (digits.length !== 8) {
      setCustomer(current => ({
        ...current,
        cep:formattedCep,
        street:'',
        neighborhood:'',
        city:'',
        state:'',
      }));
      return;
    }

    try {
      setCepLoading(true);

      const response = await fetch(
        `https://viacep.com.br/ws/${digits}/json/`
      );

      if (!response.ok) {
        throw new Error('Falha na consulta');
      }

      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado. Confira os números.');
        setCustomer(current => ({
          ...current,
          cep:formattedCep,
          street:'',
          neighborhood:'',
          city:'',
          state:'',
        }));
        return;
      }

      setCustomer(current => ({
        ...current,
        cep:formattedCep,
        street:data.logradouro || '',
        neighborhood:data.bairro || '',
        city:data.localidade || '',
        state:data.uf || '',
      }));

    } catch (error) {
      setCepError(
        'Não foi possível consultar o CEP. Verifique sua internet e tente novamente.'
      );
    } finally {
      setCepLoading(false);
    }
  }

  // LOGIN

  function validateLogin() {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Informe seu e-mail.';
    } else if (!emailValid(email)) {
      errors.email = 'Digite um e-mail válido.';
    }

    if (!password.trim()) {
      errors.password = 'Informe sua senha.';
    } else if (password.trim().length < 6) {
      errors.password = 'A senha precisa ter pelo menos 6 caracteres.';
    }

    setLoginError(errors);

    if (Object.keys(errors).length) return;

    setLoginError({});
    setScreen('home');

    Alert.alert(
      'Login demonstrativo',
      'Acesso realizado com sucesso!'
    );
  }

  // CADASTRO

  function validateRegister() {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Informe seu nome completo.';
    }

    if (!email.trim()) {
      errors.email = 'Informe seu e-mail.';
    } else if (!emailValid(email)) {
      errors.email = 'Digite um e-mail válido.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    const cpfDigits = cpf.replace(/\D/g, '');

    if (!phone.trim()) {
      errors.phone = 'Informe seu telefone.';
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      errors.phone = 'Digite um telefone com DDD.';
    }

    if (!cpf.trim()) {
      errors.cpf = 'Informe seu CPF.';
    } else if (cpfDigits.length !== 11) {
      errors.cpf = 'O CPF precisa ter 11 números.';
    }

    if (!password.trim()) {
      errors.password = 'Informe uma senha.';
    } else if (password.trim().length < 6) {
      errors.password = 'Use pelo menos 6 caracteres.';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirme sua senha.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
    }

    setLoginError(errors);

    if (Object.keys(errors).length) return;

    setCustomer(current => ({
      ...current,
      name:name.trim(),
      phone:phone.trim(),
    }));

    setLoginError({});
    setScreen('home');

    Alert.alert(
      'Cadastro realizado',
      'Seu cadastro demonstrativo foi concluído!'
    );
  }

  function openAuth(nextScreen) {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('');
    setCpf('');
    setLoginError({});
    setScreen(nextScreen);
  }

  // CARRINHO

  function addToCart(
    product,
    amount = 1,
    chosenSize = '',
    chosenFlavor = ''
  ) {
    if (!product || !Number.isFinite(amount) || amount < 1) {
      return;
    }

    const sizeExtra =
      chosenSize === 'Grande' ? 8 :
      chosenSize === 'Família' ? 16 : 0;

    const itemPrice = Number(product.price) + sizeExtra;

    const key = `${product.id}-${chosenSize}-${chosenFlavor}`;

    setCart(current => {
      const existing = current.find(item => item.key === key);

      if (existing) {
        return current.map(item =>
          item.key === key
            ? {
                ...item,
                quantity:item.quantity + amount,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          key,
          price:itemPrice,
          quantity:amount,
          chosenSize,
          chosenFlavor,
        },
      ];
    });

    setScreen('menu');

    Alert.alert(
      'Adicionado ao carrinho!',
      `${product.name} foi adicionado.`
    );
  }

  function changeQuantity(key, delta) {
    setCart(current =>
      current
        .map(item =>
          item.key === key
            ? {
                ...item,
                quantity:Math.max(0, item.quantity + delta),
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setQuantity(1);
    setSize('Grande');
    setFlavor('Tradicional');
    setScreen('product');
  }

  function goCheckout() {
    if (!cart.length) {
      Alert.alert(
        'Carrinho vazio',
        'Adicione produtos antes de continuar.'
      );
      return;
    }

    setPayment(null);
    setScreen('checkout');
  }

  // CONFIRMAÇÃO DO PEDIDO

  function finishOrder() {
    if (!cart.length) {
      Alert.alert(
        'Carrinho vazio',
        'Adicione produtos antes de confirmar.'
      );
      setScreen('menu');
      return;
    }

    if (delivery === 'Entrega') {
      const phoneDigits = customer.phone.replace(/\D/g, '');
      const cepDigits = customer.cep.replace(/\D/g, '');

      if (
        !customer.name.trim() ||
        phoneDigits.length < 10 ||
        phoneDigits.length > 11
      ) {
        Alert.alert(
          'Dados incompletos',
          'Preencha seu nome e um telefone válido com DDD.'
        );
        return;
      }

      if (
        cepDigits.length !== 8 ||
        !customer.street.trim() ||
        !customer.number.trim() ||
        !customer.neighborhood.trim() ||
        !customer.city.trim() ||
        !customer.state.trim()
      ) {
        Alert.alert(
          'Endereço incompleto',
          'Informe um CEP válido e confira rua, número e bairro.'
        );
        return;
      }

      if (cepLoading) {
        Alert.alert(
          'Aguarde',
          'Estamos consultando seu CEP.'
        );
        return;
      }
    }

    if (!payment) {
      Alert.alert(
        'Pagamento não selecionado',
        'Escolha uma forma de pagamento.'
      );
      return;
    }

    const safeSubtotal = Math.max(0, Number(subtotal) || 0);
    const safeShipping = Math.max(0, Number(shippingPrice) || 0);
    const safeDiscount = payment === 'PIX'
      ? safeSubtotal * 0.05
      : 0;

    const finalTotal = Math.max(
      0,
      safeSubtotal + safeShipping - safeDiscount
    );

    const now = new Date();

    const order = {
      id:String(Date.now()).slice(-8),
      date:now.toLocaleDateString('pt-BR'),
      time:now.toLocaleTimeString('pt-BR', {
        hour:'2-digit',
        minute:'2-digit',
      }),
      items:cart.map(item => ({ ...item })),
      subtotal:safeSubtotal,
      shipping:safeShipping,
      discount:safeDiscount,
      total:finalTotal,
      payment,
      delivery,
      address:delivery === 'Retirada'
        ? 'Retirada no balcão'
        : fullAddress,
      customer:{ ...customer },
      status:'Em preparo',
    };

    setOrders(current => [order, ...current]);
    setCart([]);
    setPayment(null);
    setScreen('orders');

    Alert.alert(
      'Pedido confirmado!',
      `Seu pedido #${order.id} foi registrado com sucesso.`
    );
  }

  // A PARTIR DAQUI COMEÇAM AS TELAS

  // TELA DE BOAS-VINDAS

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        onLogin={() => openAuth('login')}
        onRegister={() => openAuth('register')}
        onContinueGuest={() => setScreen('home')}
      />
    );
  }

    // LOGIN E CADASTRO

  if (screen === 'login' || screen === 'register') {
    const registering = screen === 'register';

    const phoneDigitsForRegister = phone.replace(/\D/g, '');

    const validLogin =
      emailValid(email) &&
      password.trim().length >= 6;

    const validRegister =
      name.trim().length > 0 &&
      emailValid(email) &&
      phoneDigitsForRegister.length >= 10 &&
      phoneDigitsForRegister.length <= 11 &&
      cpf.replace(/\D/g, '').length === 11 &&
      password.trim().length >= 6 &&
      confirmPassword.length > 0 &&
      password === confirmPassword;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />

        <Header
          title={registering ? 'Criar conta' : 'Entrar'}
          onBack={() => setScreen('welcome')}
        />

        <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.page}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            nestedScrollEnabled
          >
            <Text style={styles.pageTitle}>
              {registering
                ? 'Faça seu cadastro'
                : 'Que bom ter você de volta!'}
            </Text>

            <Text style={styles.muted}>
              Preencha seus dados para continuar.
            </Text>

            {registering && (
              <Field
                label="Nome completo"
                value={name}
                onChangeText={setName}
                error={loginError.name}
              />
            )}

            <Field
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="voce@email.com"
              error={loginError.email}
            />

            {registering && (
              <>
                <Field
                  label="Telefone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  error={loginError.phone}
                />

                <Field
                  label="CPF"
                  value={cpf}
                  onChangeText={setCpf}
                  keyboardType="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  error={loginError.cpf}
                />
              </>
            )}

            <Field
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secure
              error={loginError.password}
            />

            {registering && (
              <Field
                label="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secure
                error={loginError.confirmPassword}
              />
            )}

            {!registering && (
              <TouchableOpacity
                onPress={() => Alert.alert(
                  'Recuperação',
                  'Esta função é apenas demonstrativa.'
                )}
              >
                <Text style={styles.link}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            )}

            <Button
              title={registering ? 'Criar conta' : 'Entrar'}
              disabled={registering ? !validRegister : !validLogin}
              onPress={registering ? validateRegister : validateLogin}
            />

            <TouchableOpacity
              style={styles.authSwitch}
              onPress={() => openAuth(
                registering ? 'login' : 'register'
              )}
            >
              <Text style={styles.link}>
                {registering
                  ? 'Já possui conta? Entrar'
                  : 'Não tem conta? Criar cadastro'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // TELA INICIAL

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />

        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          nestedScrollEnabled
        >
          <View style={styles.homeHeader}>
            <View style={{ flex:1 }}>
              <Text style={styles.smallWhite}>SEU ENDEREÇO</Text>

              <Text style={styles.addressText}>
                📍 {customer.street
                  ? `${customer.street}, ${customer.number} - ${customer.neighborhood}`
                  : 'Adicione seu endereço na finalização'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setScreen('cart')}
              style={styles.cartCircle}
            >
              <Text style={styles.cartCircleText}>
                🛒 {cartCount}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>
            Olá! Bora comer bem? 🍕
          </Text>

          <Text style={styles.muted}>
            Seu próximo momento delicioso começa aqui.
          </Text>

          <TextInput
            style={styles.search}
            placeholder="🔎 Buscar pizza, bebida, sobremesa..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => setScreen('menu')}
            blurOnSubmit={false}
            autoCorrect={false}
          />

          <View style={styles.banner}>
            <Text style={styles.bannerEyebrow}>
              D'LUCAS DELIVERY
            </Text>

            <Text style={styles.bannerTitle}>
              Hoje merece pizza!
            </Text>

            <Text style={styles.bannerText}>
              Seu sabor favorito está esperando.
            </Text>

            <Button
              title="Ver cardápio →"
              onPress={() => setScreen('menu')}
            />
          </View>

          <Text style={styles.sectionTitle}>
            Como você está hoje?
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[
              ['😋','Com fome'],
              ['⚡','Animado'],
              ['😴','Cansado'],
              ['🥳','Comemorando'],
            ].map(([emoji, label]) => (
              <TouchableOpacity
                key={label}
                style={styles.mood}
                onPress={() => setScreen('menu')}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
                <Text style={styles.moodText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Mais pedidos</Text>

            <TouchableOpacity onPress={() => setScreen('menu')}>
              <Text style={styles.link}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          <ProductList
            items={PRODUCTS.slice(0,3)}
            onOpen={openProduct}
            onAdd={addToCart}
          />

          <Text style={styles.sectionTitle}>
            Explore o cardápio
          </Text>

          <View style={styles.categoryGrid}>
            {CATEGORIES.slice(1).map(item => (
              <TouchableOpacity
                key={item}
                style={styles.categoryTile}
                onPress={() => {
                  setCategory(item);
                  setSearch('');
                  setScreen('menu');
                }}
              >
                <Text style={styles.categoryEmoji}>
                  {item === 'Pizzas' ? '🍕'
                    : item === 'Doces' ? '🍫'
                    : item === 'Sobremesas' ? '🍰' : '🥤'}
                </Text>

                <Text style={styles.categoryName}>{item}</Text>

                <Text style={styles.muted}>
                  {PRODUCTS.filter(p => p.category === item).length} opções
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomNav
          screen={screen}
          cartCount={cartCount}
          setScreen={setScreen}
        />
      </SafeAreaView>
    );
  }

  // CARDÁPIO

  if (screen === 'menu') {
    const filtered = PRODUCTS.filter(product => {
      const matchesCategory =
        category === 'Todos' || product.category === category;

      const term = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.menuHeader}>
          <Text style={styles.pageTitle}>Nosso cardápio 🍕</Text>

          <TouchableOpacity onPress={() => setScreen('cart')}>
            <Text style={styles.link}>🛒 {cartCount} itens</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryScroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {CATEGORIES.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryChip,
                  category === item && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === item && styles.categoryChipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="Buscar no cardápio..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            blurOnSubmit={false}
            autoCorrect={false}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          nestedScrollEnabled
        >
          <Text style={styles.muted}>
            {filtered.length} produtos encontrados
          </Text>

          {filtered.length ? (
            <ProductList
              items={filtered}
              onOpen={openProduct}
              onAdd={addToCart}
            />
          ) : (
            <Text style={styles.empty}>
              Não encontramos esse produto.
            </Text>
          )}
        </ScrollView>

        <BottomNav
          screen={screen}
          cartCount={cartCount}
          setScreen={setScreen}
        />
      </SafeAreaView>
    );
  }

  // DETALHES DO PRODUTO

  if (screen === 'product' && selectedProduct) {
    const extra =
      size === 'Grande' ? 8 :
      size === 'Família' ? 16 : 0;

    const flavorExtra =
      flavor === 'Borda recheada' ? 6 : 0;

    const productTotal =
      (selectedProduct.price + extra + flavorExtra) * quantity;

    return (
      <SafeAreaView style={styles.safe}>
        <Header
          title="Detalhes do produto"
          onBack={() => setScreen('menu')}
        />

        <ScrollView contentContainerStyle={styles.page}>
          <Image
            source={{ uri:selectedProduct.image }}
            style={styles.detailImage}
          />

          <Text style={styles.pageTitle}>
            {selectedProduct.name}
          </Text>

          <Text style={styles.muted}>
            {selectedProduct.description}
          </Text>

          <Text style={styles.priceLarge}>
            {money(selectedProduct.price + extra + flavorExtra)}
          </Text>

          <Text style={styles.sectionTitle}>
            Escolha o sabor
          </Text>

          {['Tradicional','Borda recheada'].map(item => (
            <Option
              key={item}
              title={item}
              subtitle={item === 'Borda recheada' ? '+ R$ 6,00' : ''}
              selected={flavor === item}
              onPress={() => setFlavor(item)}
            />
          ))}

          <Text style={styles.sectionTitle}>Tamanho</Text>

          {[
            ['Média','Preço base'],
            ['Grande','+ R$ 8,00'],
            ['Família','+ R$ 16,00'],
          ].map(([item, subtitle]) => (
            <Option
              key={item}
              title={item}
              subtitle={subtitle}
              selected={size === item}
              onPress={() => setSize(item)}
            />
          ))}

          <Text style={styles.sectionTitle}>Quantidade</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityNumber}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Button
            title={`Adicionar • ${money(productTotal)}`}
            onPress={() => addToCart(
              {
                ...selectedProduct,
                price:selectedProduct.price + flavorExtra,
              },
              quantity,
              size,
              flavor
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CARRINHO

  if (screen === 'cart') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header
          title="Meu carrinho"
          onBack={() => setScreen('menu')}
        />

        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.discountBanner}>
            <Text style={styles.discountTitle}>
              🎉 Economize no seu pedido
            </Text>

            <Text style={styles.muted}>
              Ganhe 5% de desconto escolhendo PIX no pagamento.
            </Text>
          </View>

          {!cart.length ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyEmoji}>🛒</Text>

              <Text style={styles.pageTitle}>
                Seu carrinho está vazio
              </Text>

              <Text style={styles.muted}>
                Que tal escolher algo delicioso?
              </Text>

              <Button
                title="Explorar cardápio"
                onPress={() => setScreen('menu')}
              />
            </View>
          ) : (
            <>
              {cart.map(item => (
                <View style={styles.cartItem} key={item.key}>
                  <Image
                    source={{ uri:item.image }}
                    style={styles.cartImage}
                  />

                  <View style={{ flex:1 }}>
                    <Text style={styles.productName}>
                      {item.name}
                    </Text>

                    <Text style={styles.muted}>
                      {item.chosenSize || 'Padrão'} • {item.chosenFlavor || item.category}
                    </Text>

                    <Text style={styles.price}>
                      {money(item.price * item.quantity)}
                    </Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.smallQty}
                        onPress={() => changeQuantity(item.key, -1)}
                      >
                        <Text>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityNumber}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.smallQty}
                        onPress={() => changeQuantity(item.key, 1)}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => changeQuantity(
                      item.key,
                      -item.quantity
                    )}
                  >
                    <Text style={styles.removeText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.summary}>
                <SummaryRow
                  label="Subtotal"
                  value={money(subtotal)}
                />

                <SummaryRow
                  label="Entrega estimada"
                  value={money(7)}
                />

                <Text style={styles.muted}>
                  O frete final e o desconto serão calculados na finalização.
                </Text>

                <View style={styles.summaryDivider} />

                <SummaryRow
                  label="Total estimado"
                  value={money(subtotal + 7)}
                  bold
                />
              </View>

              <Button
                title="Continuar para entrega →"
                onPress={goCheckout}
              />

              <Button
                title="Continuar comprando"
                secondary
                onPress={() => setScreen('menu')}
              />
            </>
          )}
        </ScrollView>

        <BottomNav
          screen={screen}
          cartCount={cartCount}
          setScreen={setScreen}
        />
      </SafeAreaView>
    );
  }

  // FINALIZAÇÃO DO PEDIDO

  if (screen === 'checkout') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header
          title="Finalizar pedido"
          onBack={() => setScreen('cart')}
        />

        <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.page}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            nestedScrollEnabled
          >
            <Text style={styles.stepLabel}>ETAPA 1 DE 4</Text>
            <Text style={styles.pageTitle}>
              Como quer receber?
            </Text>

            <View style={styles.segmentRow}>
              {['Entrega','Retirada'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.segment,
                    delivery === item && styles.segmentActive,
                  ]}
                  onPress={() => setDelivery(item)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      delivery === item && styles.segmentTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {delivery === 'Entrega' ? (
              <>
                <Text style={styles.sectionTitle}>
                  Seus dados
                </Text>

                <Field
                  label="Nome completo"
                  value={customer.name}
                  onChangeText={v => updateCustomer('name', v)}
                />

                <Field
                  label="Telefone"
                  value={customer.phone}
                  onChangeText={v => updateCustomer('phone', v)}
                  keyboardType="phone-pad"
                />

                <Text style={styles.sectionTitle}>
                  Endereço de entrega
                </Text>

                <Field
                  label="CEP"
                  value={customer.cep}
                  onChangeText={consultarCep}
                  keyboardType="numeric"
                  maxLength={9}
                  placeholder="00000-000"
                />

                {cepLoading && (
                  <View style={styles.cepLoading}>
                    <ActivityIndicator color={ORANGE} />
                    <Text style={styles.muted}>
                      Consultando endereço...
                    </Text>
                  </View>
                )}

                {!!cepError && (
                  <Text style={styles.errorText}>
                    {cepError}
                  </Text>
                )}

                {!!customer.city && (
                  <View style={styles.cepSuccess}>
                    <Text style={styles.cepSuccessTitle}>
                      ✓ Endereço encontrado!
                    </Text>
                    <Text style={styles.muted}>
                      {customer.city} - {customer.state}
                    </Text>
                  </View>
                )}

                <Field
                  label="Rua / Logradouro"
                  value={customer.street}
                  onChangeText={v => updateCustomer('street', v)}
                  placeholder="Rua"
                />

                <Field
                  label="Número"
                  value={customer.number}
                  onChangeText={v => updateCustomer('number', v)}
                  keyboardType="numeric"
                  placeholder="Número da residência"
                />

                <Field
                  label="Bairro"
                  value={customer.neighborhood}
                  onChangeText={v => updateCustomer('neighborhood', v)}
                  placeholder="Bairro"
                />

                <Field
                  label="Cidade"
                  value={customer.city}
                  onChangeText={v => updateCustomer('city', v)}
                  placeholder="Cidade"
                />

                <Field
                  label="Estado (UF)"
                  value={customer.state}
                  onChangeText={v => updateCustomer('state', v.toUpperCase())}
                  maxLength={2}
                  placeholder="UF"
                />

                <Field
                  label="Complemento (opcional)"
                  value={customer.complement}
                  onChangeText={v => updateCustomer('complement', v)}
                  placeholder="Apartamento, casa, referência..."
                />

                <Text style={styles.sectionTitle}>
                  Opções de entrega
                </Text>

                <Option
                  title="Padrão • 40–60 min"
                  subtitle="R$ 7,00"
                  selected={shipping === 'Padrão'}
                  onPress={() => setShipping('Padrão')}
                />

                <Option
                  title="Expressa • 20–35 min"
                  subtitle="R$ 12,00"
                  selected={shipping === 'Expressa'}
                  onPress={() => setShipping('Expressa')}
                />

                <Option
                  title="Agendar • até 90 min"
                  subtitle="R$ 6,00"
                  selected={shipping === 'Agendar'}
                  onPress={() => setShipping('Agendar')}
                />
              </>
            ) : (
              <View style={styles.discountBanner}>
                <Text style={styles.optionTitle}>
                  Retirada no balcão
                </Text>
                <Text style={styles.muted}>
                  Retire seu pedido diretamente na pizzaria.
                  O frete será gratuito.
                </Text>
              </View>
            )}

            <Text style={styles.sectionTitle}>
              Forma de pagamento
            </Text>

            {[
              'PIX',
              'Cartão de crédito',
              'Cartão de débito',
              'Dinheiro',
            ].map(item => (
              <Option
                key={item}
                title={item}
                subtitle={
                  item === 'PIX'
                    ? '5% de desconto no subtotal'
                    : ''
                }
                selected={payment === item}
                onPress={() => setPayment(item)}
              />
            ))}

            {payment === 'PIX' && (
              <View style={styles.qrBox}>
                <Text style={styles.qrFake}>▦ ▦ ▦ ▦</Text>
                <Text style={styles.qrTitle}>
                  PIX demonstrativo
                </Text>
                <Text style={styles.qrDescription}>
                  QR Code ilustrativo. Nenhum pagamento real será realizado.
                </Text>
              </View>
            )}

            <Text style={styles.sectionTitle}>
              Resumo do pedido
            </Text>

            <View style={styles.summary}>
              <SummaryRow
                label="Subtotal"
                value={money(subtotal)}
              />

              <SummaryRow
                label="Entrega"
                value={money(shippingPrice)}
              />

              <SummaryRow
                label="Desconto PIX"
                value={`− ${money(discount)}`}
              />

              <View style={styles.summaryDivider} />

              <SummaryRow
                label="Total"
                value={money(total)}
                bold
              />
            </View>

            <Button
              title={`Confirmar pedido • ${money(total)}`}
              onPress={finishOrder}
              disabled={!payment || cepLoading}
            />

            {!payment && (
              <Text style={styles.errorText}>
                Selecione uma forma de pagamento para continuar.
              </Text>
            )}

            <Text style={styles.legal}>
              Pedido demonstrativo: nenhuma cobrança será realizada.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // TELA DE ACOMPANHAMENTO DA ENTREGA
  // IMPORTANTE: esta tela fica FORA da tela de pedidos.

  if (screen === 'tracking') {
    return (
      <TrackingScreen
        order={trackingOrder}
        onBack={() => setScreen('orders')}
      />
    );
  }

  // MEUS PEDIDOS

  if (screen === 'orders') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header
          title="Meus pedidos"
          onBack={() => setScreen('home')}
        />

        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>
            Seus pedidos 📦
          </Text>

          <Text style={styles.muted}>
            Pedidos realizados nesta sessão do aplicativo.
          </Text>

          {!orders.length ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyEmoji}>🍕</Text>

              <Text style={styles.pageTitle}>
                Ainda não há pedidos
              </Text>

              <Text style={styles.muted}>
                Quando finalizar uma compra, ela aparecerá aqui.
              </Text>

              <Button
                title="Escolher pizzas"
                onPress={() => setScreen('menu')}
              />
            </View>
          ) : (
            orders.map(order => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.sectionRow}>
                  <Text style={styles.orderId}>
                    Pedido #{order.id}
                  </Text>

                  <Text style={styles.orderStatus}>
                    ● {order.status}
                  </Text>
                </View>

                <Text style={styles.muted}>
                  {order.date} às {order.time}
                </Text>

                <View style={styles.summaryDivider} />

                {order.items.map((item, index) => (
                  <Text
                    key={`${order.id}-${index}`}
                    style={styles.orderItem}
                  >
                    {item.quantity}× {item.name} — {money(item.price * item.quantity)}
                  </Text>
                ))}

                <Text style={styles.muted}>
                  {order.delivery} • Pagamento: {order.payment}
                </Text>

                <Text style={styles.muted}>
                  Endereço: {order.address}
                </Text>

                <Text style={styles.priceLarge}>
                  {money(order.total)}
                </Text>

                {order.delivery === 'Entrega' && (
                  <Button
                    title="🛵 Acompanhar entrega"
                    onPress={() => {
                      setTrackingOrder(order);
                      setScreen('tracking');
                    }}
                  />
                )}
              </View>
            ))
          )}

          <Button
            title="Voltar ao cardápio"
            onPress={() => setScreen('menu')}
          />
        </ScrollView>

        <BottomNav
          screen={screen}
          cartCount={cartCount}
          setScreen={setScreen}
        />
      </SafeAreaView>
    );
  }

  // TELA ALTERNATIVA

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="d'Lucas Delivery"
        onBack={() => setScreen('home')}
      />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>
          Tela não encontrada
        </Text>

        <Button
          title="Voltar ao início"
          onPress={() => setScreen('home')}
        />
      </View>
    </SafeAreaView>
  );
}

// ESTILOS DO APLICATIVO

const styles = StyleSheet.create({
  safe:{
    flex:1,
    backgroundColor:BG,
  },
  page:{
    padding:20,
    paddingBottom:35,
    maxWidth:850,
    width:'100%',
    alignSelf:'center',
  },
  header:{
    height:68,
    backgroundColor:ORANGE,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:18,
    justifyContent:'space-between',
  },
  backButton:{
    width:40,
    height:40,
    justifyContent:'center',
  },
  backText:{
    color:'#FFF',
    fontSize:35,
  },
  headerTitle:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'900',
  },
  headerLogo:{
    fontSize:26,
  },
  pageTitle:{
    color:'#202020',
    fontSize:25,
    fontWeight:'900',
    marginTop:8,
    marginBottom:8,
  },
  muted:{
    color:'#777',
    fontSize:13,
    lineHeight:19,
  },
  link:{
    color:ORANGE,
    fontWeight:'800',
    fontSize:13,
    marginTop:10,
  },
  button:{
    minHeight:52,
    backgroundColor:ORANGE,
    borderRadius:13,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:18,
    marginTop:14,
  },
  buttonText:{
    color:'#FFF',
    fontSize:15,
    fontWeight:'900',
  },
  buttonSecondary:{
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#DDD',
  },
  buttonTextSecondary:{
    color:'#333',
  },
  buttonDisabled:{
    backgroundColor:'#B9B9B9',
    opacity:0.7,
  },
  fieldWrap:{
    marginTop:17,
  },
  fieldLabel:{
    color:'#333',
    fontWeight:'800',
    marginBottom:7,
    fontSize:13,
  },
  input:{
    minHeight:48,
    borderWidth:1,
    borderColor:'#E0E0E0',
    backgroundColor:'#FFF',
    borderRadius:11,
    paddingHorizontal:13,
    color:'#222',
    fontSize:14,
  },
  inputError:{
    borderColor:'#D32F2F',
  },
  errorText:{
    color:'#D32F2F',
    fontSize:12,
    marginTop:5,
  },
  homeHeader:{
    backgroundColor:ORANGE,
    borderRadius:18,
    padding:18,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:18,
  },
  smallWhite:{
    color:'#FFE0CD',
    fontSize:10,
    fontWeight:'800',
    letterSpacing:1,
  },
  addressText:{
    color:'#FFF',
    fontSize:14,
    fontWeight:'800',
    marginTop:6,
  },
  cartCircle:{
    backgroundColor:'#FFF',
    borderRadius:25,
    padding:11,
  },
  cartCircleText:{
    color:ORANGE,
    fontWeight:'900',
  },
  search:{
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#E7E7E7',
    borderRadius:13,
    minHeight:49,
    paddingHorizontal:14,
    color:'#222',
    marginTop:16,
    marginBottom:18,
  },
  banner:{
    backgroundColor:'#25211F',
    borderRadius:18,
    padding:22,
    marginBottom:25,
  },
  bannerEyebrow:{
    color:'#FFB17F',
    fontSize:10,
    fontWeight:'900',
    letterSpacing:2,
  },
  bannerTitle:{
    color:'#FFF',
    fontSize:27,
    fontWeight:'900',
    marginTop:10,
  },
  bannerText:{
    color:'#DDD',
    fontSize:14,
    marginTop:6,
  },
  sectionTitle:{
    color:'#242424',
    fontSize:19,
    fontWeight:'900',
    marginTop:22,
    marginBottom:13,
  },
  sectionRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:15,
    marginBottom:10,
  },
  mood:{
    width:105,
    height:95,
    borderRadius:15,
    backgroundColor:'#FFF',
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
    borderWidth:1,
    borderColor:'#EEE',
  },
  moodEmoji:{
    fontSize:26,
    marginBottom:8,
  },
  moodText:{
    fontSize:12,
    fontWeight:'800',
    color:'#333',
  },
  categoryGrid:{
    flexDirection:'row',
    flexWrap:'wrap',
    gap:10,
  },
  categoryTile:{
    width:'48%',
    flexGrow:1,
    minHeight:120,
    borderRadius:15,
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#EEE',
    padding:15,
  },
  categoryEmoji:{
    fontSize:26,
    marginBottom:9,
  },
  categoryName:{
    fontSize:15,
    fontWeight:'900',
    color:'#222',
    marginBottom:4,
  },
  menuHeader:{
    paddingHorizontal:20,
    paddingVertical:12,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  categoryScroll:{
    paddingHorizontal:14,
    paddingBottom:4,
  },
  categoryChip:{
    borderRadius:25,
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#E6E6E6',
    paddingHorizontal:16,
    paddingVertical:10,
    marginRight:8,
  },
  categoryChipActive:{
    backgroundColor:ORANGE,
    borderColor:ORANGE,
  },
  categoryChipText:{
    color:'#444',
    fontWeight:'800',
    fontSize:12,
  },
  categoryChipTextActive:{
    color:'#FFF',
  },
  searchWrap:{
    paddingHorizontal:20,
  },
  productCard:{
    backgroundColor:'#FFF',
    borderRadius:16,
    marginTop:13,
    overflow:'hidden',
    borderWidth:1,
    borderColor:'#EEE',
  },
  productImage:{
    width:'100%',
    height:175,
    backgroundColor:'#E8E8E8',
  },
  productInfo:{
    padding:14,
  },
  productTitleRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap:10,
  },
  productName:{
    color:'#222',
    fontSize:16,
    fontWeight:'900',
    flexShrink:1,
  },
  rating:{
    color:'#A45B00',
    fontWeight:'900',
    fontSize:12,
  },
  productDescription:{
    color:'#777',
    fontSize:13,
    lineHeight:19,
    marginTop:7,
  },
  productBottom:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:13,
    gap:10,
  },
  price:{
    color:ORANGE,
    fontSize:17,
    fontWeight:'900',
  },
  addButton:{
    backgroundColor:ORANGE,
    paddingHorizontal:14,
    paddingVertical:10,
    borderRadius:10,
  },
  addButtonText:{
    color:'#FFF',
    fontWeight:'900',
    fontSize:12,
  },
  bottomNav:{
    flexDirection:'row',
    backgroundColor:'#FFF',
    borderTopWidth:1,
    borderTopColor:'#E8E8E8',
    minHeight:66,
    alignItems:'center',
    justifyContent:'space-around',
    paddingHorizontal:4,
  },
  navItem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:7,
  },
  navIcon:{
    color:'#777',
    fontSize:19,
  },
  navLabel:{
    color:'#777',
    fontSize:10,
    fontWeight:'700',
    marginTop:4,
    textAlign:'center',
  },
  navActive:{
    color:ORANGE,
    fontWeight:'900',
  },
  detailImage:{
    width:'100%',
    height:245,
    borderRadius:17,
    backgroundColor:'#E8E8E8',
    marginBottom:15,
  },
  priceLarge:{
    color:ORANGE,
    fontSize:23,
    fontWeight:'900',
    marginTop:12,
    marginBottom:5,
  },
  option:{
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#E6E6E6',
    borderRadius:12,
    padding:15,
    marginTop:9,
    flexDirection:'row',
    alignItems:'center',
  },
  optionSelected:{
    borderColor:ORANGE,
    backgroundColor:'#FFF6F0',
  },
  optionTitle:{
    color:'#292929',
    fontWeight:'900',
    fontSize:14,
    marginBottom:4,
  },
  radio:{
    fontSize:20,
    color:'#BBB',
    marginLeft:12,
  },
  radioSelected:{
    color:ORANGE,
  },
  quantityRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:13,
    marginTop:10,
    marginBottom:12,
  },
  quantityButton:{
    width:42,
    height:42,
    backgroundColor:'#FFF',
    borderRadius:12,
    borderWidth:1,
    borderColor:'#E0E0E0',
    alignItems:'center',
    justifyContent:'center',
  },
  quantityButtonText:{
    color:ORANGE,
    fontSize:24,
    fontWeight:'900',
  },
  quantityNumber:{
    color:'#222',
    fontSize:16,
    fontWeight:'900',
  },
  discountBanner:{
    backgroundColor:'#FFF0E6',
    borderRadius:14,
    padding:16,
    marginBottom:15,
  },
  discountTitle:{
    color:'#A94700',
    fontSize:15,
    fontWeight:'900',
    marginBottom:6,
  },
  emptyWrap:{
    alignItems:'center',
    paddingVertical:38,
  },
  emptyEmoji:{
    fontSize:50,
    marginBottom:10,
  },
  empty:{
    color:'#777',
    textAlign:'center',
    marginTop:30,
    fontSize:15,
  },
  cartItem:{
    flexDirection:'row',
    alignItems:'center',
    gap:12,
    backgroundColor:'#FFF',
    padding:12,
    borderRadius:14,
    marginTop:12,
  },
  cartImage:{
    width:86,
    height:86,
    borderRadius:12,
    backgroundColor:'#EEE',
  },
  smallQty:{
    width:28,
    height:28,
    borderRadius:8,
    backgroundColor:'#FFF0E6',
    alignItems:'center',
    justifyContent:'center',
  },
  removeText:{
    color:'#B3261E',
    fontSize:11,
    fontWeight:'800',
  },
  summary:{
    backgroundColor:'#FFF',
    borderRadius:14,
    padding:16,
    marginTop:20,
  },
  summaryRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:7,
    gap:12,
  },
  summaryLabel:{
    color:'#777',
    fontSize:13,
  },
  summaryValue:{
    color:'#333',
    fontSize:13,
    fontWeight:'700',
  },
  summaryBold:{
    color:'#222',
    fontSize:16,
    fontWeight:'900',
  },
  summaryDivider:{
    height:1,
    backgroundColor:'#EEE',
    marginVertical:10,
  },
  segmentRow:{
    flexDirection:'row',
    gap:10,
    marginTop:14,
  },
  segment:{
    flex:1,
    padding:14,
    borderRadius:12,
    alignItems:'center',
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#E6E6E6',
  },
  segmentActive:{
    backgroundColor:ORANGE,
    borderColor:ORANGE,
  },
  segmentText:{
    color:'#333',
    fontWeight:'900',
  },
  segmentTextActive:{
    color:'#FFF',
  },
  stepLabel:{
    color:ORANGE,
    fontSize:11,
    fontWeight:'900',
    letterSpacing:1.4,
    marginTop:10,
  },
  qrBox:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#202020',
    borderRadius:15,
    padding:24,
    marginTop:16,
  },
  qrFake:{
    color:'#FFF',
    fontSize:35,
    letterSpacing:3,
    marginBottom:12,
  },
  qrTitle:{
    color:'#FFF',
    fontWeight:'900',
    fontSize:16,
    marginBottom:6,
  },
  qrDescription:{
    color:'#DDD',
    fontSize:12,
    textAlign:'center',
  },
  legal:{
    color:'#888',
    textAlign:'center',
    fontSize:11,
    marginTop:12,
    lineHeight:17,
  },
  orderCard:{
    backgroundColor:'#FFF',
    borderRadius:15,
    padding:16,
    marginTop:15,
    borderWidth:1,
    borderColor:'#EEE',
  },
  orderId:{
    color:'#222',
    fontSize:16,
    fontWeight:'900',
  },
  orderStatus:{
    color:'#27864A',
    fontSize:12,
    fontWeight:'900',
  },
  orderItem:{
    color:'#444',
    fontSize:13,
    marginBottom:8,
  },
  authSwitch:{
    alignItems:'center',
    padding:14,
  },
  cepLoading:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginTop:10,
  },
  cepSuccess:{
    backgroundColor:'#EAF7EE',
    borderRadius:10,
    padding:12,
    marginTop:12,
  },
  cepSuccessTitle:{
    color:'#237A40',
    fontWeight:'900',
    marginBottom:4,
  },
});