import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
export default function Index() {
  const [username,setUsername] = useState("Ro706");
  const [Repo , setRepo] = useState(""); 
  const fetchRandomRepo = () => fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          const randomRepo = data[Math.floor(Math.random() * data.length)];
          setRepo(randomRepo ? randomRepo.name : "No repos found");
        }
      )
        .catch(error => {
          console.error('Error fetching repos:', error);
          setRepo("Error fetching repos");
        });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000ff",
      }}
    >
      <Text style={Styles.Text}>Hello {username}! We are here to fetch all random repo from GitHub.</Text>
      <TextInput
        style={Styles.TextInput}
        placeholder="Enter your GitHub Username"
        placeholderTextColor="#888"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <View style={Styles.buttonContainer}>
        <Button title="Fetch Random Repo" onPress={fetchRandomRepo} />
      </View>
      <Text style={Styles.repoText}>{Repo}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  Text : {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  TextInput : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 8,
    color: '#fff',
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 12,
    width: '60%',
  },
  repoText: {
    color: '#ffffff',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
})