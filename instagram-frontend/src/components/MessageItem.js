import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MessageItem = ({ chat }) => (
  <TouchableOpacity style={styles.container}>
    <Image source={{ uri: chat.avatar }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.user}>{chat.user}</Text>
      <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  textContainer: { marginLeft: 12 },
  user: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { color: 'gray' },
});

export default MessageItem;
