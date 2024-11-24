import { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useBackend } from "../component/BareProvider";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { createMessage } from "../lib/message";
import uiEvent, { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from "../lib/uiEvent";
import { setPeersCount } from "../redux/roomSlice";
import { addMessage } from "../redux/messageSlice";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

export const Room = () => {
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const backend = useBackend();
  const messages = useAppSelector((state) => state.messages);
  const { roomTopic, roomTopicIn, peersCount } = useAppSelector(
    (state) => state.room
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }) => {
        dispatch(addMessage({ ...message, memberId: memberId }));
      }
    );
    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count) => {
      dispatch(setPeersCount(count));
    });
    return () => {
      messageListener.off(RECEIVE_MESSAGE_UI);
      peerCountListener.off(CONNECTIONS_UI);
    };
  }, []);

  const appendMessage = (msg, local = false) => {
    if (msg.trim()) {
      const message = createMessage(msg, local);
      dispatch(addMessage(message as IMessage));
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      backend.sendMessage(inputText, appendMessage);
      setInputText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.roomTitle}>Chat Room</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="info" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.messageList}>
            <FlashList
              data={messages}
              showsVerticalScrollIndicator
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={
                      item.local
                        ? [styles.message, styles.myMessage]
                        : styles.message
                    }
                  >
                    <Text>{item?.memberId ?? "You"}</Text>
                    <Text selectable>{item.message}</Text>
                  </View>
                );
              }}
              estimatedItemSize={30}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chatroom Name</Text>
            <TextInput style={styles.modalText} value={roomTopic} />
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.msgInput}
          placeholder="Say something"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  messageList: {
    paddingVertical: 10,
    flex: 1,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#AAA",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  msgInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#0aa",
    padding: 10,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#0aa",
    padding: 10,
    borderRadius: 20,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
  },
});
