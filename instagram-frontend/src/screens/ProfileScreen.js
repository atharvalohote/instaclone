import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image,
  Alert,
  RefreshControl 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import api from '../services/api';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${user._id}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await api.put(`/posts/${postId}/like`);
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      const response = await api.post(`/posts/${postId}/comment`, {
        text: commentText
      });
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error commenting:', error);
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: user.avatar || 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{posts.length}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers?.length || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following?.length || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => handleLike(item._id)}
            onComment={handleComment}
            currentUser={user}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>Share your first post!</Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#333',
  },
  statsSection: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileScreen;
