import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

// Stepper de quantidade com + e - e limite mínimo 1
export default function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <IconButton icon="minus" mode="contained-tonal" onPress={() => onChange(Math.max(1, value - 1))} />
      <Text variant="titleSmall">{value}</Text>
      <IconButton icon="plus" mode="contained" onPress={() => onChange(value + 1)} />
    </View>
  );
}
