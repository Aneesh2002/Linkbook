import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, ScrollView } from 'react-native';
import ch from '../Images/Ch2.jpg'

export default function ViewAll({navigation}) {
    return (
        <View>
            <ScrollView>
                <TextInput style={styles.input}/>
                <View style={styles.Searchbtn}>
                    <Button title="Search"  color='blue'/>
                </View>
                <View>
                    <Image src={ch} style={styles.img}/>
                  
                </View>
                <View style={styles.btn}> 
                    <Button title="View" color='blue'/>
                </View>
                <View style={styles.btn}>
                    <Button title="Update" color='blue' onPress={() => navigation.navigate("Update")} />
                </View>
            </ScrollView>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    Searchbtn:{
        width:150,
        color:'red',
        padding:15

    },
    input:{
        width:300,
        height:30,
        borderWidth: 1,
        borderColor: 'gray',
        padding:15,
        margin:10

    },
    btn:{
        width:150,
        color:'red',
        padding:15
    },
    img:{
      width:200,
      height:100
    }
})