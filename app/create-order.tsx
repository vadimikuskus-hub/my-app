import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { auth, db } from './config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateOrderScreen() {
  const [workersCount, setWorkersCount] = useState('1');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('12000');
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    if (!workersCount || !date || !time || !address) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const order = {
        clientId: auth.currentUser?.uid,
        clientEmail: auth.currentUser?.email,
        workersCount: parseInt(workersCount),
        date: date,
        time: time,
        address: address,
        description: description,
        price: parseInt(price),
        status: 'open',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'orders'), order);
      Alert.alert('Успех', 'Заказ создан!');
      router.back();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать заказ');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>📝 Создание заказа</Text>

      <Text style={styles.label}>Сколько нужно рабочих?</Text>
      <TextInput
        style={styles.input}
        value={workersCount}
        onChangeText={setWorkersCount}
        keyboardType="numeric"
        placeholder="1"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Дата</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2025-05-15"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Время</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="14:00"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Адрес</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="г. Алматы, ул. Абая 10"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Описание работ (необязательно)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Перевезти мебель, 80 кг"
        placeholderTextColor="#666"
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Оплата рабочему (тенге)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="12000"
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateOrder} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Создаю...' : 'Создать заказ'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: 24,
  },
  backBtn: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  backText: {
    color: '#FFD700',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});