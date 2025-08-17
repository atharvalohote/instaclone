import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const onLoginPress = async () => {
    if (!email || !password) {
      return Alert.alert('Input Error', 'Please enter both email and password.');
    }
    try {
      await login(email, password);
      // Navigation will happen automatically via AppNavigator
    } catch (error) {
      const message = error.response?.data?.msg || 'Please check your credentials or server connection.';
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Instagram</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Log In" onPress={onLoginPress} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 40, textAlign: 'center', marginBottom: 30, fontWeight: 'bold' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
  switchText: { color: 'blue', textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
