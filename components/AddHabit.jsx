import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { RadioButton } from "react-native-paper";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api";
import { useEffect } from "react";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

const AddHabit = ({ setModalVisible, setReload, habit }) => {
  const { control, handleSubmit, reset } = useForm();
  const { getToken } = useAuth();
  const { dismiss } = useBottomSheetModal();

  useEffect(() => {
    if (habit) {
      reset({
        name: `${habit.name}`,
        build: `${habit.build}`,
        frequency: `${habit.frequency}`,
        difficulty: `${habit.difficulty}`,
      });
    } else {
      reset({
        name: "",
        build: "",
        frequency: "",
        difficulty: "",
        completed: false,
      }); // Clear form for adding
    }
  }, [habit, reset]);
  const onSubmit = async (data) => {
    try {
      // setIsLoading(true);
      const token = await getToken();
      const newHabit = { ...data, completed: false };
      // console.log(newHabit);

      const response = await axiosInstance.post(`/habit`, newHabit, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your token
        },
      });
      // console.log(response);

      if (response.status === 201) {
        reset({
          name: "",
          build: "",
          frequency: "",
          difficulty: "",
          completed: false,
        });
        setReload((cur) => !cur);
        setModalVisible?.(false);
        return;
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitPatch = async (data) => {
    try {
      const token = await getToken();
      const editHabit = {
        ...data,
        completed: false,
      };

      const response = await axiosInstance.patch(
        `/habit/${habit.id}`,
        editHabit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // eslint-disable-next-line prettier/prettier
        }
      );
      // console.log(response);

      if (response.status === 200) {
        setReload((cur) => !cur);
        dismiss();
        // setModalVisible(false);
        return;
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.log(error);
    }
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
    <>
      <Text style={styles.title}>{habit ? "Edit habit" : "Add habit"}</Text>
      <View>
        <Text style={styles.groupLabel}>Habit name:</Text>
        <Controller
          control={control}
          defaultValue=""
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={(value) => onChange(value)}
              value={value}
              style={styles.input}
              placeholder="Enter habit name"
              placeholderTextColor="#64748b"
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.groupLabel}>Build or break:</Text>
        <Controller
          control={control}
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
          name="difficulty"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
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
              </ScrollView>
            </RadioButton.Group>
          )}
        />
      </View>
      <View className="flex-row items-center justify-end gap-8 mt-2">
        {habit ? (
          <>
            <TouchableOpacity
              className="py-3 px-5 rounded-lg bg-slate-400"
              onPress={() => dismiss()}
            >
              <Text className="font-medium text-lg text-center text-primary-dark">
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 rounded-lg bg-slate-300"
              onPress={handleSubmit(onSubmitPatch)}
            >
              <Text className="font-semibold text-lg text-center text-primary-dark">
                Submit
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className="py-3 px-5 rounded-lg bg-slate-400"
              onPress={() => setModalVisible(false)}
            >
              <Text className="font-medium text-lg text-center text-primary-dark">
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 rounded-lg bg-slate-300"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="font-semibold text-lg text-center text-primary-dark">
                Submit
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#5F7ADB",
    overflow: "scroll",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#26292B",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#cbd5e1",
  },
  radioGroup: {
    marginBottom: 20,
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 600,
    color: "#2E3239",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioItem: {
    color: "#2E3239",
  },
});

export default AddHabit;
