import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://10.109.35.56:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
      router.replace("/auth/login");

    } catch (error) {
      alert("Network error");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Already have an account?</Text>
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
