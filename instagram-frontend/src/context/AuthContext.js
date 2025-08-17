import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../services/api';
import socket from '../services/socket';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app start, try to load user from token
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.getMe();
          setUser(data);
          socket.auth = { token };
          socket.connect();
        } catch (error) {
          console.log('Failed to fetch user, token might be expired.');
          await AsyncStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const authContext = {
    user,
    isLoading,
    login: async (email, password) => {
      const { data } = await api.login(email, password);
      await AsyncStorage.setItem('token', data.token);
      const { data: userData } = await api.getMe();
      setUser(userData);
      socket.auth = { token: data.token };
      socket.connect();
    },
    register: async (username, email, password) => {
      const { data } = await api.register(username, email, password);
      await AsyncStorage.setItem('token', data.token);
      const { data: userData } = await api.getMe();
      setUser(userData);
      socket.auth = { token: data.token };
      socket.connect();
    },
    logout: async () => {
      await AsyncStorage.removeItem('token');
      setUser(null);
      socket.disconnect();
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
