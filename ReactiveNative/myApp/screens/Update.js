import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '', phone: '' });

  return (
    <View style={styles.container}> 
      {/* Menu Icon */}
      <TouchableOpacity 
        style={styles.menuIcon} 
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Ionicons name={dropdownVisible ? "close" : "menu"} size={30} color="black" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={styles.dropdownItem} 
            onPress={() => { alert("About Us"); setDropdownVisible(false); }}
          >
            <Text style={styles.dropdownText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownItem} 
            onPress={() => { alert("Contact Us"); setDropdownVisible(false); }}
          >
            <Text style={styles.dropdownText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownItem} 
            onPress={() => { 
              alert("Logged Out!"); 
              setDropdownVisible(false); 
              navigation.navigate("Login"); 
            }}
          >
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.fname}
          onChangeText={(text) => setFormData({ ...formData, fname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lname}
          onChangeText={(text) => setFormData({ ...formData, lname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => alert("Form Submitted!" + JSON.stringify(formData))}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}> 
          <Ionicons name="home-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Search")}> 
          <Ionicons name="search-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Add")}> 
          <Ionicons name="person-add-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD1DC",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "black",
  },
  formContainer: {
    marginTop: 20,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: "#C71585",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navItem: {
    alignItems: "center",
  },
});
