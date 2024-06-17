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

import img_perro from "../assets/perro.jpg";
import img_gato from "../assets/gato.jpg";
import img_leon from "../assets/leon.jpg";
import img_vaca from "../assets/vaca.jpg";
import img_chivo from "../assets/chivo.jpg";
import img_gallo from "../assets/gallo.jpg";
import img_lobo from "../assets/lobo.jpg";
import img_cerdo from "../assets/cerdo.jpg";

import sonido_perro from "../assets/sounds/perro.mp3";
import sonido_gato from "../assets/sounds/gato.mp3";
import sonido_leon from "../assets/sounds/leon.mp3";
import sonido_vaca from "../assets/sounds/vaca.mp3";
import sonido_cabra from "../assets/sounds/cabra.mp3";
import sonido_gallo from "../assets/sounds/gallo.mp3";
import sonido_lobo from "../assets/sounds/lobo.mp3";
import sonido_cerdo from "../assets/sounds/cerdo.mp3";

import { Fontisto } from "@expo/vector-icons";
import { Audio } from "expo-av";

import * as Speech from "expo-speech";

const AnimalesOneGame = ({
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
    generarColorAleatorio();
  }, []);

  const generarColorAleatorio = async () => {
    if (sonido) {
      Speech.speak(dinamica);
      Speech.speak("¿Qué animal es?");
    }

    let arregloNumeros = [
      { nombre: "PERRO", source_1: img_perro, audio: sonido_perro },
      { nombre: "GATO", source_1: img_gato, audio: sonido_gato },
      { nombre: "LEÓN", source_1: img_leon, audio: sonido_leon },
      { nombre: "VACA", source_1: img_vaca, audio: sonido_vaca },
      { nombre: "CABRA", source_1: img_chivo, audio: sonido_cabra },
      { nombre: "GALLO", source_1: img_gallo, audio: sonido_gallo },
      { nombre: "LOBO", source_1: img_lobo, audio: sonido_lobo },
      { nombre: "CERDO", source_1: img_cerdo, audio: sonido_cerdo },
    ];

    const objeto_principal = await extraerElemento(arregloNumeros);
    // console.log(objeto_principal);
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
      // cambiar figuras
      generarColorAleatorio();
      setBotones(false);

      return;
    } else {
      if (auth?.tipo === "Cliente") setAciertos(aciertos + 1);

      confettiRef.current?.play(0);

      setTimeout(() => {
        generarColorAleatorio();

        setBotones(false);
      }, 3000);
    }
  };

  //   const [sound, setSound] = useState();

  const reproducirSonido = async (animal) => {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(animal.audio);
    // setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync();
  };

  //   useEffect(() => {
  //     return sound
  //       ? () => {
  //           console.log('Unloading Sound');
  //           sound.unloadAsync();
  //         }
  //       : undefined;
  //   }, [sound]);

  return (
    <>
      <View style={styles.contenido}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {`¿Qué animal es?`}
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
                source={colorCard?.source_1}
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
              style={{ position: "absolute", top: 50, right: 100, zIndex: 1 }}
            >
              O
            </Text>

            {objetos.length > 0 ? (
              <>
                {objetos.map((obj, index) => (
                  <View
                    key={index}
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => seleccionarCard(obj)}
                      disabled={botones}
                    >
                      <Card style={styles.card}>
                        {/* <Card.Content> */}
                        {/* <Image style={styles.imgCard} source={obj?.source_1}/> */}
                        <Text style={{ fontWeight: "700" }}>{obj?.nombre}</Text>

                        {/* </Card.Content> */}
                      </Card>
                    </TouchableOpacity>
                    <Fontisto
                      name="applemusic"
                      size={24}
                      color="#7986cb"
                      onPress={() => reproducirSonido(obj)}
                    />
                  </View>
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
            onPress={() => {
              generarColorAleatorio();
            }}
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

export default AnimalesOneGame;

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
