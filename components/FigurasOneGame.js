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

import cuadrado_3 from "../assets/cuadrado_3.jpg";
import cuadrado_2 from "../assets/cuadrado_2.jpg";
import rectangulo_1 from "../assets/rectangulo_1.jpg";
import triangulo_2 from "../assets/triangulo_2.jpg";
import rectangulo_2 from "../assets/rectangulo_2.jpg";
import cuadrado_1 from "../assets/cuadrado_1.jpg";
import circulo_3 from "../assets/circulo_3.jpg";
import circulo_1 from "../assets/circulo_1.jpg";
import circulo_2 from "../assets/circulo_2.jpg";
import triangulo_1 from "../assets/triangulo_1.jpg";
import rectangulo_3 from "../assets/rectangulo_3.jpg";
import triangulo_3 from "../assets/triangulo_3.jpg";

import cuadrado from "../assets/cuadrado.jpg";
import circulo from "../assets/circulo.jpg";
import rectangulo from "../assets/rectangulo.jpg";
import triangulo from "../assets/triangulo.jpg";

import * as Speech from 'expo-speech';


const FigurasOneGame = ({ dinamica }) => {
  const { dataAlert, setDataAlert, conffetiShow, setConffetiShow } = useAuth();

  const [arregloNumeros, setArregloNumeros] = useState([]);
  const [resultNumeros, setResultNumeros] = useState([]);
  const [figuraCard, setFiguraCard] = useState({});
  const [objetos, setObjetos] = useState([
    { nombre: "CUADRADO", source: cuadrado },
    { nombre: "CIRCULO", source: circulo },
    { nombre: "RECTÁNGULO", source: rectangulo },
    { nombre: "TRIÁNGULO", source: triangulo },
  ]);
  const confettiRef = useRef(null);

  useEffect(() => {
    Speech.speak(dinamica);

    generarFiguraAleatorio();
  }, []);

  
  const generarFiguraAleatorio = async () => {
    

    let arregloFiguras = [
      { nombre: "CUADRADO", source: cuadrado_1 },
      { nombre: "CIRCULO", source: circulo_1 },
      { nombre: "RECTÁNGULO", source: rectangulo_1 },
      { nombre: "TRIÁNGULO", source: triangulo_1 },
      { nombre: "CUADRADO", source: cuadrado_2 },
      { nombre: "CIRCULO", source: circulo_2 },
      { nombre: "RECTÁNGULO", source: rectangulo_2 },
      { nombre: "TRIÁNGULO", source: triangulo_2 },
      { nombre: "CUADRADO", source: cuadrado_3 },
      { nombre: "CIRCULO", source: circulo_3 },
      { nombre: "RECTÁNGULO", source: rectangulo_3 },
      { nombre: "TRIÁNGULO", source: triangulo_3 },

    ];

    const objeto_principal = await extraerElemento(arregloFiguras);
    // console.log(objeto_principal);
    setFiguraCard(objeto_principal);

    Speech.speak(`La figura es un ${objeto_principal.nombre}?`);
    
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
    // console.log(objeto);
    setBotones(true);

    // !validar que existan los 10 numeros
    if (objeto.nombre !== figuraCard.nombre) {
      setDataAlert({
        icon: "sad",
        tittle: "Esa no era la figura correcta",
        detalle: "Lo intentaremos en la próxima ocación.",
        active: true,
        tipe: "validation",
      });
    Speech.speak(`Esa no era la figura correcta`);
      
      setBotones(false);

      return;
    } else {
      confettiRef.current?.play(0);

      setTimeout(() => {
        generarFiguraAleatorio();

        setBotones(false);
      }, 3000);
    }
  };

  

  return (
    <>
      <View style={styles.contenido}>
        <Text
          style={{ fontWeight: "700" }}
        >{`La figura es un ${figuraCard.nombre}?`}</Text>
        <View style={styles.contenidoCard}>
          <Card
            style={{
              ...styles.card,
                width: 80,
                height: 80,
            }}
          >
            <Image style={{...styles.imgCard, width: 75, height: 75, resizeMode: "contain"}} source={figuraCard?.source} />

          </Card>
          {/* {arregloNumeros.map((value, index) => (
            <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
              
            </TouchableOpacity>
          ))} */}
        </View>
        {/* <Text style={{ fontWeight: "700" }}>Números Ordenados</Text> */}

        <View style={styles.contenidoCard}>
        

          {objetos.length > 0 ? (
            <>
              {objetos.map((obj, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => seleccionarCard(obj)}
                  disabled={botones}
                    style={{ display: "flex", alignItems: "center"}}
                >
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
                    <Image style={styles.imgCard} source={obj?.source} />

                    {/* </Card.Content> */}
                  </Card>
                  <Text
                    style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}
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

        <View style={styles.controles}>
          <TouchableOpacity
            style={styles.btnReload}
            onPress={() => {
                generarFiguraAleatorio();
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

export default FigurasOneGame;

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
    // backgroundColor: "yellow",
    width: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",

    gap: 20,
  },
  btnPlay: {},
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
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
    width: 40,
    height: 40,
    borderRadius: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgCard: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: 5,
  },
});
