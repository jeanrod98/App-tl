import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ComponentOnGame from "./NumerosOnGame";
import useAuth from "../Hooks/useAuth";
import Alerts from "./Alerts";
import fondo_number_2 from "../assets/juego_transportes_1.jpg";
import { Card } from "react-native-paper";
import AbecedarioOneGame from "./AbecedarioOneGame";
import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
import ModalTransporteDetalle from "./ModalTransporteDetalle";

import avion_1 from "../assets/avion_1.jpg";
import avion_2 from "../assets/avion_2.jpg";
import avion_3 from "../assets/avion_3.jpg";
import avion_4 from "../assets/avion_4.jpg";

import carro_1 from "../assets/carro_1.jpg";
import carro_2 from "../assets/carro_2.jpg";
import carro_3 from "../assets/carro_3.jpg";
import carro_4 from "../assets/carro_4.jpg";

import bus_1 from "../assets/bus_1.jpg";
import bus_2 from "../assets/bus_2.jpg";
import bus_3 from "../assets/bus_3.jpg";
import bus_4 from "../assets/bus_4.jpg";

import moto_1 from "../assets/moto_1.jpg";
import moto_2 from "../assets/moto_2.jpg";
import moto_3 from "../assets/moto_3.jpg";
import moto_4 from "../assets/moto_4.jpg";

import bici_1 from "../assets/bicicleta_1.jpg";
import bici_2 from "../assets/bicicleta_2.jpg";
import bici_3 from "../assets/bicicleta_3.jpg";
import bici_4 from "../assets/bicicleta_4.jpg";

import elicoptero_1 from "../assets/elicoptero_1.jpg";
import elicoptero_2 from "../assets/elicoptero_2.jpg";
import elicoptero_3 from "../assets/elicoptero_3.jpg";
import elicoptero_4 from "../assets/elicoptero_4.jpg";

import tren_1 from "../assets/tren_1.jpg";
import tren_2 from "../assets/tren_2.jpg";
import tren_3 from "../assets/tren_3.jpg";
import tren_4 from "../assets/tren_4.jpg";

import barco_1 from "../assets/barco_1.jpg";
import barco_2 from "../assets/barco_2.jpg";
import barco_3 from "../assets/barco_3.jpg";
import barco_4 from "../assets/barco_4.jpg";
import * as Speech from "expo-speech";


const TransporteAprender = ({ setVerAprender }) => {
  const { dataAlert, setDataAlert, logOut, setOption,sonido } = useAuth();

  const [mostrarGame, setMostrarGame] = useState(false);

  const [ transporte, setTransporte] = useState([
    { nombre: "AVIÓN", source: avion_1, imagenes: [avion_2, avion_3, avion_4] },
    { nombre: "CARRO", source: carro_1, imagenes: [carro_2, carro_3, carro_4] },
    { nombre: "BUS", source: bus_1, imagenes: [bus_2, bus_3, bus_4] },
    { nombre: "MOTO", source: moto_1, imagenes: [moto_2, moto_3, moto_4] },
    { nombre: "BICICLETA", source: bici_1, imagenes: [bici_2, bici_3, bici_4] },
    {
      nombre: "ELICÓPTERO",
      source: elicoptero_1,
      imagenes: [elicoptero_2, elicoptero_3, elicoptero_4],
    },
    { nombre: "TREN", source: tren_1, imagenes: [tren_2, tren_3, tren_4] },
    { nombre: "BARCO", source: barco_1, imagenes: [barco_2, barco_3, barco_4] },
  ]);

  const [ opcionSeleccionada, setOpcionSeleccionada] = useState({});

  useEffect(() => {
    // console.log(opcionSeleccionada);
    if (sonido) {
      // Speech.speak(`Elegiste la fruta ${opcionSeleccionada.nombre}`);
      Speech.speak("Escoge un transporte para aprenderlo");
    }
    
  }, []);


  const narrarAccion = async ( text ) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`)
    }
   
  }


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
          onLongPress={() => {
            Speech.stop();
            setVerAprender(false);
          }}
          onPress={() => narrarAccion("Cerrar Ventana")}

        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
        <View style={{ ...styles.contenido }}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>
              Escoge un transporte para aprenderlo
            </Text>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          <View style={{ ...styles.game }}>
            {transporte.map((transporte, index) => (
              <TouchableOpacity
                key={index}
                onLongPress={() => setOpcionSeleccionada(transporte)}
                onPress={() => narrarAccion(transporte.nombre)}
              >
                <Card style={styles.card}>
                  {/* <Card.Content> */}

                  <Image style={styles.imgCard} source={transporte?.source} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: "#242424",
                      textAlign: "center",
                    }}
                  >
                    {transporte.nombre}
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
      {opcionSeleccionada.nombre && (
        <ModalTransporteDetalle
        setOpcionSeleccionada={setOpcionSeleccionada}
          opcionSeleccionada={opcionSeleccionada}
        />
      )}
    </View>
  );
};

export default TransporteAprender;

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
    alignItems: "center",

    // padding: "2%",
    // paddingVertical: "3%",
  },
  card: {
    width: 85,
    height: 85,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50%",
    backgroundColor: "#8c9eff",
    backgroundColor: "rgba(255, 255, 255, 1)",
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
    height: 50,
    backgroundColor: "rgba(255, 255, 255, .9)",
    // backgroundColor: "red",
    borderRadius: 8,
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
  imgCard: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
