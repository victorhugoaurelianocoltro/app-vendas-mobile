import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

interface Props {
  item: any;
  onPress?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({ item, onPress, onAddToCart }: Props) {
  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Cover source={{ uri: item.thumbnail || item.images?.[0] }} style={styles.cover} />
      <Card.Content style={{ paddingVertical: 8 }}>
        <Text variant="titleSmall" numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text variant="titleSmall" style={styles.price}>R$ {item.price?.toFixed(2)}</Text>
      </Card.Content>
      <Card.Actions style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <Button mode="contained" onPress={onAddToCart} compact>Adicionar</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, overflow: 'hidden', borderRadius: 16 },
  cover: { height: 140, backgroundColor: '#eef1f6' },
  title: { color: '#111827' },
  price: { marginTop: 4 },
});
