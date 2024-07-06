

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
  import fondo_number_2 from "../assets/juego_figuras_2.jpg";
  import { Card } from "react-native-paper";
  import AbecedarioOneGame from "./AbecedarioOneGame";
  import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
  import ModalTransporteDetalle from "./ModalTransporteDetalle";
  

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

import * as Speech from "expo-speech";

import ModalFigurasDetalle from "./ModalFigurasDetalle";
  
  const FigurasAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption, sonido } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [ transporte, setTransporte] = useState([
      { nombre: "CIRCULO", source: circulo,  imagenes: [{img: circulo_2, objeto: "Manzana"}, {img: circulo_3, objeto: "Pelota"}, {img: circulo_1, objeto: "Sol"}] },
      { nombre: "CUADRADO", source: cuadrado,   imagenes: [{img: cuadrado_2, objeto: "Tv"}, { img: cuadrado_3, objeto: "Regalo"}, {img: cuadrado_1, objeto: "Portarretrato"}] },
      { nombre: "RECTÁNGULO", source: rectangulo, imagenes: [{img: rectangulo_2, objeto: "Microondas"}, {img: rectangulo_3, objeto: "Carta"}, {img: rectangulo_1, objeto: "Portafolio"}] },
      { nombre: "TRIÁNGULO", source: triangulo,  imagenes: [{img: triangulo_3, objeto: "Velero"}, {img: triangulo_2, objeto: "Sandía"}, {img: triangulo_1, objeto: "Cono"}] },
      
    ]);
  
    const [ opcionSeleccionada, setOpcionSeleccionada] = useState({});
  
    useEffect(() => {
      if (sonido) {
        // Speech.speak(`Elegiste ${opcionSeleccionada.nombre}`);
        Speech.speak(`Escoge una figura para aprenderla`);
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
                Escoge una figura para aprenderla
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
          <ModalFigurasDetalle
          setOpcionSeleccionada={setOpcionSeleccionada}
            opcionSeleccionada={opcionSeleccionada}
          />
        )}
      </View>
    );
  };
  
  export default FigurasAprender;
  
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
  