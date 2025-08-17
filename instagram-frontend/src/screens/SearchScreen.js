import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const SearchScreen = () => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      Alert.alert('Error', 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await api.put(`/users/follow/${userId}`);
      // Update the users list to reflect the follow status
      setUsers(users.map(u => {
        if (u._id === userId) {
          return {
            ...u,
            followers: [...u.followers, user._id]
          };
        }
        return u;
      }));
    } catch (error) {
      console.error('Error following user:', error);
      Alert.alert('Error', 'Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await api.put(`/users/follow/${userId}`);
      // Update the users list to reflect the unfollow status
      setUsers(users.map(u => {
        if (u._id === userId) {
          return {
            ...u,
            followers: u.followers.filter(id => id !== user._id)
          };
        }
        return u;
      }));
    } catch (error) {
      console.error('Error unfollowing user:', error);
      Alert.alert('Error', 'Failed to unfollow user');
    }
  };

  const isFollowing = (targetUser) => {
    return targetUser.followers.includes(user._id);
  };

  const renderUser = ({ item }) => {
    const following = isFollowing(item);
    
    return (
      <View style={styles.userItem}>
        <Image 
          source={{ uri: item.avatar || 'https://via.placeholder.com/50' }} 
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        {item._id !== user._id && (
          <TouchableOpacity
            style={[styles.followButton, following && styles.unfollowButton]}
            onPress={() => following ? handleUnfollow(item._id) : handleFollow(item._id)}
          >
            <Text style={[styles.followButtonText, following && styles.unfollowButtonText]}>
              {following ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchUsers(text);
          }}
          autoCapitalize="none"
        />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        ListEmptyComponent={
          searchQuery.trim() ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {loading ? 'Searching...' : 'No users found'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unfollowButton: {
    backgroundColor: '#f0f0f0',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  unfollowButtonText: {
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;
