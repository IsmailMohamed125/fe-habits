import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";

const AnimatedCat = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/cat-no-border.gif")} style={styles.gif} />
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
  },
});

export default AnimatedCat;
