import React, { useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { api } from '../services/api';
import { ProductCard, SearchBar } from '../components';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSearch() {
    setLoading(true);
    try {
      const { data } = await api.get('/products/search', { params: { q: query } });
      setItems(data.products || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 12 }}>
        <SearchBar query={query} setQuery={setQuery} onSubmit={onSearch} />
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
              onAddToCart={() => navigation.navigate('Carrinho')}
            />
          </View>
        )}
        ListEmptyComponent={!loading ? <Text style={{ textAlign: 'center', marginTop: 24 }}>Busque um produto</Text> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
