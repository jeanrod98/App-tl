import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState, createRef, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Card } from "react-native-paper";
import useAuth from "../Hooks/useAuth";
import conffeti from "../assets/confeti.json";
import LottieView from "lottie-react-native";

import * as Speech from "expo-speech";

const ModalColorDetalle = ({ colorSeleccionada, setColorSeleccionada }) => {
  const { dataAlert, setDataAlert, conffetiShow, setConffetiShow, sonido } =
    useAuth();

  const [arregloAbecedario, setArregloAbecedario] = useState([]);
  const [arregloAbecedarioTwo, setArregloAbecedarioTwo] = useState([]);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (sonido) {
      Speech.speak("Presiona la palabra para escuchar el nombre de éste color");
      // Speech.speak(`Elegiste el color ${colorSeleccionada.nombre}`);
    }
  }, []);

  const narrarAccion = async ( text ) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`)
    }
   
  }

  return (
    <>
      <View
        style={{
          ...styles.contenido,
          backgroundColor: colorSeleccionada.color,
        }}
      >
        <TouchableOpacity
          style={styles.btnClose}
          onLongPress={() => {
            Speech.stop();
            setColorSeleccionada({});
            if (sonido) Speech.stop();
          }}
          onPress={() => narrarAccion("Cerrar Ventana")}
        >
          <AntDesign
            name="closecircle"
            size={32}
            color={colorSeleccionada.color === "red" ? "white" : "red"}
          />
        </TouchableOpacity>

        <View style={styles.detalles}>
          {/* <Text style={{ fontSize: 16, fontWeight: "700"}}>{"Presiona las palabras para escuchar como suenan"}</Text> */}

          <View style={styles.header}>
            
          <Card style={{ ...styles.card, width: 50, height: 50 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                {colorSeleccionada.nombre.split("")[0]}
              </Text>
            </Card>

            <TouchableOpacity
              onPress={() => {
                if (sonido) Speech.speak(`${colorSeleccionada.nombre}`);
              }}
            >
              <Text style={{...styles.txtHeader, color: colorSeleccionada.color === "black" ? "#fff" : "#000"}}>{colorSeleccionada.nombre}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          {/* <View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
                onPress={() => Speech.speak(`${colorSeleccionada.letra}`)}
              >
                <Text style={styles.text}>{colorSeleccionada.letra}</Text>
                <Text style={styles.textMinuscula}>
                  {colorSeleccionada.minuscula}
                </Text>
              </TouchableOpacity>
            </View> */}
          {/* <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              {colorSeleccionada.palabras.map((palabra, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.btnText}
                    onPress={() =>
                      Speech.speak(`${colorSeleccionada.letra} de ${palabra}`)
                    }
                  >
                    <Text>{palabra}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View> */}
        </View>
      </View>
      <LottieView
        ref={confettiRef}
        source={conffeti}
        autoPlay={false}
        loop={false}
        style={{ ...styles.lottie, zIndex: conffetiShow ? 1000 : -1 }}
        resizeMode="cover"
      />
    </>
  );
};

export default ModalColorDetalle;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  btnClose: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },

  contenido: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    //   flexDirection: "row",

    //   backgroundColor: "rgba(255, 255, 255, .8)",
    width: "100%",
    height: "100%",
    //   height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    overflow: "hidden",
  },

  detalles: {
    //   backgroundColor: "red",
    width: "100%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    fontSize: 62,
    //   backgroundColor: "red",
  },
  textMinuscula: {
    fontSize: 42,
    //   backgroundColor: "red",
  },
  btnText: {
    backgroundColor: "#8c9eff",
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  header: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //   width: "60%",
    //   height: 50,
    //   backgroundColor: "rgba(255, 255, 255, .9)",
    // backgroundColor: "red",
    borderRadius: 8,
  },
  txtHeader: {
    fontSize: 52,
    // textAlign: "center",
    fontWeight: "700",
  },
  card: {
    width: 110,
    height: 90,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50%",
    // backgroundColor: "#8c9eff",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
