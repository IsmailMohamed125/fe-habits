import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import JournalEntries from "../../components/JournalEntries";
import JournalEntryById from "../../components/JournalEntryById";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddJournalEntry from "../../components/AddJournalEntry";
import NewEntry from "../../components/NewEntry";

export default function Journal() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Journal</Text>
      </View>
      <View style={styles.navigationContainer}>
        <NavigationIndependentTree>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="JournalEntries"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="JournalEntries" component={JournalEntries} />
              <Stack.Screen
                name="JournalEntryById"
                component={JournalEntryById}
              />
              <Stack.Screen
                name="AddJournalEntry"
                component={AddJournalEntry}
              />
              <Stack.Screen name="NewEntry" component={NewEntry} />
            </Stack.Navigator>
          </NavigationContainer>
        </NavigationIndependentTree>
      </View>

      <AddJournalEntry />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3239",
  },
  header: {
    width: "100%",
    backgroundColor: "#2E3239",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#AED8FF",
    marginTop: 20,
  },
  navigationContainer: {
    flex: 1,
    width: "100%",
  },
  stackHeader: {
    backgroundColor: "#2E3239",
  },
  stackHeaderText: {
    fontSize: 18,
    color: "#2E3239",
  },
  gif: {
    width: 390,
    height: 221,
    marginTop: 20,
    borderRadius: 10,
  },
});
