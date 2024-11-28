import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AddJournalEntry() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("NewEntry");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Add Journal </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#AED8FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  buttonText: {
    color: "#2E3239",
    fontSize: 18,
    fontWeight: "bold",
  },
});
