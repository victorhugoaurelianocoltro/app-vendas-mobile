import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { withAuth } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function OrdersScreen() {
  const { token } = useAuth();
  const api = withAuth(token);
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await api.get('/orders');
    setItems(data);
  }

  useEffect(() => { if (token) load(); }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <Text variant="titleSmall">Pedido #{item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: R$ {item.total.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>Nenhum pedido</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
