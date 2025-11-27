import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme';
import { api } from '../services/api';
import { ProductCard } from '../components';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      setItems(data.products || data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
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
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListHeaderComponent={
          <View>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop' }}
              style={styles.hero}
              imageStyle={{ borderRadius: 16 }}
            >
              <View style={styles.heroOverlay}>
                <Text variant="headlineSmall" style={{ color: '#fff', fontWeight: '700' }}>Ofertas da Semana</Text>
                <Text style={{ color: '#e5e7eb', marginTop: 4 }}>Seleção curada para você</Text>
              </View>
            </ImageBackground>
            <Text variant="titleLarge" style={{ marginVertical: 12, color: colors.text }}>Destaques</Text>
          </View>
        }
        ListEmptyComponent={!loading ? <Text style={{ textAlign: 'center', marginTop: 24 }}>Nenhum produto</Text> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb' },
  hero: { height: 160, justifyContent: 'flex-end' },
  heroOverlay: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
});
