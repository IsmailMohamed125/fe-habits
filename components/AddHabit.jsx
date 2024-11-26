import { Link, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HabitDetailsScreen from "./habitAdder";

const AddHabit = ({userToken}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Button title="Add Habit" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>This is a basic modal!</Text>
            <HabitDetailsScreen userToken={userToken}/>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  radioGroup: {
    marginBottom: 20,
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "flex-start", 
    alignItems: "center",
  },
});


export default AddHabit;
