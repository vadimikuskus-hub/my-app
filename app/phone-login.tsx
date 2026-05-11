import { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { auth } from './config/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function PhoneLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Ошибка', 'Введите номер телефона');
      return;
    }

    setLoading(true);
    try {
      let formattedNumber = phoneNumber;
      if (!phoneNumber.startsWith('+')) {
        formattedNumber = '+7' + phoneNumber;
      }
      
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber);
      setVerificationId(confirmation);
      Alert.alert('Код отправлен!', 'Проверьте SMS на телефоне');
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code || code.length < 6) {
      Alert.alert('Ошибка', 'Введите 6-значный код');
      return;
    }

    setLoading(true);
    try {
      await verificationId.confirm(code);
      Alert.alert('Успех!', 'Вы вошли в систему');
      router.replace('/');
    } catch (error) {
      Alert.alert('Ошибка', 'Неверный код подтверждения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Вход в Жұмыс</Text>
      <Text style={styles.subtitle}>Введите номер телефона</Text>

      {!verificationId ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="+7 777 777 7777"
            placeholderTextColor="#666"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={!loading}
          />
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={sendCode}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Отправить код</Text>}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Код из SMS"
            placeholderTextColor="#666"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            editable={!loading}
          />
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={verifyCode}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Подтвердить</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setVerificationId(null)}>
            <Text style={styles.backText}>← Изменить номер</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#FFD700', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 48 },
  input: { width: '100%', backgroundColor: '#1a1a2e', color: '#fff', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 16 },
  button: { backgroundColor: '#FFD700', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  backText: { color: '#FFD700', fontSize: 16, marginTop: 24 },
});