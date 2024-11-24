import { Provider } from "react-redux";
import BareProvider from "../src/component/BareProvider";
import HomeScreen from "../src/screen/HomeScreen";

import { rpcHandler } from "../src/lib/rpc";
import { store } from "../src/redux/store";
import { View } from "react-native";
import { PropsWithChildren } from "react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <BareProvider rpcHandler={rpcHandler}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </Provider>
    </BareProvider>
  );
}
