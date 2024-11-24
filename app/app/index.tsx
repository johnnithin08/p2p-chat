import { Provider } from "react-redux";
import BareProvider from "../src/component/BareProvider";
import { HomeScreen } from "../src/screen/Home";

import { rpcHandler } from "../src/lib/rpc";
import { store } from "../src/redux/store";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
