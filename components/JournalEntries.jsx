import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api/index";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import JournalEntryById from "./JournalEntryById";
import { useNavigation } from "@react-navigation/native";
import FastImage from "expo-fast-image";

export default function JournalEntries() {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();
  const navigation = useNavigation();

  let catImageSource = require("../assets/images/daily-cat/journal-cat.gif");

  const fetchJournals = async () => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setJournals(response.data.data.journalEntries);
      return response.data.data.journalEntries;
    } catch (error) {
      console.error(
        "Error fetching journals:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  journals.map((journal) => {
    const splitTime = journal.created_at.split("T");
    journal.created_at = splitTime[0];
  });

  const handleClick = (journal_Id) => {
    navigation.navigate("JournalEntryById", { journal_Id });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading journal entries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FastImage source={catImageSource} style={styles.gif} />
      <View style={styles.container}>
        <FlatList
          data={journals}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                onPress={() => {
                  handleClick(item._id);
                }}
                style={styles.itemContent}
              >
                <Image
                  style={styles.image}
                  source={require("../assets/images/note-pad.png")}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemSubtitle}>{item.created_at}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2E3239",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#2E3239",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#AED8FF",
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: "#C9E3FB",
  },
  gif: {
    width: "100%",
    height: 221,
    marginTop: 20,
    borderRadius: 10,
  },
});
