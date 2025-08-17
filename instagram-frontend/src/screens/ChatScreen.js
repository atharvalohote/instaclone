import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const ChatScreen = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll show a placeholder since messaging isn't fully implemented
    setLoading(false);
  }, []);

  const handleChatPress = (otherUser) => {
    Alert.alert(
      'Coming Soon',
      'Direct messaging feature will be available in the next update!',
      [{ text: 'OK' }]
    );
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => handleChatPress(item)}
    >
      <Image 
        source={{ uri: item.avatar || 'https://via.placeholder.com/50' }} 
        style={styles.avatar}
      />
      <View style={styles.conversationInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.lastMessage}>Tap to start a conversation</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptySubtitle}>
            Start following people to see their posts and send them messages
          </Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => {
              // Navigate to search screen
              Alert.alert('Navigate', 'Go to Search tab to find people to follow');
            }}
          >
            <Text style={styles.searchButtonText}>Find People</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default ChatScreen;
