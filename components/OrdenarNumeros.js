import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import ComponentOnGame from "./ComponentOnGame";

const OrdenarNumeros = ({ setOrdenarNumeros }) => {
  const [mostrarGame, setMostrarGame] = useState(false);

  return (
    <View style={styles.containerOrdenarNumeros}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setOrdenarNumeros(false);
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
        <View style={styles.contenido}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>
              Ordena los números de menor a mayor
            </Text>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          <View style={styles.game}>
            {mostrarGame ? 
                <ComponentOnGame setMostrarGame={setMostrarGame} />
             : 
             <>
              <TouchableOpacity
                style={styles.btnPlay}
                onPress={() => {
                  setMostrarGame(true);
                }}
              >
                <FontAwesome5 name="play" size={42} color="#1A237E" />
              </TouchableOpacity>
              <Text>Iniciar</Text>
              </>
            }
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrdenarNumeros;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerOrdenarNumeros: {
    position: "absolute",
    top: -50,
    height: height < 500 ? height - 52 : width - 52,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: "96%",
    // height: "90%",
    padding: "2%",
  },
  btnClose: {
    position: "absolute",
    top: -12,
    right: -6,
    zIndex: 2,
  },
  contenido: {
    display: "flex",
    gap: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "blue",
  },
  txtHeader: {
    fontSize: 18,
    // textAlign: "center",
  },
  game: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    height: height < 500 ? height - 160 : width - 160,

  },
});
