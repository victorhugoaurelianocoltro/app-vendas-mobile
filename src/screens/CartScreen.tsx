import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { withAuth } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getObject, saveObject } from '../services/storage';

export default function CartScreen({ navigation }: any) {
  const { token } = useAuth();
  const api = withAuth(token);
  const [cart, setCart] = useState<any>(null);

  async function load() {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
      await saveObject('cart', data);
    } catch (e) {
      const cached = await getObject<any>('cart');
      if (cached) setCart(cached);
    }
  }

  useEffect(() => { if (token) load(); }, [token]);

  async function increment(item: any) {
    await api.patch(`/cart/items/${item.id}`, { quantity: item.quantity + 1 });
    await load();
  }
  async function decrement(item: any) {
    if (item.quantity <= 1) return;
    await api.patch(`/cart/items/${item.id}`, { quantity: item.quantity - 1 });
    await load();
  }
  async function removeItem(item: any) {
    await api.delete(`/cart/items/${item.id}`);
    await load();
  }

  const total = cart?.items?.reduce((s: number, it: any) => s + it.price * it.quantity, 0) || 0;

  return (
    <SafeAreaView style={styles.container}>
      {!token ? (
        <View style={{ padding: 16 }}>
          <Text>Faça login para acessar o carrinho.</Text>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ padding: 12 }}
            data={cart?.items || []}
            keyExtractor={(it) => String(it.id)}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleSmall">{item.title}</Text>
                  <Text>R$ {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.qty}>
                  <IconButton icon="minus" onPress={() => decrement(item)} />
                  <Text>{item.quantity}</Text>
                  <IconButton icon="plus" onPress={() => increment(item)} />
                </View>
                <IconButton icon="delete" onPress={() => removeItem(item)} />
              </View>
            )}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>Carrinho vazio</Text>}
          />
          <View style={styles.footer}>
            <Text variant="titleMedium">Total: R$ {total.toFixed(2)}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Checkout')}>Finalizar</Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  qty: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
