import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, className, icon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-3 rounded-lg bg-secondary ${className}`}
    >
      {icon && icon}
      <Text className="font-semibold text-lg text-center text-primary-dark">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
