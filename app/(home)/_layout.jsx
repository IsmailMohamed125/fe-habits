import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Redirect href={"/(auth)/onboarding"} />;
  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <Tabs
        screenOptions={{
          header: () => null,
          tabBarLabelStyle: {
            zIndex: 100,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: "#5F7ADB",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#26292B",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color }) => (
              <Ionicons name="analytics-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: "Journal",
            tabBarIcon: ({ color }) => (
              <Ionicons name="book-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
