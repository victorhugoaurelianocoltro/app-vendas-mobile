import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// Empty state padrão com título e subtítulo centralizados
export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text variant="titleMedium" style={{ marginBottom: 4 }}>{title}</Text>
      {subtitle ? <Text style={{ color: '#6b7280', textAlign: 'center' }}>{subtitle}</Text> : null}
    </View>
  );
}
