import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) return <Redirect href={"/(home)"} />;
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign in",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Create a new account",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#2E3239",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
