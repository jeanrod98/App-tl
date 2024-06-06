import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState, createRef, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Card } from "react-native-paper";
import useAuth from "../Hooks/useAuth";
import Alerts from "./Alerts";
import conffeti from "../assets/confeti.json";
import LottieView from "lottie-react-native";

import color_negro from "../assets/color_negro.png";
import color_amarillo from "../assets/color_amarillo.png";
import color_azul from "../assets/color_azul.png";
import color_blanco from "../assets/color_blanco.png";
import color_gris from "../assets/color_gris.png";
import color_morado from "../assets/color_morado.png";
import color_naranja from "../assets/color_naranja.png";
import color_rojo from "../assets/color_rojo.png";
import color_rosado from "../assets/color_rosado.png";
import color_verde from "../assets/color_verde.png";

import * as Speech from 'expo-speech';


const ColoresOneGame = ({ dinamica }) => {
  const { dataAlert, setDataAlert, conffetiShow, setConffetiShow } = useAuth();

  const [arregloNumeros, setArregloNumeros] = useState([]);
  const [resultNumeros, setResultNumeros] = useState([]);
  const [colorCard, setColorCard] = useState({});
  const [objetos, setObjetos] = useState([]);
  const confettiRef = useRef(null);

  useEffect(() => {
    Speech.speak(dinamica);
  
    generarColorAleatorio();
  }, []);

  const generarColorAleatorio = async () => {

    let arregloNumeros = [
      { color: "purple", nombre: "MORADO", source: color_morado },
      { color: "red", nombre: "ROJO", source: color_rojo },
      { color: "blue", nombre: "AZUL", source: color_azul },
      { color: "green", nombre: "VERDE", source: color_verde },
      { color: "yellow", nombre: "AMARILLO", source: color_amarillo },
      { color: "pink", nombre: "ROSADO", source: color_rosado },
      { color: "grey", nombre: "GRIS", source: color_gris },
      { color: "white", nombre: "BLANCO", source: color_blanco },
      { color: "black", nombre: "NEGRO", source: color_negro },
      { color: "orange", nombre: "NARANJA", source: color_naranja },
    ];

    const objeto_principal = await extraerElemento(arregloNumeros);
    // console.log(color);
    setColorCard(objeto_principal);

    const arregloLimpio = await arregloNumeros.filter(arr => arr.nombre !== objeto_principal.nombre);
    // console.log(arregloLimpio);
    const objeto_secundario = await extraerElemento(arregloLimpio);

    const arrFinal = [objeto_secundario, objeto_principal]
    setObjetos(shuffle(arrFinal))
    // console.log(objetos);
    Speech.speak(`La figura de color ${objeto_principal.nombre}`);


  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const extraerElemento = (arreglo) => {
   return arreglo[
        Math.floor(Math.random() * arreglo.length)
      ];
  }



  const [ botones, setBotones ] = useState(false);
  const seleccionarCard = (objeto) => {
    // console.log(objeto);
    setBotones(true);

    // !validar que existan los 10 numeros
    if (objeto.color !== colorCard.color) {

        setDataAlert({
          icon: "sad",
          tittle: "Esa no era la imagen correcta",
          detalle: "Lo intentaremos en la próxima ocación.",
          active: true,
          tipe: "validation",
        });
        Speech.speak(`Esa no era la imagen correcta`);
        Speech.speak(`Lo intentaremos en la próxima ocación.`);

        // cambiar figuras
        generarColorAleatorio();
        setBotones(false);

        return;
      }else{
        confettiRef.current?.play(0);


        setTimeout(() => {
            generarColorAleatorio();

            setBotones(false);
            
        }, 3000);
      }


  }

  const validarResultados = () => {
    // console.log("validando...");
    // !validar que existan los 10 numeros
    if (resultNumeros.length !== 10) {
      setDataAlert({
        icon: "danger",
        tittle: "Validación",
        detalle: "Debes agregar 10 números.",
        active: true,
        tipe: "validation",
      });
      Speech.speak(`Debes agregar 10 números.`);

      return;
    }
    let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let count = 0;
    for (let index = 0; index < arregloNumeros.length; index++) {
      const arr1 = arregloNumeros[index];
      const arr2 = resultNumeros[index];
      if (arr1 == arr2) count++;
    }

    if (count == 10) {
      setConffetiShow(true);
      confettiRef.current?.play(0);
      setDataAlert({
        icon: "success",
        tittle: "¡FELICIDADES!",
        detalle:
          "Has logrado ordenar los números del 1 al 10. Sigue así y llegarás lejos!.",
        active: true,
        tipe: "validation",
      });
      Speech.speak(`Has logrado ordenar los números del 1 al 10. Sigue así y llegarás lejos!.`);

    } else {
      setDataAlert({
        icon: "danger",
        tittle: "Validación",
        detalle: "Ups! Los números no se encuentran ordenados.",
        active: true,
        tipe: "validation",
      });
      Speech.speak(`Ups! Los números no se encuentran ordenados.`);

    }
  };

  return (
    <>
      <View style={styles.contenido}>
        <Text
          style={{ fontWeight: "700" }}
        >{`La figura de color ${colorCard.nombre}`}</Text>
        <View style={styles.contenidoCard}>
          <Card
            style={{
              ...styles.card,
              backgroundColor: colorCard?.color,
              width: 50,
              height: 50,
            }}
          >
            <Card.Content>
              <Text> </Text>
              {/* <Text variant="titleLarge">Card title</Text> */}
            </Card.Content>
          </Card>
          {/* {arregloNumeros.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
            
          </TouchableOpacity>
        ))} */}
        </View>
        {/* <Text style={{ fontWeight: "700" }}>Números Ordenados</Text> */}

        <View style={styles.contenidoCard}>
          <Text style={{ position: "absolute", top: 30, right: 100, zIndex: 1}}>O</Text>

          {objetos.length > 0 ? (
            <>
              {objetos.map((obj, index) => (
                <TouchableOpacity key={index} onPress={() => seleccionarCard(obj) }
                disabled={botones}>
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
                        <Image style={styles.imgCard} source={obj?.source}/>
                      
                    {/* </Card.Content> */}
                  </Card>
                    <Text style={{ textAlign: "center", fontSize: 12, marginTop: 4}}>{obj?.nombre}</Text>

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

export default ColoresOneGame;

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
    

    gap: 10,
  },
  btnPlay: {},
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
