// src/components/PostCard.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert 
} from 'react-native';

const PostCard = ({ post, onLike, onComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Handle both string and ObjectId comparisons
  const isLiked = post.likes && post.likes.some(likeId => 
    likeId.toString() === currentUser._id.toString()
  );
  const likeCount = post.likes ? post.likes.length : 0;
  const commentCount = post.comments ? post.comments.length : 0;

  const handleLike = () => {
    onLike(post._id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post._id, commentText);
      setCommentText('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: post.user?.avatar || 'https://via.placeholder.com/40' }} 
            style={styles.avatar}
          />
          <View style={styles.userText}>
            <Text style={styles.username}>{post.user?.username || 'Unknown User'}</Text>
            <Text style={styles.location}>📍 Location</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowComments(!showComments)} 
            style={styles.actionButton}
          >
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Like Count */}
      {likeCount > 0 && (
        <Text style={styles.likeCount}>
          <Text style={styles.boldText}>{likeCount}</Text> likes
        </Text>
      )}

      {/* Caption */}
      {post.caption && (
        <View style={styles.caption}>
          <Text style={styles.captionText}>
            <Text style={styles.boldText}>{post.user?.username || 'Unknown User'}</Text> {post.caption}
          </Text>
        </View>
      )}

      {/* Comments */}
      {commentCount > 0 && (
        <TouchableOpacity 
          onPress={() => setShowComments(!showComments)}
          style={styles.commentsToggle}
        >
          <Text style={styles.commentsToggleText}>
            View all {commentCount} comment{commentCount !== 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}

      {/* Comments List */}
      {showComments && post.comments && post.comments.length > 0 && (
        <View style={styles.commentsContainer}>
          {post.comments.slice(0, 3).map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.commentText}>
                <Text style={styles.boldText}>{comment.user?.username || 'Unknown User'}</Text> {comment.text}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Timestamp */}
      <Text style={styles.timestamp}>{formatDate(post.createdAt)}</Text>

      {/* Add Comment */}
      <View style={styles.addComment}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
          placeholderTextColor="#8e8e93"
        />
        <TouchableOpacity 
          onPress={handleComment}
          style={[styles.postButton, !commentText.trim() && styles.postButtonDisabled]}
          disabled={!commentText.trim()}
        >
          <Text style={[styles.postButtonText, !commentText.trim() && styles.postButtonTextDisabled]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  userText: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  location: {
    fontSize: 12,
    color: '#8e8e93',
  },
  moreButton: {
    padding: 5,
  },
  moreButtonText: {
    fontSize: 18,
    color: '#262626',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    color: '#ed4956',
  },
  saveButton: {
    padding: 5,
  },
  likeCount: {
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 8,
    color: '#262626',
  },
  caption: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  captionText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '600',
  },
  commentsToggle: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  commentsToggleText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  commentsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  comment: {
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
  },
  timestamp: {
    color: '#8e8e93',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    maxHeight: 80,
  },
  postButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#0095f6',
    fontWeight: '600',
    fontSize: 14,
  },
  postButtonTextDisabled: {
    color: '#8e8e93',
  },
});

export default PostCard;
