import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { api } from '../services/api';
import { ProductCard } from '../components';

export default function CategoriesScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/products/categories/list');
        setCategories(data.map((c: any) => c.name ? c.name : c));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/category/${encodeURIComponent(selected)}`);
        setItems(data.products || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={{ padding: 12 }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>Categorias</Text>
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(c) => String(c)}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelected(item)} style={[styles.cat, selected === item && styles.catActive]}>
                  <Text style={{ color: selected === item ? '#fff' : '#111827' }}>{item}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
        data={items}
        contentContainerStyle={{ padding: 12 }}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            onAddToCart={() => navigation.navigate('Carrinho')}
          />
        )}
        ListEmptyComponent={loading ? <ActivityIndicator style={{ marginTop: 24 }} /> : <Text style={{ textAlign: 'center', marginTop: 24 }}>Selecione uma categoria</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e5e7eb' },
  catActive: { backgroundColor: '#111827' },
});
