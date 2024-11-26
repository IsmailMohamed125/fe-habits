import { View, Text, FlatList } from "react-native";
// import AntDesign from "@expo/vector-icons/AntDesign";

export default function HabitsList({ habits }) {
  return (
    <View className="m-4">
      <FlatList
        data={habits}
        renderItem={({ item }) => {
          return (
            <View
              className="flex-row items-center justify-between p-4 rounded-lg bg-secondary-light mb-4"
              key={item.id}
            >
              <Text className="text-primary-dark text-xl">{item.name}</Text>
              {/* <AntDesign name="check" size={24} color="black" /> */}
            </View>
          );
        }}
      />
    </View>
  );
}
