import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HabitInfo({ habit }) {
  return (
    <View className="flex-1 gap-10">
      <Text className="text-primary-dark text-center text-3xl font-pbold">
        {habit.name}
      </Text>
      {habit.build ? (
        <View className="flex-row items-center gap-5">
          <Ionicons name="build" size={35} color="black" />
          <Text className="text-primary-dark text-2xl font-psemibold">
            Build
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center gap-5">
          <FontAwesome name="chain-broken" size={35} color="black" />
          <Text className="text-primary-dark text-2xl font-psemibold">
            Break
          </Text>
        </View>
      )}
      <View className="flex-row items-center gap-5">
        <Ionicons name="today" size={35} color="black" />
        <Text className="text-primary-dark text-2xl font-psemibold">
          {habit.frequency[0].toUpperCase() + habit.frequency.slice(1)}
        </Text>
      </View>
      <View className="flex-row items-center gap-5">
        <Ionicons name="warning" size={35} color="black" />
        <Text className="text-primary-dark text-2xl font-psemibold">
          {habit.difficulty[0].toUpperCase() + habit.difficulty.slice(1)}
        </Text>
      </View>
    </View>
  );
}
