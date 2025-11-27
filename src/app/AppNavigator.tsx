import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductCreateScreen from '../screens/ProductCreateScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { appTheme, colors } from '../theme';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const paperTheme = appTheme;

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1f2937',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#111827',
    border: '#e5e7eb',
  },
};

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e5e7eb', height: 64, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ color, size }) => {
          const map: any = {
            Home: 'home',
            Busca: 'search',
            Categorias: 'grid',
            Favoritos: 'heart',
            Carrinho: 'cart',
            Perfil: 'person',
          };
          const name = map[route.name] || 'ellipse';
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Busca" component={SearchScreen} />
      <Tabs.Screen name="Categorias" component={CategoriesScreen} />
      <Tabs.Screen name="Favoritos" component={FavoritesScreen} />
      <Tabs.Screen name="Carrinho" component={CartScreen} />
      <Tabs.Screen name="Perfil" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

function RootNavigator() {
  const { token } = useAuth();
  return (
    <Stack.Navigator screenOptions={{
      headerShadowVisible: false,
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: colors.text, fontWeight: '700' },
      contentStyle: { backgroundColor: '#f6f7fb' },
    }}>
      {!token ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar conta' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Detalhes' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
          <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Pedidos' }} />
          <Stack.Screen name="ProductCreate" component={ProductCreateScreen} options={{ title: 'Cadastrar Produto' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <PaperProvider theme={paperTheme}>
      <AuthProvider>
        <NavigationContainer theme={navTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
