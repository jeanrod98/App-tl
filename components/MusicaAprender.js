

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
  
  import { useEffect, useState } from "react";
  import useAuth from "../Hooks/useAuth";
  import Alerts from "./Alerts";
  import fondo_number_2 from "../assets/musica_fondo_2.jpg";
  import { Card } from "react-native-paper";


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

  import guitarra_3 from "../assets/guitarra_3.jpg";
  import guitarra_4 from "../assets/guitarra_4.jpg";
  import piano_3 from "../assets/piano_3.jpg";
  import piano_4 from "../assets/piano_4.jpg";
  import bateria_3 from "../assets/bateria_3.jpg";
  import bateria_4 from "../assets/bateria_4.jpg";
  import flauta_3 from "../assets/flauta_3.jpg";
  import flauta_4 from "../assets/flauta_4.jpg";
  import violin_3 from "../assets/violin_3.jpg";
  import violin_4 from "../assets/violin_4.jpg";
  import trompeta_3 from "../assets/trompeta_3.jpg";
  import trompeta_4 from "../assets/trompeta_4.jpg";
  import acordeon_3 from "../assets/acordeon_3.jpg";
  import acordeon_4 from "../assets/acordeon_4.jpg";
  import arpa_3 from "../assets/arpa_3.jpg";
  import arpa_4 from "../assets/arpa_4.jpg";

  import guitarra_sound from "../assets/sounds/guitarra.mp3";
  import bateria_sound from "../assets/sounds/bateria.mp3";
  import piano_sound from "../assets/sounds/piano.mp3";
  import flauta_sound from "../assets/sounds/flauta.mp3";
  import violin_sound from "../assets/sounds/violin.mp3";
  import trompeta_sound from "../assets/sounds/trompeta.mp3";
  import acordeon_sound from "../assets/sounds/acordeon.mp3";
  import arpaa_sound from "../assets/sounds/arpa.mp3";
  

  import * as Speech from "expo-speech";


import ModalMusicaDetalle from "./ModalMusicaDetalle";
  
  const MusicaAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption, sonido } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [ instrumento, setInstrumento] = useState([
        {  nombre: "GUITARRA", source_1: img_guitarra, sound: guitarra_sound, imagenes: [instrumento_guitarra, guitarra_3, guitarra_4] },
        { nombre: "PIANO", source_1: img_piano, sound: piano_sound,imagenes: [instrumento_piano, piano_3, piano_4] },
        { nombre: "BATERÍA", source_1: img_bateria, sound: bateria_sound,imagenes: [instrumento_bateria, bateria_3, bateria_4] },
        { nombre: "FLAUTA", source_1: img_flauta, sound: flauta_sound,imagenes: [instrumento_flauta, flauta_3, flauta_4] },
        { nombre: "VIOLÍN", source_1: img_violin, sound: violin_sound,imagenes: [instrumento_violin, violin_3, violin_4] },
        { nombre: "TROMPETA", source_1: img_trompeta, sound: trompeta_sound,imagenes: [instrumento_trompeta, trompeta_3, trompeta_4] },
        { nombre: "ACORDEÓN", source_1: img_acordeon, sound: acordeon_sound,imagenes: [instrumento_acordeon, acordeon_3, acordeon_4] },
        { nombre: "ARPA", source_1: img_arpa, sound: arpaa_sound,imagenes: [instrumento_arpa, arpa_3, arpa_4] },
    ]);
  
    const [ opcionSeleccionada, setOpcionSeleccionada] = useState({});

    useEffect(() => {
      if (sonido) {
        // Speech.speak(`Elegiste ${opcionSeleccionada.nombre}`);
        Speech.speak(`Escoge un instrumento para aprenderlo`);
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
                Escoge un instrumento para aprenderlo
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {instrumento.map((transporte, index) => (
                <TouchableOpacity
                  key={index}
                  onLongPress={() => setOpcionSeleccionada(transporte)}
                  onPress={() => narrarAccion(transporte.nombre)}
                >
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
  
                    <Image style={styles.imgCard} source={transporte?.source_1} />
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
          <ModalMusicaDetalle
          setOpcionSeleccionada={setOpcionSeleccionada}
            opcionSeleccionada={opcionSeleccionada}
          />
        )}
      </View>
    );
  };
  
  export default MusicaAprender;
  
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
  