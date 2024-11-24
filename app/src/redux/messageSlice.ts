import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: [] as IMessage[],
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
