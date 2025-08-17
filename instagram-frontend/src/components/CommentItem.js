import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentItem = ({ comment }) => (
  <View style={styles.container}>
    <Text><Text style={styles.user}>{comment.user}</Text> {comment.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingVertical: 4 },
  user: { fontWeight: 'bold' },
});

export default CommentItem;
