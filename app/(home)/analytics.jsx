import { useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
import TabButton from "../../components/TabButton";

export default function Analytics() {
  const [active, setActive] = useState("overall");

  // const [showOverall, setShowOverall] = useState(true);
  // const [showDaily, setShowDaily] = useState(false);
  // const [showWeekly, setShowWeekly] = useState(false);

  const chartConfig = {
    backgroundColor: "#5F7ADB",
    backgroundGradientFrom: "#5F7ADB",
    backgroundGradientTo: "#A2B2EE",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#A2B2EE",
    },
  };
  const screenWidth = Dimensions.get("window").width;
  const overallLineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
    ],
    datasets: [
      {
        data: [45, 60, 30, 80, 90, 43, 60, 72, 82, 77, 68],
      },
    ],
  };
  const dailyLineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
    ],
    datasets: [
      {
        data: [35, 50, 20, 75, 88, 33, 50, 62, 77, 72, 63],
      },
    ],
  };
  const weeklyLineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
    ],
    datasets: [
      {
        data: [55, 70, 40, 85, 92, 53, 70, 82, 87, 82, 83],
      },
    ],
  };
  const dailyProgressData = {
    labels: ["Journal", "Vitamins", "Water"], // optional
    data: [0.4, 0.8, 0.6],
  };
  const weeklyProgressData = {
    labels: ["Clean", "Hiking", "Meal Prep"], // optional
    data: [0, 0.6, 0.8],
  };
  const StackedData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    legend: ["Daily", "Weekly"],
    data: [
      [40, 50],
      [65, 75],
      [62, 80],
      [68, 72],
    ],
    barColors: ["#cbd5e1", "#94a3b8"],
  };
  const onTabPress = (name) => setActive(name);

  return (
    <ScrollView className="flex-1 bg-primary ">
      <View className="flex-row items-center gap-3 mx-3 my-2">
        <TabButton title="Overall" onTabPress={onTabPress} active={active} />
        <TabButton title="Daily" onTabPress={onTabPress} active={active} />
        <TabButton title="Weekly" onTabPress={onTabPress} active={active} />
      </View>
      {active === "overall" && (
        <>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Monthly progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Daily and weekly habits progress percentage combined
            </Text>
            <LineChart
              data={overallLineChartData}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Quarterly progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Daily and weekly habits progress percentage seperated
            </Text>
            <StackedBarChart
              data={StackedData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              yAxisInterval={1}
              style={{
                marginVertical: 8,
                borderRadius: 10,
              }}
            />
          </View>
        </>
      )}
      {active === "daily" && (
        <>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Monthly progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Daily habits progress percentage
            </Text>
            <LineChart
              data={dailyLineChartData}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Overall Habit Progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Daily habits progress percentage per habit
            </Text>

            <ProgressChart
              data={dailyProgressData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </>
      )}
      {active === "weekly" && (
        <>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Monthly progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Weekly habits progress percentage
            </Text>
            <LineChart
              data={weeklyLineChartData}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View className="mt-3">
            <Text className="mx-2 text-xl font-pbold text-slate-300">
              Overall Habit Progress
            </Text>
            <Text className="mx-2 text-base font-pregular text-slate-400">
              Weekly habits progress percentage per habit
            </Text>

            <ProgressChart
              data={weeklyProgressData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}
