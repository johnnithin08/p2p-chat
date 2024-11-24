import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { router } from "expo-router";
import { addRoomTopic } from "../redux/roomSlice";
import { useBackend } from "../component/BareProvider";
import { resetMessages } from "../redux/messageSlice";

export const HomeScreen = () => {
  const backend = useBackend();
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [roomName, setRoomName] = useState("");

  const dispatch = useAppDispatch();

  const { roomTopic, roomTopicIn, peersCount } = useAppSelector(
    (state) => state.room
  );

  const snapPoints = useMemo(() => ["30%"], []);

  const openBottomSheet = () => {
    console.log("Opening BottomSheetModal", bottomSheetModalRef);
    bottomSheetModalRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleJoinRoom = useCallback(() => {
    handleTopic(roomTopicIn);
    backend.joinRoom(roomName, handleTopic);
    closeBottomSheet();
    setRoomName("");
  }, [backend, roomTopicIn]);

  const handleTopic = useCallback((topic) => {
    dispatch(addRoomTopic(topic));
    dispatch(resetMessages());
    router.replace("room");
  }, []);

  const handleCreateRoom = useCallback(() => {
    backend.createRoom(handleTopic);
    dispatch(resetMessages());
    closeBottomSheet();
  }, [backend]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat Rooms</Text>
        <Pressable onPress={openBottomSheet}>
          <MaterialIcons name="add" size={24} color="black" />
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <View style={styles.bottomSheetContent}>
          {isJoiningRoom ? (
            <View style={styles.joinRoomContainer}>
              <Text style={styles.bottomSheetTitle}>Join Room</Text>
              <BottomSheetTextInput
                style={styles.textInput}
                placeholder="Enter Room Name"
                value={roomName}
                onChangeText={setRoomName}
              />
              <TouchableOpacity
                style={styles.joinButton}
                onPress={handleJoinRoom}
              >
                <Text style={styles.buttonText}>Join Room</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsJoiningRoom(false)}>
                <Text style={styles.cancelText}>Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setIsJoiningRoom(true)}
              >
                <Text style={styles.buttonText}>Join Room</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleCreateRoom}
              >
                <Text style={styles.buttonText}>Create Room</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#0aa",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  joinRoomContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: "#0aa",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cancelText: {
    marginTop: 15,
    textAlign: "center",
    color: "#555",
  },
  bottomSheetBackground: {
    backgroundColor: "#f8f8f8",
  },
});
