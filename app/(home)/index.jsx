import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Text>Home</Text>
      <View>
        {user && (
          <>
            <Text>User ID: {user.id}</Text>
            <Text>First Name: {user.firstName}</Text>
            <Text>Last Name: {user.lastName}</Text>
            <Text>Full Name: {user.fullName}</Text>
            <Text>Email Address: {user.emailAddresses?.[0]?.emailAddress}</Text>
            <Text>Created At: {user.createdAt?.toString()}</Text>
            <Text>Updated At: {user.updatedAt?.toString()}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
