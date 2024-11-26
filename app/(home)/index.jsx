import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToDoList from "../../components/ToDoList";
import { useEffect, useState } from "react";
import { testApi } from "../../api";

export default function Index() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [userBE, setUserBE] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    async function test() {
      const token = await getToken();
      setUserToken(token)
      const userData = await testApi(token);
      setUserBE(userData);
    }
    test();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Text>Home</Text>
      <View>
        {user && (
          <>
            <ToDoList userToken={userToken} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
