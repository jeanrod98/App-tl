

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
  import fondo_number_2 from "../assets/juego_vocales_2.jpg";
  import { Card } from "react-native-paper";
  import AbecedarioOneGame from "./AbecedarioOneGame";
  import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
import ModalVocalDetalle from "./ModalVocalDetalle";
import ModalNumerosDetalle from "./ModalNumerosDetalle";

import uno from "../assets/uno.jpg";
import dos from "../assets/dos.jpg";
import tres from "../assets/tres.jpg";
import cuatro from "../assets/cuatro.jpg";
import cinco from "../assets/cinco.jpg";

import seis from "../assets/seis.jpg";
import siete from "../assets/siete.jpg";
import ocho from "../assets/ocho.jpg";
import nueve from "../assets/nueve.jpg";
import diez from "../assets/diez.jpg";

  
  const NumerosAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [numeros, setNumeros] = useState([
      { escritura: "Uno", numero: "1", source: uno },
      { escritura: "Dos", numero: "2", source: dos},
      { escritura: "Tres", numero: "3", source: tres},
      { escritura: "Cuatro", numero: "4", source: cuatro},
      { escritura: "Cinco", numero: "5", source: cinco},
      { escritura: "Seis", numero: "6", source: seis},
      { escritura: "Siete", numero: "7", source: siete},
      { escritura: "Ocho", numero: "8", source: ocho},
      { escritura: "Nueve", numero: "9", source: nueve},
      { escritura: "Diez", numero: "10", source: diez},
      
    ]);
  
    const [NumeroSeleccionada, setNumeroSeleccionada] = useState({})
  
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
            onPress={() => {
              setVerAprender(false);
            }}
          >
            <AntDesign name="closecircle" size={32} color="red" />
          </TouchableOpacity>
          <View style={{ ...styles.contenido }}>
            <View style={styles.header}>
              <Text style={styles.txtHeader}>
                Escoge un número para aprenderlo
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {numeros.map((num, index) => (
                <TouchableOpacity key={index} onPress={() => setNumeroSeleccionada(num)}>
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#242424" }}>
                      {num.numero}
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
          NumeroSeleccionada.numero && <ModalNumerosDetalle setNumeroSeleccionada={setNumeroSeleccionada} NumeroSeleccionada={NumeroSeleccionada}/>
        }
      </View>
    );
  };
  
  export default NumerosAprender;
  
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
  