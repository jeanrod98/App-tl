import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

import * as Speech from "expo-speech";


const Cuenta = ({ setMostrar }) => {
    const { sonido } = useAuth();

    useEffect(() => {
        if (sonido)  Speech.speak("Cuenta");

    }, []);

    return ( 

        <View style={styles.cuenta}>
            
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setMostrar("");
          }}
        >
          <AntDesign name="closecircle" size={24} color="red" />
        </TouchableOpacity>
        <View style={styles.txtTittle}>
          <Text style={{ color: "#303F9F", fontSize: 20, fontWeight: "700" }}>
            CUENTA
          </Text>
        </View>

     
        </View>
     );
}
 
export default Cuenta;
const styles = StyleSheet.create({
    cuenta: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    txtTittle: {
      // backgroundColor: "red",
      height: 80,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
   
    btnClose: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 2,
    },
    opcionesContenedor: {
      display: "flex",
      gap: 20,
      marginTop: 20,
      // backgroundColor: "red",
    },
  
    opciones: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 10,
      // backgroundColor: "red",
      paddingHorizontal: 20,
    },
    txtOption: {
      fontSize: 16,
      fontWeight: "700",
    },
  });
  