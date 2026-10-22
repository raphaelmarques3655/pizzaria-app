
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import WelcomeScreen from './scr/screens/WelcomeScreen';

const ORANGE = '#FF6600';
const BG = '#F7F7F7';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Calabresa Especial',
    category: 'Pizzas',
    description: 'Calabresa, cebola, muçarela e orégano',
    price: 39.9,
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p2',
    name: 'Frango com Catupiry',
    category: 'Pizzas',
    description: 'Frango temperado, catupiry e muçarela',
    price: 44.9,
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p3',
    name: 'Quatro Queijos',
    category: 'Pizzas',
    description: 'Muçarela, provolone, parmesão e gorgonzola',
    price: 47.9,
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p4',
    name: 'Portuguesa',
    category: 'Pizzas',
    description: 'Presunto, ovo, cebola, azeitona e queijo',
    price: 45.9,
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p5',
    name: 'Margherita',
    category: 'Pizzas',
    description: 'Tomate, manjericão fresco e muçarela',
    price: 39.9,
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p6',
    name: 'Pepperoni',
    category: 'Pizzas',
    description: 'Pepperoni especial e queijo derretido',
    price: 49.9,
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p7',
    name: 'Bacon Crocante',
    category: 'Pizzas',
    description: 'Bacon, muçarela e toque de barbecue',
    price: 46.9,
    emoji: '🥓',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'p8',
    name: 'Moda da Casa',
    category: 'Pizzas',
    description: 'Uma combinação especial do chef',
    price: 52.9,
    emoji: '⭐',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'd1',
    name: 'Pizza de Chocolate',
    category: 'Doces',
    description: 'Chocolate cremoso e granulado',
    price: 36.9,
    emoji: '🍫',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'd2',
    name: 'Pizza de Banana',
    category: 'Doces',
    description: 'Banana, canela e leite condensado',
    price: 34.9,
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 's1',
    name: 'Brownie',
    category: 'Sobremesas',
    description: 'Brownie de chocolate com calda',
    price: 14.9,
    emoji: '🍫',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 's2',
    name: 'Petit Gâteau',
    category: 'Sobremesas',
    description: 'Bolinho quente com recheio cremoso',
    price: 19.9,
    emoji: '🍰',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'b1',
    name: 'Coca-Cola 2 L',
    category: 'Bebidas',
    description: 'Refrigerante gelado para compartilhar',
    price: 13.9,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'b2',
    name: 'Guaraná 2 L',
    category: 'Bebidas',
    description: 'Refrigerante de guaraná',
    price: 11.9,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'b3',
    name: 'Água mineral',
    category: 'Bebidas',
    description: 'Água mineral sem gás, 500 ml',
    price: 4.5,
    emoji: '💧',
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=700&q=80',
  },
];

const CATEGORIES = [
  'Todos',
  'Pizzas',
  'Doces',
  'Sobremesas',
  'Bebidas',
];

const money = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Grande');
  const [flavor, setFlavor] = useState('Tradicional');
  const [delivery, setDelivery] = useState('Entrega');
  const [shipping, setShipping] = useState('Padrão');
  const [payment, setPayment] = useState('PIX');
  const [customer, setCustomer] = useState({
    name: 'Raphael Marques',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingPrice =
    delivery === 'Retirada'
      ? 0
      : shipping === 'Expressa'
      ? 12
      : shipping === 'Agendar'
      ? 6
      : 7;

  const discount = payment === 'PIX' ? subtotal * 0.05 : 0;
  const total = Math.max(0, subtotal + shippingPrice - discount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product, amount = 1, chosenSize = '', chosenFlavor = '') {
    const sizeExtra =
      chosenSize === 'Média' ? 0 :
      chosenSize === 'Grande' ? 8 :
      chosenSize === 'Família' ? 16 : 0;

    const itemPrice = product.price + sizeExtra;
    const key = `${product.id}-${chosenSize}-${chosenFlavor}`;

    setCart((current) => {
      const existing = current.find((item) => item.key === key);

      if (existing) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          key,
          price: itemPrice,
          quantity: amount,
          chosenSize,
          chosenFlavor,
        },
      ];
    });

    setScreen('menu');
    Alert.alert('Adicionado!', `${product.name} foi para o carrinho.`);
  }

  function changeQuantity(key, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setQuantity(1);
    setSize('Grande');
    setFlavor('Tradicional');
    setScreen('product');
  }

  function finishOrder() {
    if (!cart.length) {
      Alert.alert('Carrinho vazio', 'Adicione algo antes de continuar.');
      setScreen('menu');
      return;
    }

    const order = {
      id: String(Date.now()).slice(-7),
      date: new Date().toLocaleString('pt-BR'),
      items: cart.map((item) => ({ ...item })),
      total,
      payment,
      delivery,
      shipping: delivery === 'Retirada' ? 0 : shippingPrice,
      customer: { ...customer },
      status: 'Pedido recebido',
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    setScreen('orders');

    Alert.alert(
      'Pedido confirmado!',
      `Seu pedido #${order.id} foi registrado neste aplicativo.`
    );
  }

  function Header({ title, back = 'home' }) {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen(back)}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerLogo}>🍕</Text>
      </View>
    );
  }

  function Button({ title, onPress, secondary = false }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.button, secondary && styles.buttonSecondary]}
      >
        <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function ProductCard({ product }) {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity onPress={() => openProduct(product)}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.productInfo}>
          <View style={styles.productTitleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.rating}>★ 4.8</Text>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.productBottom}>
            <Text style={styles.price}>{money(product.price)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(product)}
            >
              <Text style={styles.addButtonText}>+ Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function BottomNav() {
    return (
      <View style={styles.bottomNav}>
        {[
          ['home', '⌂', 'Início'],
          ['menu', '🍕', 'Cardápio'],
          ['cart', '🛒', `Carrinho${cartCount ? ` (${cartCount})` : ''}`],
          ['orders', '📦', 'Meus pedidos'],
        ].map(([id, icon, label]) => (
          <TouchableOpacity
            key={id}
            style={styles.navItem}
            onPress={() => setScreen(id)}
          >
            <Text style={[styles.navIcon, screen === id && styles.navActive]}>
              {icon}
            </Text>
            <Text style={[styles.navLabel, screen === id && styles.navActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function ProductList({ items }) {
    return (
      <View>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    );
  }

  function Field({ label, value, onChangeText, placeholder }) {
    return (
      <View style={styles.fieldWrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor="#999"
        />
      </View>
    );
  }

  function Option({ title, selected, onPress, subtitle }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.option, selected && styles.optionSelected]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.muted}>{subtitle}</Text> : null}
        </View>
        <Text style={[styles.radio, selected && styles.radioSelected]}>
          {selected ? '●' : '○'}
        </Text>
      </TouchableOpacity>
    );
  }

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        onLogin={() => setScreen('login')}
        onRegister={() => setScreen('register')}
        onContinueGuest={() => setScreen('home')}
      />
    );
  }

  if (screen === 'login' || screen === 'register') {
    const registering = screen === 'register';

    return (
      <SafeAreaView style={styles.safe}>
        <Header title={registering ? 'Criar conta' : 'Entrar'} back="welcome" />
        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>
            {registering ? 'Faça seu cadastro' : 'Que bom ter você de volta!'}
          </Text>
          <Text style={styles.muted}>
            {registering
              ? 'Seus dados ficam apenas nesta demonstração.'
              : 'Entre para continuar seu pedido.'}
          </Text>

          {registering && (
            <Field
              label="Nome completo"
              value={customer.name}
              onChangeText={(v) => setCustomer({ ...customer, name: v })}
            />
          )}

          <Field label="E-mail" placeholder="voce@email.com" />
          {registering && (
            <Field
              label="Telefone"
              value={customer.phone}
              onChangeText={(v) => setCustomer({ ...customer, phone: v })}
            />
          )}
          {registering && <Field label="CPF" placeholder="000.000.000-00" />}
          <Field label="Senha" placeholder="Digite sua senha" />

          {!registering && (
            <TouchableOpacity
              onPress={() => Alert.alert('Recuperação', 'Demonstração local: não enviamos e-mails.')}
            >
              <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>
          )}

          <Button
            title={registering ? 'Criar conta' : 'Entrar'}
            onPress={() => {
              Alert.alert(
                registering ? 'Cadastro demonstrativo' : 'Login demonstrativo',
                'Acesso simulado com sucesso!'
              );
              setScreen('home');
            }}
          />
          <Button
            title={registering ? 'Já tenho conta' : 'Continuar sem conta'}
            secondary
            onPress={() => setScreen(registering ? 'login' : 'home')}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.homeHeader}>
            <View>
              <Text style={styles.smallWhite}>SEU ENDEREÇO</Text>
              <Text style={styles.addressText}>📍 {customer.address}</Text>
            </View>
            <TouchableOpacity onPress={() => setScreen('cart')} style={styles.cartCircle}>
              <Text style={styles.cartCircleText}>🛒 {cartCount}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>Olá! Bora comer bem? 🍕</Text>
          <Text style={styles.muted}>Seu próximo momento delicioso começa aqui.</Text>

          <TextInput
            style={styles.search}
            placeholder="🔎  Buscar pizza, bebida, sobremesa..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => setScreen('menu')}
          />

          <View style={styles.banner}>
            <Text style={styles.bannerEyebrow}>D'LUCAS DELIVERY</Text>
            <Text style={styles.bannerTitle}>Hoje merece pizza!</Text>
            <Text style={styles.bannerText}>Seu sabor favorito está esperando.</Text>
            <Button title="Ver cardápio →" onPress={() => setScreen('menu')} />
          </View>

          <Text style={styles.sectionTitle}>Como você está hoje?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              ['😋', 'Com fome'],
              ['⚡', 'Animado'],
              ['😴', 'Cansado'],
              ['🥳', 'Comemorando'],
            ].map(([emoji, label]) => (
              <TouchableOpacity
                key={label}
                style={styles.mood}
                onPress={() => {
                  setCategory('Todos');
                  setSearch('');
                  setScreen('menu');
                }}
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

          <ProductList items={PRODUCTS.slice(0, 3)} />

          <Text style={styles.sectionTitle}>Explore o cardápio</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.slice(1).map((item) => (
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
                  {item === 'Pizzas' ? '🍕' : item === 'Doces' ? '🍫' : item === 'Sobremesas' ? '🍰' : '🥤'}
                </Text>
                <Text style={styles.categoryName}>{item}</Text>
                <Text style={styles.muted}>
                  {PRODUCTS.filter((p) => p.category === item).length} opções
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  if (screen === 'menu') {
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category;
      const term = search.toLowerCase();
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.categoryChip, category === item && styles.categoryChipActive]}
              >
                <Text style={[styles.categoryChipText, category === item && styles.categoryChipTextActive]}>
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
          />
        </View>

        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.muted}>{filtered.length} produtos encontrados</Text>
          {filtered.length ? (
            <ProductList items={filtered} />
          ) : (
            <Text style={styles.empty}>Não encontramos esse produto.</Text>
          )}
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  if (screen === 'product' && selectedProduct) {
    const extra = size === 'Média' ? 0 : size === 'Grande' ? 8 : 16;
    const productTotal = (selectedProduct.price + extra) * quantity;

    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Detalhes do produto" back="menu" />
        <ScrollView contentContainerStyle={styles.page}>
          <Image
            source={{ uri: selectedProduct.image }}
            style={styles.detailImage}
            resizeMode="cover"
          />
          <Text style={styles.pageTitle}>{selectedProduct.name}</Text>
          <Text style={styles.muted}>{selectedProduct.description}</Text>
          <Text style={styles.priceLarge}>{money(selectedProduct.price + extra)}</Text>

          <Text style={styles.sectionTitle}>Escolha o sabor</Text>
          {['Tradicional', 'Borda recheada (+ R$ 6,00)'].map((item) => (
            <Option
              key={item}
              title={item}
              selected={flavor === item}
              onPress={() => setFlavor(item)}
            />
          ))}

          <Text style={styles.sectionTitle}>Tamanho</Text>
          {[
            ['Média', 'Preço base'],
            ['Grande', '+ R$ 8,00'],
            ['Família', '+ R$ 16,00'],
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
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Button
            title={`Adicionar • ${money(productTotal + (flavor.startsWith('Borda') ? 6 * quantity : 0))}`}
            onPress={() => {
              const product = {
                ...selectedProduct,
                price: selectedProduct.price + (flavor.startsWith('Borda') ? 6 : 0),
              };
              addToCart(product, quantity, size, flavor);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'cart') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Meu carrinho" back="menu" />
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.discountBanner}>
            <Text style={styles.discountTitle}>🎉 Economize no seu pedido</Text>
            <Text style={styles.muted}>Ganhe 5% de desconto escolhendo PIX no pagamento.</Text>
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.pageTitle}>Seu carrinho está vazio</Text>
              <Text style={styles.muted}>Que tal escolher uma pizza deliciosa?</Text>
              <Button title="Explorar cardápio" onPress={() => setScreen('menu')} />
            </View>
          ) : (
            <>
              {cart.map((item) => (
                <View style={styles.cartItem} key={item.key}>
                  <Image source={{ uri: item.image }} style={styles.cartImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.muted}>
                      {item.chosenSize || 'Porção padrão'} • {item.chosenFlavor || item.category}
                    </Text>
                    <Text style={styles.price}>{money(item.price * item.quantity)}</Text>
                    <View style={styles.quantityRow}>
                      <TouchableOpacity style={styles.smallQty} onPress={() => changeQuantity(item.key, -1)}>
                        <Text>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityNumber}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.smallQty} onPress={() => changeQuantity(item.key, 1)}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => changeQuantity(item.key, -item.quantity)}>
                    <Text style={styles.removeText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.summary}>
                <SummaryRow label="Subtotal" value={money(subtotal)} />
                <SummaryRow label="Entrega padrão" value={money(7)} />
                <SummaryRow label="Desconto PIX" value={`− ${money(subtotal * 0.05)}`} />
                <View style={styles.summaryDivider} />
                <SummaryRow label="Total estimado" value={money(subtotal + 7 - subtotal * 0.05)} bold />
              </View>

              <Button title="Continuar para entrega →" onPress={() => setScreen('checkout')} />
              <Button title="Continuar comprando" secondary onPress={() => setScreen('menu')} />
            </>
          )}
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  if (screen === 'checkout') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Finalizar pedido" back="cart" />
        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.stepLabel}>ETAPA 1 DE 4</Text>
          <Text style={styles.pageTitle}>Como quer receber?</Text>

          <View style={styles.segmentRow}>
            {['Entrega', 'Retirada'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.segment, delivery === item && styles.segmentActive]}
                onPress={() => setDelivery(item)}
              >
                <Text style={[styles.segmentText, delivery === item && styles.segmentTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {delivery === 'Entrega' ? (
            <>
              <Field
                label="Nome completo"
                value={customer.name}
                onChangeText={(v) => setCustomer({ ...customer, name: v })}
              />
              <Field
                label="Telefone"
                value={customer.phone}
                onChangeText={(v) => setCustomer({ ...customer, phone: v })}
              />
              <Field
                label="Endereço"
                value={customer.address}
                onChangeText={(v) => setCustomer({ ...customer, address: v })}
              />

              <Text style={styles.sectionTitle}>Opções de entrega</Text>
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
              <Text style={styles.optionTitle}>Retirada no balcão</Text>
              <Text style={styles.muted}>Rua das Pizzas, 100 • Frete grátis</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Forma de pagamento</Text>
          {['PIX', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'].map((item) => (
            <Option
              key={item}
              title={item}
              subtitle={item === 'PIX' ? '5% de desconto no subtotal' : ''}
              selected={payment === item}
              onPress={() => setPayment(item)}
            />
          ))}

          {payment === 'PIX' && (
            <View style={styles.qrBox}>
              <Text style={styles.qrFake}>▦ ▦ ▦ ▦</Text>
              <Text style={styles.qrTitle}>PIX demonstrativo</Text>
              <Text style={styles.muted}>Este bloco é ilustrativo e não recebe pagamentos.</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Resumo</Text>
          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={money(subtotal)} />
            <SummaryRow label="Entrega" value={money(shippingPrice)} />
            <SummaryRow label="Desconto PIX" value={`− ${money(discount)}`} />
            <View style={styles.summaryDivider} />
            <SummaryRow label="Total" value={money(total)} bold />
          </View>

          <Button title={`Confirmar pedido • ${money(total)}`} onPress={finishOrder} />
          <Text style={styles.legal}>
            Pedido demonstrativo: nenhuma cobrança será realizada.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'orders') {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Meus pedidos" back="home" />
        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>Seus pedidos 📦</Text>
          <Text style={styles.muted}>Pedidos feitos nesta sessão do aplicativo.</Text>

          {orders.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyEmoji}>🍕</Text>
              <Text style={styles.pageTitle}>Ainda não há pedidos</Text>
              <Text style={styles.muted}>
                Quando você finalizar uma compra, ela aparecerá aqui.
              </Text>
              <Button title="Escolher pizzas" onPress={() => setScreen('menu')} />
            </View>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.sectionRow}>
                  <Text style={styles.orderId}>Pedido #{order.id}</Text>
                  <Text style={styles.orderStatus}>● Recebido</Text>
                </View>
                <Text style={styles.muted}>{order.date}</Text>
                <View style={styles.summaryDivider} />
                {order.items.map((item, index) => (
                  <Text style={styles.orderItem} key={`${order.id}-${index}`}>
                    {item.quantity}× {item.name} — {money(item.price * item.quantity)}
                  </Text>
                ))}
                <Text style={styles.muted}>
                  {order.delivery} • Pagamento: {order.payment}
                </Text>
                <Text style={styles.priceLarge}>{money(order.total)}</Text>
                <Text style={styles.muted}>
                  {order.customer.name} • {order.customer.address}
                </Text>
              </View>
            ))
          )}

          <Button title="Voltar ao cardápio" onPress={() => setScreen('menu')} />
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="d'Lucas Delivery" back="home" />
      <View style={styles.page}>
        <Text style={styles.pageTitle}>Tela não encontrada</Text>
        <Button title="Voltar ao início" onPress={() => setScreen('home')} />
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.summaryBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  page: {
    padding: 20,
    paddingBottom: 35,
    maxWidth: 850,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    height: 68,
    backgroundColor: ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 35,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  headerLogo: {
    fontSize: 26,
  },
  pageTitle: {
    color: '#202020',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 8,
  },
  muted: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 19,
  },
  link: {
    color: ORANGE,
    fontWeight: '800',
    fontSize: 13,
  },
  button: {
    minHeight: 52,
    backgroundColor: ORANGE,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  buttonTextSecondary: {
    color: '#333333',
  },
  fieldWrap: {
    marginTop: 17,
  },
  fieldLabel: {
    color: '#333333',
    fontWeight: '800',
    marginBottom: 7,
    fontSize: 13,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    paddingHorizontal: 13,
    color: '#222222',
    fontSize: 14,
  },
  homeHeader: {
    backgroundColor: ORANGE,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  smallWhite: {
    color: '#FFE0CD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  addressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 6,
  },
  cartCircle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 11,
  },
  cartCircleText: {
    color: ORANGE,
    fontWeight: '900',
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 13,
    minHeight: 49,
    paddingHorizontal: 14,
    color: '#222222',
    marginTop: 16,
    marginBottom: 18,
  },
  banner: {
    backgroundColor: '#25211F',
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
  },
  bannerEyebrow: {
    color: '#FFB17F',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 10,
  },
  bannerText: {
    color: '#DDDDDD',
    fontSize: 14,
    marginTop: 6,
  },
  sectionTitle: {
    color: '#242424',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 22,
    marginBottom: 13,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  mood: {
    width: 105,
    height: 95,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  moodEmoji: {
    fontSize: 26,
    marginBottom: 8,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#333333',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryTile: {
    width: '48%',
    flexGrow: 1,
    minHeight: 120,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 15,
  },
  categoryEmoji: {
    fontSize: 26,
    marginBottom: 9,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#222222',
    marginBottom: 4,
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryScroll: {
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  categoryChip: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  categoryChipText: {
    color: '#444444',
    fontWeight: '800',
    fontSize: 12,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  searchWrap: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 13,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  productImage: {
    width: '100%',
    height: 175,
    backgroundColor: '#E8E8E8',
  },
  productInfo: {
    padding: 14,
  },
  productTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  productName: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '900',
    flexShrink: 1,
  },
  rating: {
    color: '#A45B00',
    fontWeight: '900',
    fontSize: 12,
  },
  productDescription: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
    gap: 10,
  },
  price: {
    color: ORANGE,
    fontSize: 17,
    fontWeight: '900',
  },
  addButton: {
    backgroundColor: ORANGE,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    minHeight: 66,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  navIcon: {
    color: '#777777',
    fontSize: 19,
  },
  navLabel: {
    color: '#777777',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  navActive: {
    color: ORANGE,
    fontWeight: '900',
  },
  detailImage: {
    width: '100%',
    height: 245,
    borderRadius: 17,
    backgroundColor: '#E8E8E8',
    marginBottom: 15,
  },
  priceLarge: {
    color: ORANGE,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 12,
    marginBottom: 5,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 15,
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: ORANGE,
    backgroundColor: '#FFF6F0',
  },
  optionTitle: {
    color: '#292929',
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 4,
  },
  radio: {
    fontSize: 20,
    color: '#BBBBBB',
    marginLeft: 12,
  },
  radioSelected: {
    color: ORANGE,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginTop: 10,
    marginBottom: 12,
  },
  quantityButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: ORANGE,
    fontSize: 24,
    fontWeight: '900',
  },
  quantityNumber: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '900',
  },
  discountBanner: {
    backgroundColor: '#FFF0E6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
  },
  discountTitle: {
    color: '#A94700',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 38,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  empty: {
    color: '#777777',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
  },
  cartImage: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
  },
  smallQty: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#B3261E',
    fontSize: 11,
    fontWeight: '800',
  },
  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    gap: 12,
  },
  summaryLabel: {
    color: '#777777',
    fontSize: 13,
  },
  summaryValue: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryBold: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '900',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  segment: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  segmentActive: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  segmentText: {
    color: '#333333',
    fontWeight: '900',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    color: ORANGE,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginTop: 10,
  },
  qrBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    borderRadius: 15,
    padding: 24,
    marginTop: 16,
  },
  qrFake: {
    color: '#FFFFFF',
    fontSize: 35,
    letterSpacing: 3,
    marginBottom: 12,
  },
  qrTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 6,
  },
  legal: {
    color: '#888888',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 12,
    lineHeight: 17,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  orderId: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '900',
  },
  orderStatus: {
    color: '#27864A',
    fontSize: 12,
    fontWeight: '900',
  },
  orderItem: {
    color: '#444444',
    fontSize: 13,
    marginBottom: 8,
  },
});
