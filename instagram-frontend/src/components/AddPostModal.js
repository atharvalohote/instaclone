// src/components/AddPostModal.js
import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Image,
  ActivityIndicator 
} from 'react-native';
import api from '../services/api';

const AddPostModal = ({ visible, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      // For now, we'll use a placeholder image since expo-image-picker might not be available
      Alert.alert(
        'Image Picker',
        'Image picker functionality will be available in the next update. For now, you can create posts with captions only.',
        [{ text: 'OK' }]
      );
      
      // Set a placeholder image for testing
      setImage('https://via.placeholder.com/300x300/007AFF/FFFFFF?text=Sample+Image');
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      Alert.alert(
        'Camera',
        'Camera functionality will be available in the next update. For now, you can create posts with captions only.',
        [{ text: 'OK' }]
      );
      
      // Set a placeholder image for testing
      setImage('https://via.placeholder.com/300x300/FF3B30/FFFFFF?text=Camera+Photo');
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const createPost = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    setLoading(true);
    try {
      // For now, we'll create a post with just the caption and placeholder image
      const postData = {
        image: image,
        caption: caption || 'Sample post'
      };

      const response = await api.post('/posts', postData);

      onPostCreated(response.data);
      setCaption('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setCaption('');
      setImage(null);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} disabled={loading}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New Post</Text>
          <TouchableOpacity 
            onPress={createPost} 
            disabled={!image || loading}
            style={[styles.shareButton, (!image || loading) && styles.shareButtonDisabled]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.shareButtonText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {!image ? (
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerText}>📷 Choose from Library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imagePickerButton} onPress={takePhoto}>
                <Text style={styles.imagePickerText}>📸 Take Photo</Text>
              </TouchableOpacity>
              <Text style={styles.noteText}>
                Note: Image picker is currently in development mode. 
                Tap any button to use a sample image.
              </Text>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.selectedImage} />
              <TouchableOpacity 
                style={styles.changeImageButton} 
                onPress={pickImage}
                disabled={loading}
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={500}
            editable={!loading}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  imagePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#333',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  changeImageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default AddPostModal;
