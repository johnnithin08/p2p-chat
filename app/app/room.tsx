import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Room } from "../src/screen/Room";
import HomeScreen from "../src/screen/HomeScreen";

const room = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Room />
    </SafeAreaView>
  );
};

export default room;
