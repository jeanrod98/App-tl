
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
  import musica_fondo_2 from "../assets/animales_juego.jpg";
  import { Card } from "react-native-paper";
import AbecedarioOneGame from "./AbecedarioOneGame";
import ColoresOneGame from "./ColoresOneGame";
import InstrumentosOneGame from "./InstrumentosOneGame";
import AnimalesOneGame from "./AnimalesOneGame";


const AnimalesElegir = ({ setEscogerObjetos }) => {
    const { dataAlert, setDataAlert, logOut, setOption } = useAuth();

  const [mostrarGame, setMostrarGame] = useState(false);

    return ( 
        <View style={styles.containerEscogerObjetos}>
      <View style={{...styles.container, backgroundColor: mostrarGame ? "rgba(255, 255, 255, .9)" : "rgba(255, 255, 255, 1)"}}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setEscogerObjetos(false);
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
        <View style={{...styles.contenido}}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>
            Escoge la opción correcta
            </Text>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          <ImageBackground
            source={mostrarGame ? "" : musica_fondo_2}
            resizeMode="contain"
            imageStyle={{ opacity: 1, }}
            style={{...styles.game}}
          >
            {mostrarGame ? (
              <AnimalesOneGame />
            ) : (
              <>
              <TouchableOpacity
                      style={styles.btnPlay}
                      onPress={() => {
                        setMostrarGame(true);
                      }}
                    >
                <Card style={styles.card}>
                  <Card.Content>
                    
                      <FontAwesome5 name="play" size={32} color="#3f51b5" />
                    <Text style={{ fontSize: 12, fontWeight: "700" }}>Iniciar</Text>
                  </Card.Content>
                </Card>
                </TouchableOpacity>
                
              </>
            )}
          </ImageBackground>
        </View>
      </View>
      {dataAlert.active && <Alerts />}
    </View>
     );
}
 
export default AnimalesElegir;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerEscogerObjetos: {
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
    backgroundColor: "rgba(255, 255, 255, .9)",
    width: "96%",
    // height: height < 500 ? height - 65 : width - 65,
    padding: "2%",
  },
  card: {
    width: 80,
    height: 80,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50%",
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
    top: -12,
    right: -6,
    zIndex: 2,
  },
  contenido: {
    display: "flex",
    gap: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "blue",
  },
  txtHeader: {
    fontSize: 18,
    // textAlign: "center",
    fontWeight: "700",
  },
  game: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    height: height < 500 ? height - 160 : width - 160,
  },
});



