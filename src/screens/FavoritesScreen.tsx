import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { withAuth } from '../services/api';
import { ProductCard } from '../components';

export default function FavoritesScreen({ navigation }: any) {
  const { token } = useAuth();
  const api = withAuth(token);
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await api.get('/favorites');
    setItems(data.products || []);
  }

  useEffect(() => { if (token) load(); }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            onAddToCart={() => navigation.navigate('Carrinho')}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>Sem favoritos</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
