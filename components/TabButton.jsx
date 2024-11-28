import { Text, Pressable } from "react-native";

export default function TabButton({ title, onTabPress, active }) {
  return (
    <Pressable
      onPress={() => onTabPress(title.toLowerCase())}
      className={
        active === title.toLowerCase()
          ? "bg-secondary py-2 px-4 rounded-3xl my-2"
          : "bg-slate-500 py-2 px-4 rounded-3xl my-2"
      }
    >
      <Text className="items-center text-base text-slate-200 font-psemibold">
        {title}
      </Text>
    </Pressable>
  );
}
