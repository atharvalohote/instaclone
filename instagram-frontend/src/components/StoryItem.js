import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StoryItem = ({ story }) => (
  <View style={styles.container}>
    <Image source={{ uri: story.avatar }} style={styles.avatar} />
    <Text>{story.user}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginRight: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'tomato' },
});

export default StoryItem;
