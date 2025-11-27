import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, token } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16, gap: 12 }}>
        {!token ? (
          <Button mode="contained" onPress={() => navigation.navigate('Login')}>Entrar</Button>
        ) : (
          <>
            <Text variant="titleLarge">Olá, {user?.name}</Text>
            <Button mode="outlined" onPress={() => navigation.navigate('Orders')}>Meus pedidos</Button>
            <Button mode="outlined" onPress={() => navigation.navigate('ProductCreate')}>Cadastrar produto</Button>
            <Button onPress={logout}>Sair</Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
});
