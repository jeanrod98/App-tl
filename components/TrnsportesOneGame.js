import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState, createRef, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Card } from "react-native-paper";
import useAuth from "../Hooks/useAuth";
import conffeti from "../assets/confeti.json";
import LottieView from "lottie-react-native";

import avion_1 from "../assets/avion_1.jpg";
import avion_2 from "../assets/avion_2.jpg";

import carro_1 from "../assets/carro_1.jpg";
import carro_2 from "../assets/carro_2.jpg";

import bus_1 from "../assets/bus_1.jpg";
import bus_2 from "../assets/bus_2.jpg";

import moto_1 from "../assets/moto_1.jpg";
import moto_2 from "../assets/moto_2.jpg";

import bici_1 from "../assets/bicicleta_1.jpg";
import bici_2 from "../assets/bicicleta_2.jpg";

import elicoptero_1 from "../assets/elicoptero_1.jpg";
import elicoptero_2 from "../assets/elicoptero_2.jpg";

import tren_1 from "../assets/tren_1.jpg";
import tren_2 from "../assets/tren_2.jpg";

import barco_2 from "../assets/barco_2.jpg";
import barco_1 from "../assets/barco_1.jpg";

import * as Speech from 'expo-speech';


const TrnsportesOneGame = ({ dinamica }) => {
  const { dataAlert, setDataAlert, conffetiShow, setConffetiShow, sonido } = useAuth();

  const [arregloAbecedario, setArregloAbecedario] = useState([]);
  const [arregloAbecedarioTwo, setArregloAbecedarioTwo] = useState([]);
  const confettiRef = useRef(null);

  useEffect(() => {
    barajearArreglo();
  }, []);

  const barajearArreglo = async () => {

    if (sonido) {
      Speech.speak(dinamica);
    }
    

    setBordeFilaUno("");
    setBordeFilaDos("");

    let arregloAbecedario = [
      { nombre: "AVIÓN", source: avion_1 },
      { nombre: "CARRO", source: carro_1 },
      { nombre: "BUS", source: bus_1 },
      { nombre: "MOTO", source: moto_1 },
      { nombre: "BICICLETA", source: bici_1 },
      { nombre: "ELICÓPTERO", source: elicoptero_1 },
      { nombre: "TREN", source: tren_1 },
      { nombre: "BARCO", source: barco_1 },
    ];
    let arregloAbecedarioDos = [
      { nombre: "AVIÓN", source: avion_2 },
      { nombre: "CARRO", source: carro_2 },
      { nombre: "BUS", source: bus_2 },
      { nombre: "MOTO", source: moto_2 },
      { nombre: "BICICLETA", source: bici_2 },
      { nombre: "ELICÓPTERO", source: elicoptero_2 },
      { nombre: "TREN", source: tren_2 },
      { nombre: "BARCO", source: barco_2 },
    ].reverse();

    // barajea el arregloD

    const array_uno = await shuffle(arregloAbecedario);
    const array_dos = await shuffle(arregloAbecedarioDos);

    setArregloAbecedario(array_uno);
    setArregloAbecedarioTwo(array_dos);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  
  const [bordeFilaUno, setBordeFilaUno] = useState("");
  const [bordeFilaDos, setBordeFilaDos] = useState("");

  const seleccionarCard = (value, fila) => {
    if (sonido) {Speech.speak(value.nombre);}
    
    if ( fila === "T1") {
        setBordeFilaUno(value.nombre);

    }else{
        setBordeFilaDos(value.nombre);

    }
  };

  const validarResultados = async () => {
    // console.log("validando...");
    // !validar que haya elegido una letra de cada tablero
    if (bordeFilaUno == "" || bordeFilaDos == "") {
      setDataAlert({
        icon: "danger",
        tittle: "Validación",
        detalle: "Debes elegir dos transportes parecidos.",
        active: true,
        tipe: "validation",
      });
      if (sonido) Speech.speak("Debes elegir dos transportes parecidos.");

      return;
    }

    // !validar que sean iguales las letras
    if (bordeFilaUno !== bordeFilaDos) {
      setDataAlert({
        icon: "sad",
        tittle: "Transportes distintos",
        detalle:
          "Ups!, los transportes seleccionados no son iguales, inténtalo de nuevo.",
        active: true,
        tipe: "validation",
      });
      if (sonido) Speech.speak("Ups!, los transportes seleccionados no son iguales, inténtalo de nuevo.");

      return;
    }

    // * valida si son iguales le muestra el conffeti
    if (bordeFilaUno === bordeFilaDos) {
      // setConffetiShow(true);
      confettiRef.current?.play(0);
      const newArregloOne = await arregloAbecedario.filter(
        (trasnporte) => trasnporte.nombre !== bordeFilaUno
      );
      const newArregloTwo = await arregloAbecedarioTwo.filter(
        (trasnporte) => trasnporte.nombre !== bordeFilaDos
      );
      setArregloAbecedario(newArregloOne);
      setArregloAbecedarioTwo(newArregloTwo);
      setBordeFilaUno("");
      setBordeFilaDos("");

      // * valida que si ya no hay elementos finaliza el juego

      if (newArregloOne.length == 0 || newArregloTwo.length == 0) {
        // console.log(arregloAbecedario.length);

        setConffetiShow(true);
        confettiRef.current?.play(0);
        setDataAlert({
          icon: "success",
          tittle: "¡FELICIDADES!",
          detalle:
            "Has logrado encontrar todos los pares de los transportes. Sigue así y llegarás lejos!.",
          active: true,
          tipe: "validation",
        });
        if (sonido) Speech.speak("Has logrado encontrar todos los pares de los transportes. Sigue así y llegarás lejos!.");


      }
    }
  };
  return (
    <>
      <View style={styles.contenido}>
        {/* <Text style={{ fontWeight: "700"}}>Selecciona un número</Text> */}
        <View style={styles.contenedorTablero}>
          <View style={styles.contenidoCard}>
            {arregloAbecedario.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={(text) => seleccionarCard(value, "T1")}
              >
                <Card
                  style={{
                    ...styles.card,
                    borderColor: bordeFilaUno == value.nombre ? "red" : "#000",
                    borderWidth: 2,
                  }}
                >
                  {/* <Card.Content> */}

                  <Image style={styles.imgCard} source={value?.source} />
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 9,
                      textAlign: "center",
                    }}
                    variant="titleLarge"
                  >
                    {value.nombre}
                  </Text>

                  {/* <Text variant="titleLarge">Card title</Text> */}
                  {/* </Card.Content> */}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* <Text style={{ fontWeight: "700"}}>Números Ordenados</Text> */}

        <View style={styles.contenedorTablero}>
          <View style={{ ...styles.contenidoCard }}>
            <>
              {arregloAbecedarioTwo.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => seleccionarCard(value, "T2")}
                >
                  <Card  style={{
                    ...styles.card,
                    borderColor: bordeFilaDos == value.nombre ? "red" : "#000",
                    borderWidth: 2,
                  }}>
                    {/* <Card.Content> */}
                    <Image style={styles.imgCard} source={value?.source} />
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 9,
                        textAlign: "center",
                      }}
                      variant="titleLarge"
                    >
                      {value.nombre}
                    </Text>
                    {/* </Card.Content> */}
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          </View>
        </View>
      </View>
      <View style={styles.controles}>
        <TouchableOpacity
          style={styles.btnReload}
          onPress={() => {
            
            barajearArreglo();
          }}
        >
          {/* <FontAwesome name="stop" size={24} color="#5c6bc0" /> */}
          <Ionicons name="reload-circle" size={24} color="#5c6bc0" />
          <Text>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnValidar}
          onPress={() => validarResultados()}
        >
          <AntDesign name="checkcircle" size={24} color="green" />
          <Text>Revisar</Text>
        </TouchableOpacity>
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

export default TrnsportesOneGame;

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

  contenido: {
    display: "flex",
    //   flexDirection: "row",
    justifyContent: "center",

    //   backgroundColor: "yellow",
    width: "100%",
    height: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",
    gap: 20,
    overflow: "hidden",
  },
  btnPlay: {},
  contenedorTablero: {
    display: "flex",
    // backgroundColor: "green",
    width: "100%",
  },
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "transparent",
    padding: 6,
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  btnReload: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnValidar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  card: {
    width: 65,
    height: 70,
    borderRadius: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: 0,
  },

  imgCard: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
