import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🛡️ Панель Админа</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Общий оборот</Text>
        <Text style={styles.cardValue}>0 ₸</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Активные смены</Text>
        <Text style={styles.cardValue}>0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Чистая прибыль сегодня</Text>
        <Text style={styles.cardValue}>0 ₸</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: 24,
    paddingTop: 60,
  },
  back: {
    marginBottom: 32,
  },
  backText: {
    color: '#aaaaaa',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});