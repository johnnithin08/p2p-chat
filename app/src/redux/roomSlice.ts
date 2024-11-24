import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomTopic: "",
    roomTopicIn: "",
    peersCount: 0,
  },
  reducers: {
    addRoomTopic: (state, action: PayloadAction<string>) => {
      state.roomTopic = action.payload;
    },
    addRoomTopicIn: (state, action: PayloadAction<string>) => {
      state.roomTopicIn = action.payload;
    },
    setPeersCount: (state, action: PayloadAction<number>) => {
      state.peersCount = action.payload;
    },
  },
});

export const { addRoomTopic, addRoomTopicIn, setPeersCount } =
  roomSlice.actions;
