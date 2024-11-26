import { TextInput, Platform, View, Text, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import CustomButton from "../../components/CustomButton";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "../../components/Divider";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        // eslint-disable-next-line prettier/prettier
        "Looks like you entered the wrong code! \n\nPlease try again"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center px-5  bg-primary"
    >
      {!pendingVerification && (
        <>
          <View className="m-4 items-center">
            <Text className="font-bold text-3xl text-secondary">
              Create your account
            </Text>
            <Text className="text-base text-secondary-light font-medium">
              Welcome! Please fill in the details to get started.
            </Text>
          </View>
          <View className="gap-4">
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              className="p-5 w-full rounded-lg text-primary-dark placeholder:text-slate-500 bg-slate-300"
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              value={password}
              className="p-5 w-full rounded-lg text-primary-dark placeholder:text-slate-500 bg-slate-300"
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Divider />

            <CustomButton title="Sign Up" onPress={onSignUpPress} />
            <Text className="text-center text-slate-300 font-bold">OR</Text>
            <SignInWithOAuth
              icon={
                <MaterialCommunityIcons
                  name="google"
                  size={18}
                  color="#2E3239"
                  style={{ position: "absolute", left: 8, top: "50%" }}
                />
              }
            />
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <Text className="mb-5 text-secondary text-center text-lg font-bold">
            A verification code was sent to your email. Please enter it below.
          </Text>
          <TextInput
            value={code}
            className="p-5 w-full mb-5 rounded-lg text-primary-dark placeholder:text-slate-500 bg-slate-300"
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <CustomButton title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </KeyboardAvoidingView>
  );
}
