import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function ProductCreateScreen({ navigation }: any) {
  const { token } = useAuth();
  const [title, setTitle] = useState('Camiseta Minimal');
  const [description, setDescription] = useState('Tecido premium, corte reto.');
  const [price, setPrice] = useState('79.90');
  const [category, setCategory] = useState('apparel');
  const [thumbnail, setThumbnail] = useState('https://picsum.photos/400');
  const [images, setImages] = useState('https://picsum.photos/400');

  async function submit() {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const body = {
      title,
      description,
      price: Number(price),
      category,
      thumbnail,
      images: images ? images.split(',').map((s) => s.trim()) : [],
    };
    await api.post('/products', body, { headers });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text variant="titleLarge">Cadastrar Produto</Text>
        <TextInput label="Título" mode="outlined" value={title} onChangeText={setTitle} />
        <TextInput label="Descrição" mode="outlined" value={description} onChangeText={setDescription} multiline />
        <TextInput label="Preço" mode="outlined" value={price} onChangeText={setPrice} keyboardType="decimal-pad" />
        <TextInput label="Categoria" mode="outlined" value={category} onChangeText={setCategory} />
        <TextInput label="Thumbnail" mode="outlined" value={thumbnail} onChangeText={setThumbnail} />
        <TextInput label="Imagens (separar por vírgula)" mode="outlined" value={images} onChangeText={setImages} />
        <Button mode="contained" onPress={submit}>Salvar</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
