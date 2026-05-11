import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { auth } from './config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function EmailLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Введите email и пароль');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Успех', 'Добро пожаловать!');
        router.replace('/');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Успех', 'Аккаунт создан! Теперь войдите');
        setIsLogin(true);
        setPassword('');
      }
    } catch (error) {
      let message = 'Ошибка при выполнении запроса';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Этот email уже используется';
          break;
        case 'auth/weak-password':
          message = 'Пароль должен быть минимум 6 символов';
          break;
        case 'auth/invalid-email':
          message = 'Неверный формат email';
          break;
        case 'auth/user-not-found':
          message = 'Пользователь не найден';
          break;
        case 'auth/wrong-password':
          message = 'Неверный пароль';
          break;
        case 'auth/too-many-requests':
          message = 'Слишком много попыток. Попробуйте позже';
          break;
      }
      Alert.alert('Ошибка', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📧 {isLogin ? 'Вход' : 'Регистрация'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Пароль (мин. 6 символов)"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Пожалуйста, подождите...' : (isLogin ? 'Войти' : 'Создать аккаунт')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f0f1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  switchText: {
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});