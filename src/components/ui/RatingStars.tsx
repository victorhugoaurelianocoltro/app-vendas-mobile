import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Exibe estrelas de rating (0-5) com ícones sólidos e contorno
export default function RatingStars({ rating = 0, size = 16 }: { rating?: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return <Ionicons key={i} name="star" size={size} color="#f59e0b" />;
    if (i === full && hasHalf) return <Ionicons key={i} name="star-half" size={size} color="#f59e0b" />;
    return <Ionicons key={i} name="star-outline" size={size} color="#f59e0b" />;
  });
  return <View style={{ flexDirection: 'row', gap: 2 }}>{stars}</View>;
}
