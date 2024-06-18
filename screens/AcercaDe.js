import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import fondo_clientes from "../assets/fondo_clientes.jpg"
import * as Speech from "expo-speech";

const AcercaDe = ({ setMostrar }) => {
  const { sonido } = useAuth();

  useEffect(() => {
    if (sonido) Speech.speak("Acerca de nosotros");
  }, []);

  return (
    <ImageBackground
    source={fondo_clientes} resizeMode="contain"  imageStyle={{ opacity: 0.2, }}
     style={styles.acercaDe}>
      <TouchableOpacity
        style={styles.btnClose}
        onPress={() => {
          setMostrar("");
        }}
      >
        <AntDesign name="closecircle" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.txtTittle}>
        <Text style={{ color: "#303F9F", fontSize: 24, fontWeight: "700" }}>
          Sobre nosotros
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, color: "#303F9F", fontWeight: "700"}}>APLICACIÓN MÓVIL DE TERAPIA DE LENGUAJE EN NIÑOS</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: "#242424", fontWeight: "600", lineHeight: 24}}>
            Es un aplicativo movil que nace como proyecto de tesis y está enfocado a niños con problemas del habla.
            Le ofrece una serie de módulos de terapia del habla. Esta aplicación
            ofrece actividades de aprendizaje divertidas e interactivas que
            enseñan:
          </Text>
        </View>
        <View style={{
          paddingHorizontal: 20,
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 10,
        }}>
          <Text style={{ fontSize: 14, color: "#242424", fontWeight: "600", lineHeight: 24 , fontWeight: "700"}}>
            Alfabeto, Transporte, Colores, Figuras Geométricas, Números, entre
            otros.
          </Text>
          <Text style={{ fontSize: 14, color: "#242424", fontWeight: "600", lineHeight: 24 }}> 
            Además es adaptable y cada módulo es facil de aprender, preciso, sin
            anuncios.
          </Text>

          <Text style={{ fontSize: 14, color: "#242424", fontWeight: "600", lineHeight: 24 }}>Para edades desde 3 años en adelante</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AcercaDe;
const styles = StyleSheet.create({
  acercaDe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  txtTittle: {
    // backgroundColor: "red",
    height: 60,
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
