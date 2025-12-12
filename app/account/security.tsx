import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "http://10.109.35.56:5000";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/auth/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Update failed");
      } else {
        Alert.alert("Success", "Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      Alert.alert("Error", "Network error");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Change Password</Text>

        <TextInput
          placeholder="Current Password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          placeholder="New Password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={updatePassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Update Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 50,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 14,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#7b2ff7",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
