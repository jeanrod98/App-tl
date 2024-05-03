
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from "@react-navigation/native";
import Main from "./components/Main";

export default function App() {
  useEffect(() => {
    // Orienta la pantalla de modo horizontal
    const orientacionHorizontalApp = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      // console.log(orientation);
    };

    orientacionHorizontalApp();
  }, []);

  const [usuario, setUsuario] = useState(false);

  return (
    <NavigationContainer style={styles.container}>
      {!usuario ? (
        <Main/>
      ) : (
        <View>
          <Text>Menu</Text>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
