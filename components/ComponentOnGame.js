import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, ImageBackground} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { useEffect, useState, createRef, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';

import { Card } from "react-native-paper";
import useAuth from "../Hooks/useAuth";
import Alerts from "./Alerts";
import conffeti from "../assets/confeti.json"
import LottieView from 'lottie-react-native';

const ComponentOnGame = ({ setMostrarGame }) => {

  const { dataAlert, setDataAlert, conffetiShow, setConffetiShow } = useAuth();

  const [arregloNumeros, setArregloNumeros] = useState([]);
  const [resultNumeros, setResultNumeros] = useState([]);
  const confettiRef = useRef(null);
  
  useEffect(() => {
    let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // barajea el arreglo

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setArregloNumeros(shuffle(arregloNumeros));
  }, []);


  const ubicarNumero = (values) => {
    // console.log(values);
    if (resultNumeros.length <= 9) {
      setResultNumeros([...resultNumeros, values])
    }else{
      console.log("Ya se completaron los 10 numeros");
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "Los 10 números ya están completos!",
        active: true,
        tipe: "validation",
      })
    }
    
  }

  
  

  

  const validarResultados = () => {
    console.log("validando...");
    // !validar que existan los 10 numeros
    if(resultNumeros.length !== 10){
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "Debes agregar 10 números.",
        active: true,
        tipe: "validation",
      })
      return
    };
    let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let count = 0;
    for (let index = 0; index < arregloNumeros.length; index++) {
      const arr1 = arregloNumeros[index];
      const arr2 = resultNumeros[index];
      if (arr1 == arr2) count++; 
      
    };
    
    
    

    if (count == 10) {
      setConffetiShow(true);
       confettiRef.current?.play(0);
      setDataAlert({
        icon: "success",
        tittle: "¡FELICIDADES!",
        detalle: "Has logrado ordenar los números del 1 al 10. Sigue así y llegarás lejos!.",
        active: true,
        tipe: "validation",
      });
      
    }else{
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "Ups! Los números no se encuentran ordenados.",
        active: true,
        tipe: "validation",
      });
    };
  };
  return (
    <>
    <View style={styles.contenido}>
      <Text style={{ fontWeight: "700"}}>Selecciona un número</Text>
      <View style={styles.contenidoCard}>
        {arregloNumeros.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{value}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ fontWeight: "700"}}>Números Ordenados</Text>

      <View style={styles.contenidoCard}>
        {
          resultNumeros.length > 0 ?
          <>
          {resultNumeros.map((obj, index) => (
          <TouchableOpacity key={index} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{obj}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
          </>
          :
          <>
          {arregloNumeros.map((obj, index) => (
          <TouchableOpacity key={index} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{""}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
          </>
        }
        
      </View>

      <View style={styles.controles}>

      <TouchableOpacity
                style={styles.btnReload}
                onPress={() => {
                  setResultNumeros([]);
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

      
          
    </View>
    <LottieView
    ref={confettiRef}
    source={conffeti}
    autoPlay={false}
    loop={false}
    style={{...styles.lottie, zIndex: conffetiShow ? 1000 : -1,}}
    resizeMode='cover'
  />
    </>

  );
};

export default ComponentOnGame;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },

  contenido: {
    display: "flex",
    // backgroundColor: "yellow",
    width: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",
    gap: 20
  },
  btnPlay: {},
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    
  },
  btnReload:{
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
    width: 50,
    height: 50,
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
    marginTop: 10,

  },
});
