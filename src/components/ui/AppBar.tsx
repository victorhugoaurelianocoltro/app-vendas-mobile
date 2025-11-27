import React from 'react';
import { Appbar } from 'react-native-paper';

// AppBar padrão do app: título forte e botão opcional de voltar/ação à direita
export default function AppBar({ title, onBack, right }: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <Appbar.Header mode="small">
      {onBack ? <Appbar.BackAction onPress={onBack} /> : null}
      <Appbar.Content title={title} titleStyle={{ fontWeight: '700' }} />
      {right}
    </Appbar.Header>
  );
}
