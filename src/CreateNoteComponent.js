import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import firebase from "firebase";

const CreateNoteComponent = (props) => {
  console.log(props);
  const [newNoteText, setNewNoteText] = useState("");

  return (
    <View>
      <TextInput
        style={styles.textInputStyles}
        autoCorrect={false}
        autoCapitalize="none"
        multiline={true}
        value={newNoteText}
        onChangeText={(currentText) => {
          setNewNoteText(currentText);
        }}
      />

      <View>
        <Button
          style={styles.button}
          title={"Create Note"}
          onPress={() => {
            // Store the text on firebase as well
            // /users/{id}/
            if (newNoteText !== "") {
              const loggedInUserId = firebase.auth().currentUser.uid;
              const pathForData = `/users/${loggedInUserId}/`;

              firebase.database().ref(pathForData).push({
                date: new Date().toDateString(),
                text: newNoteText,
              });
              setNewNoteText("");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 2,
    width: 320,
    height: 140,
    borderRadius: 10,
    padding: 15,
    fontSize: 30,
  },
  button: {
    marginTop: 10,
  },
});

export default CreateNoteComponent;
