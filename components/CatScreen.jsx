import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import FastImage from "expo-fast-image";

function useImages(localAssets) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImages = () => {
      try {
        localAssets.forEach((asset) => Image.resolveAssetSource(asset));
        if (isMounted) setLoaded(true);
      } catch (error) {
        console.error("Error resolving local assets:", error);
        if (isMounted) setLoaded(false);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [localAssets]);

  return loaded;
}

const CatScreen = ({ progress }) => {
  // const completedHabits = habits.filter((habit) => habit.completed === true);
  // const progress = (completedHabits.length * 100) / habits.length;
  const imagesLoaded = useImages([
    require("../assets/images/daily-cat/0.gif"),
    require("../assets/images/daily-cat/10.gif"),
    require("../assets/images/daily-cat/20.gif"),
    require("../assets/images/daily-cat/30.gif"),
    require("../assets/images/daily-cat/40.gif"),
    require("../assets/images/daily-cat/50.gif"),
    require("../assets/images/daily-cat/67.gif"),
    require("../assets/images/daily-cat/80.gif"),
    require("../assets/images/daily-cat/completed.gif"),
  ]);

  let catImageSource;
  switch (true) {
    case progress === 0:
      catImageSource = require("../assets/images/daily-cat/0.gif");
      break;
    case progress >= 10 && progress < 20:
      catImageSource = require("../assets/images/daily-cat/10.gif");
      break;
    case progress >= 20 && progress < 30:
      catImageSource = require("../assets/images/daily-cat/20.gif");
      break;
    case progress >= 30 && progress < 40:
      catImageSource = require("../assets/images/daily-cat/30.gif");
      break;
    case progress >= 40 && progress < 50:
      catImageSource = require("../assets/images/daily-cat/40.gif");
      break;
    case progress >= 50 && progress < 67:
      catImageSource = require("../assets/images/daily-cat/50.gif");
      break;
    case progress >= 67 && progress < 80:
      catImageSource = require("../assets/images/daily-cat/67.gif");
      break;
    case progress >= 80 && progress < 100:
      catImageSource = require("../assets/images/daily-cat/80.gif");
      break;
    case progress === 100:
      catImageSource = require("../assets/images/daily-cat/completed.gif");
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      <FastImage source={catImageSource} style={styles.gif} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 390,
    height: 221,
    margin: 15,
    borderRadius: 10,
  },
});

export default CatScreen;
