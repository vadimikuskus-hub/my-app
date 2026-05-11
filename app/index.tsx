import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.replace('/email-login');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/email-login');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>⚡ Жұмыс</Text>
        <Text style={styles.subtitle}>Платформа для найма рабочих</Text>
        <Text style={styles.loadingText}>Перенаправление на вход...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡ Жұмыс</Text>
      <Text style={styles.userInfo}>Добро пожаловать, {user.email}</Text>

      <TouchableOpacity style={styles.btnClient} onPress={() => router.push('/client')}>
        <Text style={styles.btnText}>Я — Заказчик</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWorker} onPress={() => router.push('/worker')}>
        <Text style={styles.btnText}>Я — Рабочий</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAdmin} onPress={() => router.push('/admin')}>
        <Text style={styles.btnAdminText}>Вход для админа</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaaaaa',
    marginBottom: 48,
  },
  userInfo: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 32,
  },
  loadingText: {
    color: '#aaa',
    marginTop: 20,
  },
  btnClient: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnWorker: {
    backgroundColor: '#2563eb',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnAdmin: {
    marginTop: 8,
    marginBottom: 24,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  btnAdminText: {
    fontSize: 14,
    color: '#666',
  },
  logoutBtn: {
    marginTop: 32,
    padding: 12,
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
});