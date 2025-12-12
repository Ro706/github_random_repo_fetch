import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "http://10.109.35.56:5000";

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data?.user ?? null);
      } catch (err) {
        console.log("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7b2ff7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* PROFILE */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>

        <Text style={styles.username}>{user?.username ?? "User"}</Text>
        <Text style={styles.email}>{user?.email ?? "user@email.com"}</Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.options}>
        <Option
          icon="lock-closed-outline"
          label="Security"
          onPress={() => router.push("/account/security")}
        />

        <Option
          icon="information-circle-outline"
          label="About App"
          isLast
          onPress={() => router.push("/account/about")}
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

/* Reusable option row */
function Option({
  icon,
  label,
  onPress,
  isLast,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.optionRow, isLast && styles.lastOption]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color="#bbb" />
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#555" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  loader: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  /* PROFILE */
  profileCard: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7b2ff7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },

  /* OPTIONS */
  options: {
    backgroundColor: "#111",
    borderRadius: 12,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionText: {
    flex: 1,
    color: "#eee",
    marginLeft: 12,
    fontSize: 16,
  },

  /* LOGOUT */
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },
  logoutText: {
    color: "#ff4d4d",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
