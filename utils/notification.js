import * as Notifications from "expo-notifications";

export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function setupNotification(hour, minute) {
  const hasPermission = await requestPermissions();
  if (hasPermission) {
    console.log("Cancelling all existing notifications...");
    await Notifications.cancelAllScheduledNotificationsAsync();

    console.log("Scheduling a new daily notification...");
    console.log(hour, minute);
    await scheduleDailyNotification(hour, minute);
  } else {
    alert("Notifications are not enabled. Please enable them in settings.");
  }
}

export async function scheduleDailyNotification(hour, minute) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  const notificationTime = new Date();
  notificationTime.setHours(hour, minute, 0, 0);

  if (now > notificationTime) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Habit Reminder",
      body: "Don't forget to log your habits for today!",
    },
    trigger: notificationTime,
  });

  console.log("Notification scheduled for:", notificationTime.toLocaleString());
}
