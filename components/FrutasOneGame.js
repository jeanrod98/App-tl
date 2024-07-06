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

import banana from "../assets/banana.jpg";
import manzana from "../assets/manzana.jpg";
import uva from "../assets/uva.jpg";
import fresa from "../assets/fresa.jpg";
import pera from "../assets/pera.jpg";
import sandia from "../assets/sandia.jpg";
import melon from "../assets/melon.jpg";
import papaya from "../assets/papaya.jpg";
import durazno from "../assets/durazno.jpg";
import pinia from "../assets/pinia.jpg";
import naranja from "../assets/naranja.jpg";
import mandarina from "../assets/mandarina.jpg";

import * as Speech from 'expo-speech';
import clienteAxios from "../config/axios";


const FrutasOneGame = ({ 
  dinamica,
  capturarTiempo,
  setAciertos,
  aciertos,
  setErrores,
  errores,
  tiempo,

 }) => {
  const { auth, dataAlert, setDataAlert, conffetiShow, setConffetiShow, sonido } = useAuth();

  const [arregloFrutas, setArregloFrutas] = useState([]);
  const confettiRef = useRef(null);

  useEffect(() => {
    barajearArreglo();
    

  }, []);

  const registrarAvance = async () => {
    try {
      const { data } = await clienteAxios.post("/avance-registro",
        {
          usuario: auth.nombres,
          modulo: "FRUTAS",
          fecha_avance: new Date().toLocaleString("EC").split(" ")[0],
          id_cliente: auth._id,
          id_terapeuta: auth.terapeuta_cli,
          aciertos,
          errores,
          tiempo,
        }
      )
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const barajearArreglo = async () => {

    if (sonido) {
      Speech.speak(dinamica);

    }
    setBordeFilaUno("");
    setBordeFilaDos("");

    let arregloFrutas = [
      { key: "BANANA_1", nombre: "BANANA", source: banana },
      { key: "MANZANA_1", nombre: "MANZANA", source: manzana },
      { key: "UVA_1", nombre: "UVA", source: uva },
      { key: "FRESA_1", nombre: "FRESA", source: fresa },
      { key: "PERA_1", nombre: "PERA", source: pera },
      { key: "SANDIA_1", nombre: "SANDIA", source: sandia },
      { key: "MELÓN_1", nombre: "MELÓN", source: melon },
      { key: "PAPAYA_1", nombre: "PAPAYA", source: papaya },
      { key: "DURAZNO_1", nombre: "DURAZNO", source: durazno },
      { key: "PIÑA_1", nombre: "PIÑA", source: pinia },
      { key: "NARANJA_1", nombre: "NARANJA", source: naranja },
      { key: "MANDARINA_1", nombre: "MANDARINA", source: mandarina },
      { key: "BANANA_2", nombre: "BANANA", source: banana },
      { key: "MANZANA_2", nombre: "MANZANA", source: manzana },
      { key: "UVA_2", nombre: "UVA", source: uva },
      { key: "FRESA_2", nombre: "FRESA", source: fresa },
      { key: "PERA_2", nombre: "PERA", source: pera },
      { key: "SANDIA_2", nombre: "SANDIA", source: sandia },
      { key: "MELÓN_2", nombre: "MELÓN", source: melon },
      { key: "PAPAYA_2", nombre: "PAPAYA", source: papaya },
      { key: "DURAZNO_2", nombre: "DURAZNO", source: durazno },
      { key: "PIÑA_2", nombre: "PIÑA", source: pinia },
      { key: "NARANJA_2", nombre: "NARANJA", source: naranja },
      { key: "MANDARINA_2", nombre: "MANDARINA", source: mandarina },
    ];

    // barajea el arregloD

    const array_frutas = await shuffle(arregloFrutas);

    setArregloFrutas(array_frutas);
    //   setArregloFrutasTwo(array_dos);
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
  const [turno, setTurno] = useState(1);

  const seleccionarCard = (value, fila) => {
    
    if (sonido) { Speech.speak(value.nombre); }

    if (turno === 1) {
      setBordeFilaUno(value.key);
      setTurno(2);
    } else {
      setBordeFilaDos(value.key);
      setTurno(1);
    }
  };

  const validarResultados = async () => {
    //   console.log(bordeFilaUno.split("_")[0]);
    //   console.log(bordeFilaDos.split("_")[0]);

    //   return
    // !validar que haya elegido una letra de cada tablero
    if (bordeFilaUno.split("_")[0] == "" || bordeFilaDos.split("_")[0] == "") {
      setDataAlert({
        icon: "danger",
        tittle: "Validación",
        detalle: "Debes elegir dos frutas iguales.",
        active: true,
        tipe: "validation",
      });

      if (sonido) Speech.speak("Debes elegir dos frutas iguales.");

      return;
    }

    // !validar que sean iguales las letras
    if (bordeFilaUno.split("_")[0] !== bordeFilaDos.split("_")[0]) {
      if (auth?.tipo === "Cliente") setErrores(errores + 1);
      
      setDataAlert({
        icon: "sad",
        tittle: "Frutas distintas",
        detalle:
          "Ups!, las frutas seleccionadas no son iguales, intentalo de nuevo.",
        active: true,
        tipe: "validation",
      });
      if (sonido) Speech.speak("Ups!, las frutas seleccionadas no son iguales, intentalo de nuevo.");

      return;
    }

    // * valida si son iguales le muestra el conffeti
    if (bordeFilaUno.split("_")[0] === bordeFilaDos.split("_")[0]) {
      // setConffetiShow(true);
      if (auth?.tipo === "Cliente") setAciertos(aciertos+1);

      confettiRef.current?.play(0);
      const newArregloOne = await arregloFrutas.filter(
        (frutas) => frutas.nombre !== bordeFilaUno.split("_")[0]
      );

      setArregloFrutas(newArregloOne);
      setBordeFilaUno("");
      setBordeFilaDos("");
      setTurno(1);

      // * valida que si ya no hay elementos finaliza el juego

      if (newArregloOne.length == 0) {
        // console.log(arregloAbecedario.length);

        // todo: Aqui se termina de capturar los datos
        if (auth?.tipo === "Cliente") capturarTiempo(false);

        // *Aqui se registran los datos
        registrarAvance();

        setConffetiShow(true);
        confettiRef.current?.play(0);
        setDataAlert({
          icon: "success",
          tittle: "¡FELICIDADES!",
          detalle:
            "Has logrado encontrar todos los pares de frutas. Sigue así y llegarás lejos!.",
          active: true,
          tipe: "validation",
        });
        if (sonido) Speech.speak("Has logrado encontrar todos los pares de frutas. Sigue así y llegarás lejos!.");

      }
    }
  };

  const narrarAccion = async ( text ) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`${text}`)
    }
   
  }


  return (
    <>
      <View style={styles.contenido}>
       

        <View style={styles.contenedorTablero}>
          <View style={{ ...styles.contenidoCard }}>
            <>
              {arregloFrutas.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => seleccionarCard(value, "T2")}
                >
                  <Card
                    style={{
                      ...styles.card,
                      backgroundColor:
                        bordeFilaUno == value.key || bordeFilaDos == value.key
                          ? "#7986cb"
                          : "#fff",
                      borderWidth: 1,
                      borderColor: "#7986cb"
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
                    {/* </Card.Content> */}
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          </View>

          <View style={styles.controles}>
            <TouchableOpacity
              style={styles.btnReload}
              onLongPress={() => {
                barajearArreglo();
              }}
              onPress={() => narrarAccion("Reiniciar")}
            >
              {/* <FontAwesome name="stop" size={24} color="#5c6bc0" /> */}
              <Ionicons name="reload-circle" size={24} color="#5c6bc0" />
              <Text>Reiniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnValidar}
              onLongPress={() => validarResultados()}
              onPress={() => narrarAccion("Revisar")}
            >
              <AntDesign name="checkcircle" size={24} color="green" />
              <Text>Revisar</Text>
            </TouchableOpacity>
          </View>
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

export default FrutasOneGame;

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
    flexDirection: "row",

    //   backgroundColor: "green",
      justifyContent: "space-evenly",
    width: "100%",
  },
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    gap: 0,
    flexWrap: "wrap",
    width: 500,

    //   backgroundColor: "red",
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
    width: 70,
    height: 55,
    borderRadius: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controles: {
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //   backgroundColor: "red",

    gap: 30,
    marginTop: 0,
  },

  imgCard: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
