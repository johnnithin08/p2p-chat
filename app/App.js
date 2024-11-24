import BareProvider from "./src/component/BareProvider";
import HomeScreen from "./src/screen/HomeScreen";
import { Provider } from "react-redux";

import { rpcHandler } from "./src/lib/rpc";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <BareProvider rpcHandler={rpcHandler}>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </BareProvider>
  );
}
