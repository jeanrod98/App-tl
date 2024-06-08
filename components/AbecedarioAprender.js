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
    { minuscula: "a", letra: "A", palabras: ["Avión","Árbol", "Amarillo"] },
    { minuscula: "b", letra: "B", palabras: ["Burro","Barco", "Balón"]},
    { minuscula: "c", letra: "C", palabras: ["Casa","Camisa", "Canción"]},
    { minuscula: "d", letra: "D", palabras: ["Dedo","Dado", "Diente"]},
    { minuscula: "e", letra: "E", palabras: ["Enano","Esmeralda", "Edificio"]},
    { minuscula: "f", letra: "F", palabras: ["Foca","Foco", "Fideo"]},
    { minuscula: "g", letra: "G", palabras: ["Gota","Gallo", "Guante"]},
    { minuscula: "h", letra: "H", palabras: ["Hielo","Hierro", "Helado"]},
    { minuscula: "i", letra: "I", palabras: ["Iguana","Indio", "Isla"]},
    { minuscula: "j", letra: "J", palabras: ["Juego","Jarabe", "Jamón"]},
    { minuscula: "k", letra: "K", palabras: ["Karate","Kimono", "Kiwi"]},
    { minuscula: "l", letra: "L", palabras: ["León","Limón", "Lucas"]},
    { minuscula: "m", letra: "M", palabras: ["Mamá","Mimo", "María"]},
    { minuscula: "n", letra: "N", palabras: ["Niño","Naranja", "Ninja"]},
    { minuscula: "ñ", letra: "Ñ", palabras: ["Ñandú","Ñaño", "Ñato"]},
    { minuscula: "o", letra: "O", palabras: ["Oso","Ojo", "Oreja"]},
    { minuscula: "p", letra: "P", palabras: ["Pato","Papá", "Perro"]},
    { minuscula: "q", letra: "Q", palabras: ["Queso","Química", "Quijote"]},
    { minuscula: "r", letra: "R", palabras: ["Ratón","Rico", "Reno"]},
    { minuscula: "s", letra: "S", palabras: ["Sandia","Serpiente", "Silencio"]},
    { minuscula: "t", letra: "T", palabras: ["Tigre","Timón", "Tarea"]},
    { minuscula: "u", letra: "U", palabras: ["Uva","Uña", "Unicornio"]},
    { minuscula: "v", letra: "V", palabras: ["Vaso","Viento", "Venado"]},
    { minuscula: "w", letra: "W", palabras: ["Wifi","Waffle", "Wendy"]},
    { minuscula: "x", letra: "X", palabras: ["Xavier","Xilófono", "Xenón"]},
    { minuscula: "y", letra: "Y", palabras: ["Yegua","Yoyo", "Yuca"]},
    { minuscula: "z", letra: "Z", palabras: ["Zapato","Zorrillo", "Zanahoria"]},
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
              Escoge una letra para aprenderla
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
    fontSize: 20,
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
