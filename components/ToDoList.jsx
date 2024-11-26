import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { fetchAllHabits } from "../api.js";
import AddHabit from "./AddHabit.jsx";
import AnimatedCat from "./fakeCat.jsx";
import Progress from "./ProgressBar.jsx";

const ToDoList = ({userToken}) => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchAllHabits(userToken)
      .then((response) => {
        setIsLoading(false)
        setHabits(response.habits)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userToken]);


  return (
    <ScrollView style={styles.container}>
      <AnimatedCat/>
      <Progress/>
      <Text style={styles.heading}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.habitId}
        renderItem={({ item }) => (
          <View style={styles.habitContainer}>
            <Text style={styles.habitText}>Text: {item.name}</Text>
            <TouchableOpacity >
              <Text>✅</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text>✏️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <AddHabit userToken={userToken} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  habitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  habitText: {
    fontSize: 16,
    color: "black",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default ToDoList;
