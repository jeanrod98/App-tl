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
import Alerts from "./Alerts";
import conffeti from "../assets/confeti.json";
import LottieView from "lottie-react-native";

import img_guitarra from "../assets/guitarra.jpg";
import img_piano from "../assets/piano.jpg";
import img_bateria from "../assets/bateria.jpg";
import img_flauta from "../assets/flauta.jpg";
import img_violin from "../assets/violin.jpg";
import img_trompeta from "../assets/trompeta.jpg";
import img_acordeon from "../assets/acordeon.jpg";
import img_arpa from "../assets/arpa.jpg";

import instrumento_guitarra from "../assets/guitarra_2.jpg";
import instrumento_piano from "../assets/piano_2.jpg";
import instrumento_bateria from "../assets/bateria_2.jpg";
import instrumento_flauta from "../assets/flauta_2.jpg";
import instrumento_violin from "../assets/violin_2.jpg";
import instrumento_trompeta from "../assets/trompeta_2.jpg";
import instrumento_acordeon from "../assets/acordeon_2.jpg";
import instrumento_arpa from "../assets/arpa_2.jpg";

import * as Speech from "expo-speech";

const InstrumentosOneGame = ({
  dinamica,
  capturarTiempo,
  setAciertos,
  aciertos,
  setErrores,
  errores,
  tiempo,
}) => {
  const {
    auth,
    dataAlert,
    setDataAlert,
    conffetiShow,
    setConffetiShow,
    sonido,
  } = useAuth();

  const [arregloNumeros, setArregloNumeros] = useState([]);
  const [resultNumeros, setResultNumeros] = useState([]);
  const [colorCard, setColorCard] = useState({});
  const [objetos, setObjetos] = useState([]);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (sonido) {
      Speech.speak(dinamica);
    }

    generarColorAleatorio();
  }, []);

  const generarColorAleatorio = async () => {
    if (sonido) {
      Speech.speak("¿Qué instrumento sale en la imagen?");
    }

    let arregloNumeros = [
      {
        nombre: "GUITARRA",
        source_1: img_guitarra,
        source_2: instrumento_guitarra,
      },
      { nombre: "PIANO", source_1: img_piano, source_2: instrumento_piano },
      {
        nombre: "BATERÍA",
        source_1: img_bateria,
        source_2: instrumento_bateria,
      },
      { nombre: "FLAUTA", source_1: img_flauta, source_2: instrumento_flauta },
      { nombre: "VIOLÍN", source_1: img_violin, source_2: instrumento_violin },
      {
        nombre: "TROMPETA",
        source_1: img_trompeta,
        source_2: instrumento_trompeta,
      },
      {
        nombre: "ACORDEÓN",
        source_1: img_acordeon,
        source_2: instrumento_acordeon,
      },
      { nombre: "ARPA", source_1: img_arpa, source_2: instrumento_arpa },
    ];

    const objeto_principal = await extraerElemento(arregloNumeros);
    console.log(objeto_principal);
    setColorCard(objeto_principal);

    const arregloLimpio = await arregloNumeros.filter(
      (arr) => arr.nombre !== objeto_principal.nombre
    );
    // console.log(arregloLimpio);
    const objeto_secundario = await extraerElemento(arregloLimpio);

    const arrFinal = [objeto_secundario, objeto_principal];
    setObjetos(shuffle(arrFinal));
    // console.log(objetos);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const extraerElemento = (arreglo) => {
    return arreglo[Math.floor(Math.random() * arreglo.length)];
  };

  const [botones, setBotones] = useState(false);
  const seleccionarCard = (objeto) => {
    //   console.log(objeto);
    //   console.log(objeto);
    setBotones(true);

    // !validar que existan los 10 numeros
    if (objeto.nombre !== colorCard.nombre) {
      if (auth?.tipo === "Cliente") setErrores(errores + 1);

      setDataAlert({
        icon: "sad",
        tittle: "Esa no era la imagen correcta",
        detalle: "Lo intentaremos en la próxima ocación.",
        active: true,
        tipe: "validation",
      });
      if (sonido) {
        Speech.speak("Esa no era la imagen correcta");
      }
      // cambiar figuras
      generarColorAleatorio();
      setBotones(false);

      return;
    } else {
      // * VALIDAR SI ES CORRECTO Y CAPTURAR ACIERTO
      if (auth?.tipo === "Cliente") setAciertos(aciertos + 1);
      confettiRef.current?.play(0);

      setTimeout(() => {
        generarColorAleatorio();

        setBotones(false);
      }, 3000);
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
        <Text style={{ fontWeight: "700" }}>
          {`¿Qué instrumento sale en la imagen?`}
        </Text>
        <View style={styles.contenedorCard}>
          <View
            style={{
              ...styles.contenidoCard,
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Card
              style={{
                ...styles.card,

                width: 150,
                height: 150,
              }}
            >
              <Image
                style={{ ...styles.imgCard, width: 150, height: 150 }}
                source={colorCard?.source_2}
              />
            </Card>
            {/* {arregloNumeros.map((value, index) => (
            <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
              
            </TouchableOpacity>
          ))} */}
          </View>
          {/* <Text style={{ fontWeight: "700" }}>Números Ordenados</Text> */}

          <View style={styles.contenidoCard}>
            <Text
              style={{ position: "absolute", top: 70, right: 100, zIndex: 1 }}
            >
              O
            </Text>

            {objetos.length > 0 ? (
              <>
                {objetos.map((obj, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => seleccionarCard(obj)}
                    disabled={botones}
                  >
                    <Card style={styles.card}>
                      {/* <Card.Content> */}
                      <Image style={styles.imgCard} source={obj?.source_1} />

                      {/* </Card.Content> */}
                    </Card>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {obj?.nombre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : null}

            {/* <Card style={styles.card}>
              <Card.Content>
                
                <Image style={styles.imgCard} source={colorCard?.source}/>
              </Card.Content>
            </Card>
            <Text variant="titleLarge">O</Text>
  
            <Card style={styles.card}>
              <Card.Content>
                <Text>{""}</Text>
              </Card.Content>
            </Card> */}
          </View>
        </View>

        <View style={styles.controles}>
          <TouchableOpacity
            style={styles.btnReload}
            onLongPress={() => {
              generarColorAleatorio();
            }}
            onPress={() => narrarAccion("Cambiar")}

          >
            {/* <FontAwesome name="stop" size={24} color="#5c6bc0" /> */}
            <Ionicons name="reload-circle" size={24} color="#5c6bc0" />
            <Text>Cambiar</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
              style={styles.btnValidar}
              onPress={() => validarResultados()}
            >
              <AntDesign name="checkcircle" size={24} color="green" />
              <Text>Revisar</Text>
            </TouchableOpacity> */}
          {/* <Text>{`Aciertos: 3/10`}</Text> */}
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

export default InstrumentosOneGame;

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
    // backgroundColor: "yellow",
    width: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",

    gap: 30,
  },
  btnPlay: {},

  contenedorCard: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    // backgroundColor: "red",
    justifyContent: "center",
  },
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
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
    width: 80,
    height: 80,
    borderRadius: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgCard: {
    width: 70,
    height: 70,
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: 5,
  },
});
