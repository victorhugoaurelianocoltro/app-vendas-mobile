import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, TextInput, RadioButton } from 'react-native-paper';
import { withAuth } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CheckoutScreen({ navigation }: any) {
  const { token } = useAuth();
  const api = withAuth(token);
  const [address, setAddress] = useState('Rua Exemplo, 123, Centro, São Paulo');
  const [method, setMethod] = useState<'card' | 'pix' | 'boleto'>('card');

  async function confirm() {
    const { data } = await api.post('/orders/checkout', { shippingAddress: address });
    const orderId = data.orderId;
    await api.post('/orders/pay', { orderId, method });
    navigation.navigate('Orders');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text variant="titleLarge">Checkout</Text>
        <TextInput label="Endereço" mode="outlined" value={address} onChangeText={setAddress} />
        <Text style={{ marginTop: 8 }}>Forma de pagamento</Text>
        <RadioButton.Group onValueChange={(v) => setMethod(v as any)} value={method}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <RadioButton value="card" />
            <Text>Cartão</Text>
            <RadioButton value="pix" />
            <Text>Pix</Text>
            <RadioButton value="boleto" />
            <Text>Boleto</Text>
          </View>
        </RadioButton.Group>
        <Button mode="contained" onPress={confirm}>Confirmar pedido</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
