import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ComponentOnGame from "./NumerosOnGame";
import useAuth from "../Hooks/useAuth";
import Alerts from "./Alerts";
import fondo_number_2 from "../assets/juego_abc.jpg";
import { Card } from "react-native-paper";
import AbecedarioOneGame from "./AbecedarioOneGame";
import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";

const AbecedarioAprender = ({ setVerAprender }) => {
  const { dataAlert, setDataAlert, logOut, setOption } = useAuth();

  const [mostrarGame, setMostrarGame] = useState(false);

  const [alfabeto, setAlfabeto] = useState([
    { minuscula: "a", letra: "A"},
    { minuscula: "b", letra: "B"},
    { minuscula: "c", letra: "C"},
    { minuscula: "d", letra: "D"},
    { minuscula: "e", letra: "E"},
    { minuscula: "f", letra: "F"},
    { minuscula: "g", letra: "G"},
    { minuscula: "h", letra: "H"},
    { minuscula: "i", letra: "I"},
    { minuscula: "j", letra: "J"},
    { minuscula: "k", letra: "K"},
    { minuscula: "l", letra: "L"},
    { minuscula: "m", letra: "M"},
    { minuscula: "n", letra: "N"},
    { minuscula: "ñ", letra: "Ñ"},
    { minuscula: "o", letra: "O"},
    { minuscula: "p", letra: "P"},
    { minuscula: "q", letra: "Q"},
    { minuscula: "r", letra: "R"},
    { minuscula: "s", letra: "S"},
    { minuscula: "t", letra: "T"},
    { minuscula: "u", letra: "U"},
    { minuscula: "v", letra: "V"},
    { minuscula: "w", letra: "W"},
    { minuscula: "x", letra: "X"},
    { minuscula: "y", letra: "Y"},
    { minuscula: "z", letra: "Z"},
  ]);

  const [letraSeleccionada, setLetraSeleccionada] = useState({})

  return (
    <View style={styles.containerOrdenarNumeros}>
      <ImageBackground
        source={mostrarGame ? "" : fondo_number_2}
        resizeMode="cover"
        imageStyle={{ opacity: 0.6 }}
        style={{
          ...styles.container,
          backgroundColor: mostrarGame
            ? "rgba(255, 255, 255, .9)"
            : "rgba(255, 255, 255, 1)",
        }}
      >
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setVerAprender(false);
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
        <View style={{ ...styles.contenido }}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>
              Escoge una letras para aprender
            </Text>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          <View style={{ ...styles.game }}>
            {alfabeto.map((abc, index) => (
              <TouchableOpacity key={index} onPress={() => setLetraSeleccionada(abc)}>
                <Card style={styles.card}>
                  {/* <Card.Content> */}
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#242424" }}>
                    {abc.letra}
                  </Text>
                  {/* <Text variant="titleLarge">Card title</Text> */}
                  {/* </Card.Content> */}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
      {dataAlert.active && <Alerts />}
      {
        letraSeleccionada.letra && <ModalAlfabetoDetalles setLetraSeleccionada={setLetraSeleccionada} letraSeleccionada={letraSeleccionada}/>
      }
    </View>
  );
};

export default AbecedarioAprender;

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
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

    // padding: "2%",
    // paddingVertical: "3%",
  },
  card: {
    width: 60,
    height: 60,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50%",
    backgroundColor: "#8c9eff",
  },
  btnPlay: {
    // backgroundColor: "red",
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
  contenido: {
    display: "flex",
    gap: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 50 ,
    backgroundColor: "rgba(255, 255, 255, .9)",
    // backgroundColor: "red",
    borderRadius: 8
  },
  txtHeader: {
    fontSize: 18,
    // textAlign: "center",
    fontWeight: "700",
  },
  game: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
});
