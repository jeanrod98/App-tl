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
import juego_vocales_2 from "../assets/juego_vocales_2.jpg";
import { Card } from "react-native-paper";
import AbecedarioOneGame from "./AbecedarioOneGame";
import VocalOneGame from "./VocalOneGame";
import clienteAxios from "../config/axios";
import * as Speech from "expo-speech";

const EscogeVocal = ({ setEscogeLaVocal }) => {
  const { dataAlert, setDataAlert, logOut, setOption, auth, sonido } = useAuth();

  const [mostrarGame, setMostrarGame] = useState(false);
  //

  // Estados para errores y aciertos
  let [aciertos, setAciertos] = useState(0);
  let [errores, setErrores] = useState(0);
  let [tiempo, setTiempo] = useState(0);

  const capturarDatos = () => {
    console.log("Capturando datos");
    capturarTiempo();
  };

  const [idTiempo, setIdTiempo] = useState(0);

  const capturarTiempo = (estado = true) => {
    let idtimer;

    if (estado === true) {
      idtimer = setInterval(() => {
        setTiempo(tiempo++);
        // console.log(tiempo);
      }, 1000);

      setIdTiempo(idtimer);
    } else {
      clearInterval(idTiempo);
      // console.log(tiempo);
    }
  };

  const registrarAvance = async () => {
    try {
      const { data } = await clienteAxios.post("/avance-registro", {
        usuario: auth.nombres,
        modulo: "VOCALES",
        fecha_avance: new Date().toLocaleString("EC").split(" ")[0],
        id_cliente: auth._id,
        id_terapeuta: auth.terapeuta_cli,
        aciertos,
        errores,
        tiempo,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const narrarAccion = async ( text ) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`)
    }
   
  }

  return (
    <View style={styles.containerOrdenarNumeros}>
      <View
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
            setEscogeLaVocal(false);
            if (auth?.tipo === "Cliente") capturarTiempo(false);
            if (aciertos > 0 || errores > 0) {
              // todo: Aqui se termina de capturar los datos
              // *Aqui se registran los datos
              if (auth?.tipo === "Cliente") registrarAvance();
            }
            setAciertos(0);
            setErrores(0);
            setTiempo(0);
          }}
          onPress={() => narrarAccion("Cerrar Ventana")}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
        <View style={{ ...styles.contenido }}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>Escoge la vocal correcta</Text>
            {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
          </View>

          <ImageBackground
            source={mostrarGame ? "" : juego_vocales_2}
            resizeMode="contain"
            imageStyle={{ opacity: 1 }}
            style={{ ...styles.game }}
          >
            {mostrarGame ? (
              <VocalOneGame
                setAciertos={setAciertos}
                setErrores={setErrores}
                capturarTiempo={capturarTiempo}
                aciertos={aciertos}
                errores={errores}
                tiempo={tiempo}
                dinamica={"Escoge la vocal correcta"}
              />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.btnPlay}
                  onLongPress={() => {
                    setMostrarGame(true);
                    if (auth?.tipo === "Cliente") capturarDatos();
                  }}
                  onPress={() => narrarAccion("Iniciar")}
                >
                  <Card style={styles.card}>
                    <Card.Content>
                      <FontAwesome5 name="play" size={32} color="#3f51b5" />
                      <Text style={{ fontSize: 12, fontWeight: "700" }}>
                        Iniciar
                      </Text>
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
};

export default EscogeVocal;

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
    backgroundColor: "rgba(255, 255, 255, .9)",
    width: "96%",
    // height: "90%",
    padding: "2%",
    paddingVertical: "3%",
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
    gap: 10,
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
