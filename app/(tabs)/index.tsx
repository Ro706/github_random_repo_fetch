import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [username, setUsername] = useState("Ro706");
  const [repo, setRepo] = useState("");

  const fetchRandomRepo = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setRepo("No repos found.");
        return;
      }

      const random = data[Math.floor(Math.random() * data.length)];
      setRepo(random?.name ?? "Unknown repo");
    } catch (error) {
      console.log("Error fetching repo:", error);
      setRepo("Error fetching repo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random GitHub Repo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter GitHub Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={fetchRandomRepo}>
        <Text style={styles.buttonText}>Fetch Random Repo</Text>
      </TouchableOpacity>

      {repo ? <Text style={styles.repoText}>{repo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginVertical: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#7b2ff7",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  repoText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
