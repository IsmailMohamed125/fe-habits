
import React from "react";
import { View, StyleSheet, Image } from "react-native";


const CatScreen = ({habits}) => {
    const completedHabits = habits.filter((habit) => habit.completed === true)
    const progress = (completedHabits.length * 100) / habits.length
    let catImageSource = require("../assets/images/regular-cat.gif")

    if (progress <34 && progress > 29){
        catImageSource = require("../assets/images/confetti-cat.gif")
    }
    else if (progress <= 50 && progress < 70){
        catImageSource = require("../assets/images/charmander-cat.gif")
    }
    else if (progress ===100){
        catImageSource = require("../assets/images/confetti-cat.gif")
    }
  return (
    <View style={styles.container}>
      <Image source={catImageSource} style={styles.gif} />
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
