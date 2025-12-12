import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* <Text style={styles.headerTitle}>About</Text> */}
        <View style={{ width: 24 }} />
      </View>

      {/* CONTENT */}
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.text}>
        GitHub Random Repo Fetcher is a simple app that helps you discover
        random repositories from any GitHub user.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Developer</Text>
        <Text style={styles.value}>Rohit Mandal</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tech Stack</Text>
        <Text style={styles.value}>React Native · Expo · Node.js · MongoDB</Text>
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

  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 20,
  },
  text: {
    color: "#aaa",
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    color: "#888",
    fontSize: 13,
  },
  value: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
});
