
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
import * as Speech from "expo-speech";
  
  const VocalesAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption, sonido } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [alfabeto, setAlfabeto] = useState([
      { minuscula: "a", letra: "A", palabras: ["Avión","Árbol", "Amarillo"] },
      { minuscula: "e", letra: "E", palabras: ["Enano","Esmeralda", "Edificio"]},
      { minuscula: "i", letra: "I", palabras: ["Iguana","Indio", "Isla"]},
      { minuscula: "o", letra: "O", palabras: ["Oso","Ojo", "Oreja"]},
      { minuscula: "u", letra: "U", palabras: ["Uva","Uña", "Unicornio"]},
      
    ]);
  
    const [letraSeleccionada, setLetraSeleccionada] = useState({})
  
    useEffect(() => {
      if (sonido) {
        // Speech.speak(`Elegiste ${opcionSeleccionada.nombre}`);
        Speech.speak(`Escoge una fruta para aprenderla`);
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
                Escoge una vocal para aprenderla
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {alfabeto.map((abc, index) => (
                <TouchableOpacity key={index} 
                onLongPress={() => setLetraSeleccionada(abc)}
                onPress={() => narrarAccion(abc.letra)}
                >
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#242424" }}>
                      {abc.letra}
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
          letraSeleccionada.letra && <ModalVocalDetalle setLetraSeleccionada={setLetraSeleccionada} letraSeleccionada={letraSeleccionada}/>
        }
      </View>
    );
  };
  
  export default VocalesAprender;
  
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
  