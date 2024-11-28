import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api/index";

export default function JournalEntryById({ route }) {
  const { journal_Id } = route.params;
  const { getToken } = useAuth();
  const [journalEntry, setJournalEntry] = useState({});
  const fetchJournalById = async (journal_id) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/journal/${journal_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournalEntry(response.data.data.journalEntry);
      return response.data.data.journalEntry;
    } catch (error) {
      console.error(
        "Error fetching journals:",
        error.response || error.message
      );
    }
  };
  if (journalEntry.hasOwnProperty("created_at")) {
    journalEntry.created_at = journalEntry.created_at.split("T")[0];
  }

  useEffect(() => {
    fetchJournalById(journal_Id);
  }, [journalEntry._id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{journalEntry.title}</Text>
      <Text style={styles.date}>{journalEntry.created_at}</Text>
      <Text style={styles.entry}>{journalEntry.entry}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2E3239",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#AED8FF",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#CBD5E1",
    marginBottom: 16,
  },
  entry: {
    fontSize: 16,
    lineHeight: 24,
    color: "#AED8FF",
  },
});
