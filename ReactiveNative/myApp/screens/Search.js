import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchContacts } from '../service/api'; // Import API function

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch contacts on button press
  const handleSearch = async () => {
    if (!searchText.trim()) {
      setContacts([]); // Clear if empty
      return;
    }
    setLoading(true);
    const results = await searchContacts(searchText);
    setContacts(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search for a contact..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="black" style={styles.loader} />}

      {/* Contact List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.nameRow} 
            onPress={() => navigation.navigate("Details", { name: item.fname })}
          >
            <Text style={styles.nameText}>{item.fname} {item.lname}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

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
  container: { flex: 1, backgroundColor: "#FFD1DC", paddingBottom: 60 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFB6C1", padding: 10, borderRadius: 10, margin: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "black" },

  searchButton: { backgroundColor: "#FF69B4", padding: 10, borderRadius: 8, alignItems: "center", marginHorizontal: 20 },
  searchButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },

  loader: { marginTop: 20 },

  listContainer: { flexGrow: 1, paddingHorizontal: 20 },
  nameRow: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginVertical: 5, backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  nameText: { fontSize: 16, color: "black" },

  bottomNav: { position: "absolute", bottom: 0, flexDirection: "row", width: "100%", justifyContent: "space-around", backgroundColor: "white", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#ccc", borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  navItem: { alignItems: "center" },
});
