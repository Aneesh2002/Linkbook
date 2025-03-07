import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getContacts, deleteContact } from '../service/api'; // Import API functions

export default function Home({ navigation }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch contacts");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteContact(id);
      if (response && response.message === "Contact deleted successfully") {
        alert("Deleted", "Contact removed successfully", [
          { text: "OK", onPress: fetchContacts } // Refresh contacts
        ]);
      } else {
        Alert.alert("Error", "Failed to delete contact.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}> 
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuIcon} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Ionicons name={dropdownVisible ? "close" : "menu"} size={30} color="black" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => { alert("About Us"); setDropdownVisible(false); }}>
            <Text style={styles.dropdownText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => { alert("Contact Us"); setDropdownVisible(false); }}>
            <Text style={styles.dropdownText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => { alert("Logged Out!"); setDropdownVisible(false); navigation.navigate("Login"); }}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Name List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.nameRow}>
            <TouchableOpacity onPress={() => navigation.navigate("Details", { name: item.fname })}>
              <Text style={styles.nameText}>{item.fname}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Navigation */}
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
  container: { flex: 1, backgroundColor: "#FFD1DC", paddingBottom: 60 },
  menuIcon: { position: "absolute", top: 40, left: 20 },
  dropdown: { position: "absolute", top: 50, left: 20, width: 150, backgroundColor: "white", borderRadius: 10, paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  dropdownItem: { padding: 10, alignItems: "center" },
  dropdownText: { fontSize: 16, color: "black" },
  listContainer: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 80 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginVertical: 5, backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  nameText: { fontSize: 16, color: "black" },
  bottomNav: { position: "absolute", bottom: 0, flexDirection: "row", width: "100%", justifyContent: "space-around", backgroundColor: "white", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#ccc", borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  navItem: { alignItems: "center" },
});
