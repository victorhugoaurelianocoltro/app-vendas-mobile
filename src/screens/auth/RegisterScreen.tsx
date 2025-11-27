import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('Cliente Demo');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    try {
      await register(name, email, password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text variant="headlineSmall">Criar conta</Text>
        <TextInput label="Nome" mode="outlined" value={name} onChangeText={setName} />
        <TextInput label="E-mail" mode="outlined" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput label="Senha" mode="outlined" secureTextEntry value={password} onChangeText={setPassword} />
        <Button mode="contained" onPress={onSubmit} loading={loading}>Cadastrar</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
