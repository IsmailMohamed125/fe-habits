import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import TabButton from "../../components/TabButton";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../api";
import { useAuth } from "@clerk/clerk-expo";
import HabitsList from "../../components/HabitsList";
import AddHabit from "../../components/AddHabit";
import AnimatedProgressWheel from "react-native-progress-wheel";
import CatScreen from "../../components/CatScreen";
import CustomBottomSheetModal from "../../components/CustomBottomSheetModal";
import {
  scheduleDailyNotification,
  setupNotification,
} from "../../utils/notification";

// import { KeyboardAvoidingView } from "react-native-web";

export default function Index() {
  // async function callProtectedAuthRequired() {
  //   const token = await window.Clerk.session.getToken({
  //     template: "testing-template",
  //   });
  //   console.log(token);
  // }
  const [active, setActive] = useState("daily");
  const [modalVisible, setModalVisible] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [reload, setReload] = useState(false);
  const [curHabit, setCurHabit] = useState({});
  const { getToken } = useAuth();
  const bottomSheetModalRef = useRef(null);

  const completedHabits = habits.filter((habit) => habit.completed === true);
  const progress = (completedHabits.length * 100) / habits.length;

  const handlePresentModalPress = useCallback((habit) => {
    setCurHabit(habit);
    bottomSheetModalRef.current?.present();
  }, []);

  const onTabPress = (name) => setActive(name);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const abortController = new AbortController();

    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();

        const response = await axiosInstance.get(`/habit?frequency=${active}`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        });

        if (response.status === 200) {
          setHabits(response.data.data.habits);
          setIsLoading(false);

          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.log(error);
        if (abortController.signal.aborted) {
          console.log("Data fetching cancelled home");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };

    fetchHabits();

    return () => abortController.abort("Data fetching cancelled");
  }, [active, reload]);
  // console.log(habits, "hi", active);

  useEffect(() => {
    const setupDailyNotifications = async () => {
      console.log("Setting up daily notification...");
      await setupNotification(16, 00);
    };

    setupDailyNotifications();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <View className="flex-row items-center justify-between mx-3">
        <Text className="text-3xl font-pblack text-slate-300">Cabitly</Text>
        <View className="">
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <AntDesign name="plus" size={24} color="#A2B2EE" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-[#0000008c]">
          <View className=" p-5 w-4/5 rounded-xl bg-secondary-light overflow-scroll">
            <AddHabit setModalVisible={setModalVisible} setReload={setReload} />
          </View>
        </View>
      </Modal>

      <View className="flex-row items-center gap-3 mx-3 my-2">
        <TabButton title="Daily" onTabPress={onTabPress} active={active} />
        <TabButton title="Weekly" onTabPress={onTabPress} active={active} />
      </View>
      <ScrollView>
        {isLoading && (
          <SafeAreaView className="absolute right-1/2 top-1/2">
            <ActivityIndicator size="large" color="#5F7ADB" />
          </SafeAreaView>
        )}
        {!isLoading && hasError && <Text> An error has occurred </Text>}
        {!isLoading && !hasError && habits.length > 0 && (
          <>
            <View className="items-center my-3">
              <CatScreen progress={progress} />
              <AnimatedProgressWheel
                size={170}
                width={20}
                color={"#5F7ADB"}
                max={100}
                rotation={"-90deg"}
                progress={progress}
                subtitle={"Completed"}
                showProgressLabel={true}
                showPercentageSymbol={true}
                labelStyle={{
                  color: "#cbd5e1",
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Poppins-SemiBold, sans-serif",
                }}
                subtitleStyle={{
                  color: "#cbd5e1",
                  fontSize: 16,
                  fontWeight: "500",
                  fontFamily: "Poppins-SemiBold, sans-serif",
                }}
                backgroundColor={"#A2B2EE"}
              />
            </View>
            <HabitsList
              habits={habits}
              setReload={setReload}
              handlePresentModalPress={handlePresentModalPress}
            />
            <CustomBottomSheetModal
              curHabit={curHabit}
              ref={bottomSheetModalRef}
              setReload={setReload}
            />
          </>
        )}
        {!isLoading && !hasError && !habits.length > 0 && (
          <Text>Add some habits</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
