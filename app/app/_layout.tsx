import { Provider } from "react-redux";
import BareProvider from "../src/component/BareProvider";
import HomeScreen from "../src/screen/HomeScreen";

import { rpcHandler } from "../src/lib/rpc";
import { store } from "../src/redux/store";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <BareProvider rpcHandler={rpcHandler}>
      <Provider store={store}>
        <Slot />
      </Provider>
    </BareProvider>
  );
}
