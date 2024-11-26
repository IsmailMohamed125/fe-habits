import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useRouter } from "expo-router"; // Hook for navigation
import { Controller, useForm } from "react-hook-form";
import RadioGroup from "react-native-radio-buttons-group";
import { RadioButton } from "react-native-paper";
import { postHabit } from "../api";

const HabitDetailsScreen = ({ userToken }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    postHabit(userToken, {...data, completed: false})
    reset({
      name: "",
      build: "",
      frequency: "",
      difficulty: "",
      completed: false,
    });
  };

  const buildOrBreak = [
    { label: "Build", value: "true" },
    { label: "Break", value: "false" },
  ];

  const frequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Habit</Text>
      <View>
        <Text style={styles.groupLabel}>Habit name:</Text>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Enter your data"
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.groupLabel}>Build or break:</Text>
        <Controller
          control={control}
          name="build"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.row}>
                <RadioButton.Item
                  label={buildOrBreak[0].label}
                  value={buildOrBreak[0].value}
                  style={styles.radioItem}
                />
                <RadioButton.Item
                  label={buildOrBreak[1].label}
                  value={buildOrBreak[1].value}
                  style={styles.radioItem}
                />
              </View>
            </RadioButton.Group>
          )}
        />
      </View>
      <View>
        <Text style={styles.groupLabel}>Frequency:</Text>
        <Controller
          control={control}
          name="frequency"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.row}>
                <RadioButton.Item
                  label={frequencyOptions[0].label}
                  value={frequencyOptions[0].value}
                  style={styles.radioItem}
                />
                <RadioButton.Item
                  label={frequencyOptions[1].label}
                  value={frequencyOptions[1].value}
                  style={styles.radioItem}
                />
              </View>
            </RadioButton.Group>
          )}
        />
      </View>
      <View>
        <Text style={styles.groupLabel}>Difficulty:</Text>
        <Controller
          control={control}
          name="difficulty"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.row}>
                <RadioButton.Item
                  label={difficultyOptions[0].label}
                  value={difficultyOptions[0].value}
                  style={styles.radioItem}
                />
                <RadioButton.Item
                  label={difficultyOptions[1].label}
                  value={difficultyOptions[1].value}
                  style={styles.radioItem}
                />
                <RadioButton.Item
                  label={difficultyOptions[2].label}
                  value={difficultyOptions[2].value}
                  style={styles.radioItem}
                />
              </View>
            </RadioButton.Group>
          )}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  radioGroup: {
    marginBottom: 20,
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
});

export default HabitDetailsScreen;
