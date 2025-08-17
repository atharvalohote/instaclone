import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import AddPostModal from '../components/AddPostModal';
import * as api from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await api.likePost(postId);
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await api.commentOnPost(postId, comment);
      const updatedPost = response.data;
      setPosts(posts.map(post => 
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const handleCreatePost = async (imageUrl, caption) => {
    try {
      const response = await api.createPost(imageUrl, caption);
      setPosts([response.data, ...posts]);
      setShowAddPost(false);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>Instagram</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={() => setShowAddPost(true)} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStories = () => (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {posts.slice(0, 5).map((post, index) => (
          <TouchableOpacity key={index} style={styles.storyItem}>
            <Image source={{ uri: post.user?.avatar || 'https://via.placeholder.com/60' }} style={styles.storyAvatar} />
            <Text style={styles.storyUsername}>{post.user?.username || 'User'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={() => handleLike(item._id)}
      onComment={(comment) => handleComment(item._id, comment)}
      currentUser={user}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={renderStories}
        showsVerticalScrollIndicator={false}
      />
      <AddPostModal
        visible={showAddPost}
        onClose={() => setShowAddPost(false)}
        onCreatePost={handleCreatePost}
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
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Billabong',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  headerButtonText: {
    fontSize: 20,
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff8501',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
    color: '#262626',
  },
});

export default HomeScreen;
