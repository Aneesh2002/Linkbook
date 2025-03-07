import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import logo from '../Images/logo-transparent-png.png'; // Make sure the image is in the Images folder

export default function Index({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFD1DC", // Light pink background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
  },
  logo: {
    width: 150,  // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom: 20,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FFFFFF", // White button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF4081", // Darker pink text
  },
});
