import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: [] as IMessage[],
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.push(action.payload);
    },
    resetMessages: (state) => {
      state.length = 0;
    },
  },
});

export const { addMessage, resetMessages } = messagesSlice.actions;
