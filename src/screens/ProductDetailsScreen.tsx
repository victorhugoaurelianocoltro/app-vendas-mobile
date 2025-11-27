import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { withAuth } from '../services/api';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RatingStars from '../components/ui/RatingStars';
import QuantityStepper from '../components/ui/QuantityStepper';

export default function ProductDetailsScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [item, setItem] = useState<any>(null);
  const { token } = useAuth();
  const authApi = withAuth(token);
  const [favbed, setFavbed] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const images: string[] = item?.images?.length ? item.images : (item?.thumbnail ? [item.thumbnail] : []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`);
      setItem(data);
    })();
  }, [id]);

  async function addToCart() {
    // Adiciona ao carrinho com quantidade selecionada
    if (!token) return navigation.navigate('Login');
    await api.post('/cart/items', { productId: item.id, title: item.title, price: item.price, quantity: qty, thumbnail: item.thumbnail || item.images?.[0] });
    navigation.navigate('Carrinho');
  }

  async function addFav() {
    if (!token) return navigation.navigate('Login');
    await authApi.post(`/favorites/${item.id}`);
    setFavbed(true);
  }

  async function removeFav() {
    if (!token) return navigation.navigate('Login');
    await authApi.delete(`/favorites/${item.id}`);
    setFavbed(false);
  }

  if (!item) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Galeria de imagens com miniaturas */}
      <View>
        {images?.[0] ? <Image source={{ uri: images[0] }} style={styles.image} /> : null}
        {images?.length > 1 ? (
          <FlatList
            horizontal
            data={images}
            keyExtractor={(u, i) => String(i)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, marginTop: 8 }}
            renderItem={({ item: img }) => (
              <TouchableOpacity>
                <Image source={{ uri: img }} style={styles.thumb} />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>

      {/* Título + rating */}
      <View style={{ marginTop: 12 }}>
        <Text variant="titleLarge">{item.title}</Text>
        <View style={{ marginTop: 4 }}>
          <RatingStars rating={item.rating || 0} />
        </View>
      </View>

      {/* Preço + quantidade + ações */}
      <View style={{ marginTop: 12, alignItems: 'flex-start', gap: 8 }}>
        <Text variant="headlineSmall">R$ {item.price?.toFixed(2)}</Text>
        <QuantityStepper value={qty} onChange={setQty} />
        <Button mode="contained" onPress={addToCart} style={{ marginTop: 8 }}>Adicionar ao carrinho</Button>
        {!favbed ? (
          <Button mode="outlined" style={{ marginTop: 8 }} onPress={addFav}>Favoritar</Button>
        ) : (
          <Button mode="outlined" style={{ marginTop: 8 }} onPress={removeFav}>Remover dos favoritos</Button>
        )}
      </View>

      {/* Seções informativas */}
      <Divider style={{ marginVertical: 16 }} />
      <Text variant="titleMedium">Sobre este produto</Text>
      <Text style={{ color: '#6b7280', marginTop: 6 }}>{item.description}</Text>

      <Divider style={{ marginVertical: 16 }} />
      <Text variant="titleMedium">Vendedor</Text>
      <Text style={{ color: '#6b7280', marginTop: 6 }}>Vendedor verificado do marketplace</Text>

      <Divider style={{ marginVertical: 16 }} />
      <Text variant="titleMedium">Semelhantes</Text>
      <Text style={{ color: '#6b7280', marginTop: 6 }}>Produtos da mesma categoria serão exibidos aqui.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb' },
  image: { width: '100%', height: 260, borderRadius: 12, backgroundColor: '#eef1f6' },
  thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#eef1f6' },
});
