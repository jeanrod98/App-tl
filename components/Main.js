import { View } from "react-native";
import Welcome from "../screens/Welcome";
import MenuLogin from "./MenuLogin";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../Hooks/useAuth";

const Main = () => {
  const { inicio, setInicio } = useAuth();

  useEffect(() => {
    mostrarWelcome();
  }, []);
  const mostrarWelcome = async () => {
    try {
      const welcome = await AsyncStorage.getItem("welcome");
      //    console.log("inicio");

      if (welcome === "false") {
        setInicio(welcome);
        //    console.log(welcome);
      } else {
        setInicio("true");
        //    console.log(welcome);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {inicio === "true" ? <Welcome setInicio={setInicio} /> : <MenuLogin />}
    </View>
  );
};

export default Main;
