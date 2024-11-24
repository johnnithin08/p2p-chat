import { configureStore } from "@reduxjs/toolkit";
import { messagesSlice } from "./messageSlice";
import { roomSlice } from "./roomSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    room: roomSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
