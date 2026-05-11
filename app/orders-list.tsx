import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { db } from './config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function OrdersListScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), where('status', '==', 'open'));
      const querySnapshot = await getDocs(q);
      const ordersList = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersList);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      setLoading(false);
    }
  };

  const takeOrder = async (orderId) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'taken',
        workerId: 'current_user_id', // позже заменим на реального рабочего
        takenAt: new Date().toISOString()
      });
      alert('Заказ взят! Свяжитесь с клиентом для уточнения деталей.');
      loadOrders(); // обновляем список
    } catch (error) {
      alert('Ошибка: не удалось взять заказ');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Загрузка заказов...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>

      <Text style={styles.title}>📋 Доступные заказы</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Нет доступных заказов</Text>
          <Text style={styles.emptySubtext}>Заказы появятся здесь, когда клиенты их создадут</Text>
        </View>
      ) : (
        <ScrollView style={styles.ordersList}>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderPrice}>{order.price} ₸</Text>
                <Text style={styles.orderWorkers}>{order.workersCount} чел.</Text>
              </View>
              
              <Text style={styles.orderAddress}>📍 {order.address}</Text>
              <Text style={styles.orderDateTime}>📅 {order.date} в {order.time}</Text>
              
              {order.description ? (
                <Text style={styles.orderDesc}>📝 {order.description}</Text>
              ) : null}
              
              <TouchableOpacity style={styles.takeButton} onPress={() => takeOrder(order.id)}>
                <Text style={styles.takeButtonText}>Взять заказ</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
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
  centerContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    color: '#FFD700',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 24,
  },
  loadingText: {
    color: '#aaa',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  orderWorkers: {
    fontSize: 14,
    color: '#aaa',
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderAddress: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  orderDateTime: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  orderDesc: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
    marginTop: 4,
  },
  takeButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  takeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});