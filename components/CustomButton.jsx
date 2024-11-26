import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, style, icon }) {
  const defaultStyles = "p-3 w-full rounded-lg bg-secondary ";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={style ? `${style} ${defaultStyles}` : `${defaultStyles}`}
    >
      {icon && icon}
      <Text className="font-semibold text-lg text-center text-primary-dark  ">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
