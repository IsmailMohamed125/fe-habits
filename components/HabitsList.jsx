import { View, Text, FlatList } from "react-native";

// import AntDesign from "@expo/vector-icons/AntDesign";

import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api";

export default function HabitsList({ habits, setReload }) {
  const [habitsData, setHabitsData] = useState(habits);
  const [toggleCompletedId, setToggleCompletedId] = useState("");
  const { getToken } = useAuth();

  const toggleCheckbox = (id) => {
    const updatedHabit = habitsData.filter(
      // eslint-disable-next-line prettier/prettier
      (habit) => habit._id === id
    );
    setToggleCompletedId(updatedHabit[0]);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const abortController = new AbortController();

    const patchHabits = async () => {
      try {
        const token = await getToken();
        const data = { completed: !toggleCompletedId.completed };

        const response = await axiosInstance.patch(
          `/habit/${toggleCompletedId.id}`,
          data,
          {
            signal: abortController.signal,
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your token
            },
            // eslint-disable-next-line prettier/prettier
          }
        );

        if (response.status === 200) {
          setReload((val) => !val);
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
    };

    patchHabits();

    return () => abortController.abort("Data fetching cancelled");
  }, [toggleCompletedId]);

  const renderItem = ({ item }) => {
    return (
      <View
        className={
          item.completed
            ? "flex-row items-center justify-between p-4 rounded-lg bg-secondary mb-4"
            : "flex-row items-center justify-between p-4 rounded-lg bg-secondary-light mb-4"
        }
        key={item._id}
      >
        <Text className="text-primary-dark text-xl">{item.name}</Text>
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
      />
    </View>
  );
}
