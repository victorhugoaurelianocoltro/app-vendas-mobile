import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';

interface Props {
  query: string;
  setQuery: (v: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({ query, setQuery, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Buscar produtos"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSubmit}
        style={{ flex: 1 }}
      />
      <IconButton icon="magnify" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
