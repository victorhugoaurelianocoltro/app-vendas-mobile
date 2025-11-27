import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveObject<T>(key: string, value: T) {
  try { await AsyncStorage.setItem(key, JSON.stringify(value)); } catch {}
}
export async function getObject<T>(key: string): Promise<T | null> {
  try { const v = await AsyncStorage.getItem(key); return v ? JSON.parse(v) as T : null; } catch { return null; }
}
export async function remove(key: string) { try { await AsyncStorage.removeItem(key); } catch {} }
