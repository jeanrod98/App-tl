
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
  import fondo_number_2 from "../assets/animales_juego.jpg";
  import { Card } from "react-native-paper";
  import AbecedarioOneGame from "./AbecedarioOneGame";
  import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
  import ModalTransporteDetalle from "./ModalTransporteDetalle";
  

  import perro_2 from "../assets/perro_2.jpg";
  import perro_3 from "../assets/perro_3.jpg";
  import perro_4 from "../assets/perro_4.jpg";
  

  import gato_2 from "../assets/gato_2.jpg";
  import gato_3 from "../assets/gato_3.jpg";
  import gato_4 from "../assets/gato_4.jpg";
  

  import leon_2 from "../assets/leon_2.jpg";
  import leon_3 from "../assets/leon_3.jpg";
  import leon_4 from "../assets/leon_4.jpg";
  

  import vaca_2 from "../assets/vaca_2.jpg";
  import vaca_3 from "../assets/vaca_3.jpg";
  import vaca_4 from "../assets/vaca_4.jpg";
  

  import cabra_2 from "../assets/cabra_2.jpg";
  import cabra_3 from "../assets/cabra_3.jpg";
  import cabra_4 from "../assets/cabra_4.jpg";
  

  import gallo_2 from "../assets/gallo_2.jpg";
  import gallo_3 from "../assets/gallo_3.jpg";
  import gallo_4 from "../assets/gallo_4.jpg";
  
 
  import lobo_2 from "../assets/lobo_2.jpg";
  import lobo_3 from "../assets/lobo_3.jpg";
  import lobo_4 from "../assets/lobo_4.jpg";
  

  import cerdo_2 from "../assets/cerdo_2.jpg";
  import cerdo_3 from "../assets/cerdo_3.jpg";
  import cerdo_4 from "../assets/cerdo_4.jpg";

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


import ModalAnimalesDetalle from "./ModalAnimalesDetalle";
  
  const AnimalesAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [ transporte, setTransporte] = useState([
      { nombre: "PERRO", source: img_perro, audio: sonido_perro, imagenes: [perro_2, perro_3, perro_4] },
      { nombre: "GATO", source: img_gato,  audio: sonido_gato, imagenes: [gato_2, gato_3, gato_4] },
      { nombre: "LEÓN", source: img_leon, audio: sonido_leon , imagenes: [leon_2, leon_3, leon_4] },
      { nombre: "VACA", source: img_vaca, audio: sonido_vaca, imagenes: [vaca_2, vaca_3, vaca_4] },
      { nombre: "CABRA", source: img_chivo, audio: sonido_cabra, imagenes: [cabra_2, cabra_3, cabra_4] },
      {
        nombre: "GALLO",
        source: img_gallo,
        audio: sonido_gallo,
        imagenes: [gallo_2, gallo_3, gallo_4],
      },
      { nombre: "LOBO", source: img_lobo, audio: sonido_lobo, imagenes: [lobo_2, lobo_3, lobo_4] },
      { nombre: "CERDO", source: img_cerdo, audio: sonido_cerdo, imagenes: [cerdo_2, cerdo_3, cerdo_4] },
    ]);
  
    const [ opcionSeleccionada, setOpcionSeleccionada] = useState({});
  
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
                Escoge un animal para aprenderlo
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {transporte.map((transporte, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setOpcionSeleccionada(transporte)}
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
          <ModalAnimalesDetalle
          setOpcionSeleccionada={setOpcionSeleccionada}
            opcionSeleccionada={opcionSeleccionada}
          />
        )}
      </View>
    );
  };
  
  export default AnimalesAprender;
  
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
  