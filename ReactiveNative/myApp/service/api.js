import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.227.150:3000/contacts'; // Change this to your server URL

export const addContact = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    console.log(response);
    

    if (response.ok) {
      Alert.alert("Success", "Contact created successfully!");
      return true; // Success
    } else {
      Alert.alert("Error", "Failed to add contact. Please try again.");
      return false; // Failure
    }
  } catch (error) {
    console.error('Error adding contact:', error);
    Alert.alert("Error", "Something went wrong. Please check your connection.");
    return false;
  }
};


export const getContacts = async () => {
  try {
    const response = await fetch(`http://192.168.227.150:3000/contacts/all`);
    const data = await response.json();
    return data; // Return the full contact list
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};



export const deleteContact = async (id) => {
  try {
    const response = await fetch(`http://192.168.227.150:3000/contacts/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }

    return await response.json(); // Expect { message: "Contact deleted successfully" }
  } catch (error) {
    console.error("Delete error:", error);
    return null;
  }
};

export const searchContacts = async (query) => {
    try {
        const response = await fetch(`http://192.168.227.150:3000/contacts/search?query=${query}`);
        if (!response.ok) {
            throw new Error("Search request failed");
        }
        return await response.json();
    } catch (error) {
        console.error("Error searching contacts:", error);
        return [];
    }
};


  

