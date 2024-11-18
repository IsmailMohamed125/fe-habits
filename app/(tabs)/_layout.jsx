import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" options={{ headerShown: false }} />
        <Tabs.Screen name="calender" options={{ headerShown: false }} />
        <Tabs.Screen name="settings" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
};

export default TabsLayout;
