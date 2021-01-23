import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NotesScreenComponent from "./src/NotesScreenComponent";
import firebase from "firebase";
import LoginScreenComponent from "./src/LoginScreenComponent";

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  if (firebase.apps.length === 0) {
    var firebaseConfig = {
      apiKey: "AIzaSyCeKy1Tj_GeePv60VQXJmWzRIfW5V9NudM",
      authDomain: "rn-notes-3007-7edec.firebaseapp.com",
      databaseURL: "https://rn-notes-3007-7edec.firebaseio.com",
      projectId: "rn-notes-3007-7edec",
      storageBucket: "rn-notes-3007-7edec.appspot.com",
      messagingSenderId: "368541701184",
      appId: "1:368541701184:web:0b499b880a7f81cbdf3ba5",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user === null) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  });

  if (userLoggedIn) {
    return (
      <View style={styles.container}>
        <NotesScreenComponent />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <LoginScreenComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
