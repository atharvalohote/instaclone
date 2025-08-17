import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserProfile({ user }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { marginTop: 8, fontSize: 18, fontWeight: 'bold' },
});
