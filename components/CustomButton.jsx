import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, style, icon }) {
  const defaultStyles =
    "flex-row  items-center  p-4 w-full rounded-lg bg-secondary ";
  return (
    <TouchableOpacity
      onPress={onPress}
      className={style ? `${defaultStyles} ${style}` : `${defaultStyles}`}
    >
      {icon && icon}
      <Text className="font-semibold text-lg text-center text-primary-dark flex-1 ">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
