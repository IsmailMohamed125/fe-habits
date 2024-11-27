import { Slot } from "expo-router";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import "../global.css";
import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();
// eslint-disable-next-line no-undef
setTimeout(SplashScreen.hideAsync, 5000);

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    // eslint-disable-next-line prettier/prettier
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      setStatusBarStyle("light");
    }, 0);
  }, []);
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
