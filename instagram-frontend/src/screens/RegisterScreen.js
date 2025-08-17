import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }
    try {
      await register(username, email, password);
      // Success: Automatic navigation will happen via AppNavigator
    } catch (error) {
      const message = error.response?.data?.msg || 'An unexpected error occurred.';
      Alert.alert('Registration Failed', message);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Sign Up" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchText}>Already have an account? Log In</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  switchText: { color: 'blue', textAlign: 'center', marginTop: 20 },
});

export default RegisterScreen;
