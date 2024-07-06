

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
  import fondo_number_2 from "../assets/color_fondo_2.jpg";
  import { Card } from "react-native-paper";
  import AbecedarioOneGame from "./AbecedarioOneGame";
  import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
import ModalVocalDetalle from "./ModalVocalDetalle";
import ModalColorDetalle from "./ModalColorDetalle";

import * as Speech from "expo-speech";
  
  const ColorAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption, sonido } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [colores, setColores] = useState([
        { color: "purple", nombre: "MORADO",  palabras: []},
        { color: "red", nombre: "ROJO",  palabras: []},
        { color: "blue", nombre: "AZUL",  palabras: []},
        { color: "green", nombre: "VERDE",  palabras: []},
        { color: "yellow", nombre: "AMARILLO",  palabras: []},
        { color: "pink", nombre: "ROSADO",  palabras: []},
        { color: "grey", nombre: "GRIS",  palabras: []},
        { color: "white", nombre: "BLANCO",  palabras: []},
        { color: "black", nombre: "NEGRO",  palabras: []},
        { color: "orange", nombre: "NARANJA",  palabras: []},
      
    ]);
  
    const [colorSeleccionada, setColorSeleccionada] = useState({})

    useEffect(() => {
      if (sonido) { 
        // Speech.speak(`Elegiste la letra ${letraSeleccionada.letra}`);
        Speech.stop();
        Speech.speak("Escoge un color para aprenderlo");
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
                Escoge un color para aprenderlo
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {colores.map((color, index) => (
                <TouchableOpacity key={index} 
                onLongPress={() => setColorSeleccionada(color)}
                onPress={() => narrarAccion(color.nombre)}
                >
                  <Card style={{...styles.card, backgroundColor: color.color}}>
                    {/* <Card.Content> */}
                    <Text style={{ fontSize: 12, fontWeight: "700", color: color.nombre === "BLANCO" || color.nombre === "AMARILLO" ? "#242424" : "#f9f9f9"  }}>
                      {color.nombre}
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
          colorSeleccionada.nombre && <ModalColorDetalle setColorSeleccionada={setColorSeleccionada} colorSeleccionada={colorSeleccionada}/>
        }
      </View>
    );
  };
  
  export default ColorAprender;
  
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
      width: 80,
      height: 80,
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
  