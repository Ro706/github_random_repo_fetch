import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.109.35.56:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // Save token
      await AsyncStorage.setItem("token", data.token);

      router.replace("/"); // Go to home
    } catch (error) {
      alert("Network error. Check backend.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  title: { color: "white", fontSize: 28, marginBottom: 20 },
  input: {
    width: "80%",
    backgroundColor: "#1a1a1a",
    padding: 12,
    color: "white",
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    width: "80%",
    backgroundColor: "#7b2ff7",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  link: { color: "#7b2ff7", marginTop: 20 },
});
