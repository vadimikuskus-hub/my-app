import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';

export default function WorkerScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/email-login');
      } else {
        setUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>👷 Кабинет Рабочего</Text>
      <Text style={styles.userEmail}>{user?.email}</Text>

      <TouchableOpacity style={styles.ordersBtn} onPress={() => router.push('/orders-list')}>
        <Text style={styles.ordersBtnText}>📋 Смотреть заказы</Text>
      </TouchableOpacity>
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
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    color: '#2563eb',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  userEmail: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 32,
  },
  ordersBtn: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ordersBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});