import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>🏠</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="Search" 
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>🔍</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="Chat" 
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>💬</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>👤</Text>
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
