import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const { options } = descriptors[route.key];
        const label =
          options.title !== undefined ? options.title : route.name;

        const iconName = options.tabBarIconName;

        const onPress = () => navigation.navigate(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, isFocused && styles.activeIcon]}>
              <Ionicons
                name={iconName}
                size={28}
                color={isFocused ? "#9c6bff" : "#888"}
              />
            </View>

            {isFocused && (
              <Text style={styles.activeLabel}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1a1a1a",      // DARK floating bar
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },

  tabButton: {
    alignItems: "center",
  },

  iconWrapper: {
    padding: 8,
    borderRadius: 20,
  },

  activeIcon: {
    backgroundColor: "#2a2a2a",
    transform: [{ translateY: -10 }],
    shadowColor: "#9c6bff",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  activeLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#b388ff",
    fontWeight: "600",
  },
});
