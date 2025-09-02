import React, { useState } from "react";
import { View, TextInput, Button, Platform, Alert } from "react-native";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const encodeText = (inputText: string): string => {
    // Replace special characters with unique placeholders
    return inputText
      .replace(/\n/g, '|||NEWLINE|||')      // Replace newlines
      .replace(/\t/g, '|||TAB|||')          // Replace tabs
      .replace(/ {4}/g, '|||INDENT4|||')    // Replace 4-space indents
      .replace(/ {2}/g, '|||INDENT2|||')    // Replace 2-space indents
      .replace(/ /g, '|||SPACE|||');        // Replace remaining single spaces
  };

  const sendText = () => {
    if (Platform.OS === "android") {
      const timestamp = new Date().toISOString();
      const uniqueId = Math.random().toString(36).substr(2, 9);
      
      // Encode the text to remove spaces and newlines
      const encodedText = encodeText(text);
      
      console.log(`RNKeyboardApp_ENCODED: ${timestamp}|${uniqueId}|${encodedText}`);
      setText("");
    } else {
      Alert.alert("Notice", "USB typing works only on Android with ADB");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <TextInput
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          fontSize: 18,
          borderColor: '#ccc',
          borderRadius: 5,
          color: 'white',
          backgroundColor: '#333',
        }}
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
        placeholderTextColor="#999"
      />
      <Button title="Send to Laptop" onPress={sendText} />
    </View>
  );
}
