import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { View, Text, TextInput } from "react-native";
import CustomButton from "../../components/CustomButton";
import Divider from "../../components/Divider";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  }, [isLoaded, emailAddress, password]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center px-5 gap-3 bg-primary"
    >
      <View className="mx-4 items-center">
        <Text className="font-bold text-3xl text-secondary">
          Sign into Habits App
        </Text>
        <Text className="text-base text-secondary-light font-medium">
          Welcome back! Please sign in to continue
        </Text>
      </View>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        className="p-5 w-full rounded-lg text-primary-dark placeholder:text-slate-500 bg-slate-300"
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        className="p-5 w-full rounded-lg text-primary-darkdark placeholder:text-slate-500 bg-slate-300"
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Divider />

      <CustomButton title="Sign In" onPress={onSignInPress} />
      <Text className="text-center text-slate-300 font-bold">OR</Text>
      <SignInWithOAuth
        icon={
          <MaterialCommunityIcons
            name="google"
            size={20}
            color="#2E3239"
            style={{ position: "absolute", left: 8, top: "50%" }}
          />
        }
      />

      <Divider />

      <View className="w-full items-center justify-center">
        <Text className="font-semibold text-slate-300">
          Don't have an account?
        </Text>
        <Link href="/sign-up">
          <Text className="font-bold text-secondary-light">Sign up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
