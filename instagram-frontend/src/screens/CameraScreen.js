import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera Functionality Goes Here</Text>
      <TouchableOpacity style={styles.captureButton}>
        <Ionicons name="camera" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  captureButton: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
