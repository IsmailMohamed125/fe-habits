import { useAuth, useUser } from "@clerk/clerk-expo";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (err) {
      Alert.alert(
        "Sign Out Error",
        // eslint-disable-next-line prettier/prettier
        "There was an error signing out. Please try again."
      );
      console.error("Sign Out Error:", err);
    }
  };

  return (
    <ParallaxScrollView
      headerImage={
        <Ionicons size={350} name="cog" style={styles.headerImage} />
      }
    >
      <View style={styles.titleContainer}>
        <Text className="font-bold text-3xl text-secondary">Settings</Text>
        <Text className="text-base text-secondary-light font-medium">
          Signed in as {user?.emailAddresses[0].emailAddress}.
        </Text>
      </View>
      <CustomButton
        title="Sign out"
        onPress={onSignOutPress}
        style={"bg-primary"}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
