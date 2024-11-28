import { View, Text, FlatList, Pressable, ScrollView } from "react-native";

import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api";

export default function HabitsList({
  habits,
  setReload,
  handlePresentModalPress,
}) {
  const [habitsData, setHabitsData] = useState(habits);
  const { getToken } = useAuth();

  const toggleCheckbox = (id) => {
    const updatedHabit = habitsData.filter(
      // eslint-disable-next-line prettier/prettier
      (habit) => habit._id === id
    );
    const updatedHabits = habitsData.map((habit) =>
      // eslint-disable-next-line prettier/prettier
      habit._id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabitsData(updatedHabits);
    patchHabitCompleted(updatedHabit[0]);
  };

  async function patchHabitCompleted(habit) {
    // eslint-disable-next-line no-undef
    const abortController = new AbortController();
    try {
      const token = await getToken();
      const data = { completed: !habit.completed };

      const response = await axiosInstance.patch(`/habit/${habit.id}`, data, {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your token
        },
        // eslint-disable-next-line prettier/prettier
      });

      if (response.status === 200) {
        setReload((cur) => !cur);
        // setHabits(response.data.data.habits);
        // setIsLoading(false);

        return;
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.log(error);
      if (abortController.signal.aborted) {
        console.log("Data fetching cancelled list");
      }
    }
  }

  // function handleHabitPress(habit) {
  //   setCurHabit(habit);
  //   // handlePresentModalPress();
  // }

  const renderItem = ({ item }) => {
    return (
      <View
        className={
          item.completed
            ? "flex-row items-center justify-between p-4 rounded-lg bg-secondary mb-4 "
            : "flex-row items-center justify-between p-4 rounded-lg bg-secondary-light mb-4"
        }
        key={item._id}
      >
        <Pressable onPress={() => handlePresentModalPress(item)}>
          <Text className="text-primary-dark text-xl font-psemibold">
            {item.name}
          </Text>
        </Pressable>
        <Checkbox
          style={{ margin: 8 }}
          value={item.completed}
          onValueChange={() => toggleCheckbox(item._id)}
          color={item.completed === true ? "#4630EB" : undefined}
        />
      </View>
    );
  };

  return (
    <View className="m-4">
      <FlatList
        data={habitsData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
      />
    </View>
  );
}
