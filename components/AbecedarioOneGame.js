import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState, createRef, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Card } from "react-native-paper";
import useAuth from "../Hooks/useAuth";
import conffeti from "../assets/confeti.json";
import LottieView from "lottie-react-native";

import * as Speech from "expo-speech";
import clienteAxios from "../config/axios";

const AbecedarioOneGame = ({ 
  dinamica, 
  capturarTiempo, 
  setAciertos, 
  aciertos, 
  setErrores,
  errores,
  tiempo }) => {
  const {
    dataAlert,
    setDataAlert,
    conffetiShow,
    setConffetiShow,
    sonido,
    auth,
  } = useAuth();

  const [arregloAbecedario, setArregloAbecedario] = useState([]);
  const [arregloAbecedarioTwo, setArregloAbecedarioTwo] = useState([]);
  const confettiRef = useRef(null);

  

  useEffect(() => {
    barajearArreglo();

  }, []);

  const registrarAvance = async () => {
    try {
      const { data } = await clienteAxios.post("/avance-registro",
        {
          usuario: auth.nombres,
          modulo: "ALFABETO",
          fecha_avance: new Date().toLocaleString("EC").split(" ")[0],
          id_cliente: auth._id,
          id_terapeuta: auth.terapeuta_cli,
          aciertos,
          errores,
          tiempo,
        }
      )
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  

  const barajearArreglo = async () => {
    if (sonido) {
      Speech.speak(dinamica);
    }

    let arregloAbecedario = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "Ñ",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    let arregloAbecedarioDos = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "Ñ",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ].reverse();

    // barajea el arregloD

    const array_uno = await shuffle(arregloAbecedario);
    const array_dos = await shuffle(arregloAbecedarioDos);

    setArregloAbecedario(array_uno);
    setArregloAbecedarioTwo(array_dos);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [letraElegidaUno, setLetraElegidaUno] = useState("");
  const [letraElegidaDos, setletraElegidaDos] = useState("");

  const seleccionarCard = (value, tablero) => {
    if (sonido) {
      Speech.speak(`Escogiste la letra ${value}`);
    }

    if (tablero === "T1") {
      setLetraElegidaUno(value);
    } else {
      setletraElegidaDos(value);
    }
  };

  const validarResultados = async () => {
    // console.log("validando...");
    // !validar que haya elegido una letra de cada tablero
    if (letraElegidaUno == "" || letraElegidaDos == "") {
      setDataAlert({
        icon: "danger",
        tittle: "Validación",
        detalle: "Debes elegir una letra de cada tablero.",
        active: true,
        tipe: "validation",
      });

      if (sonido) Speech.speak(`Debes elegir una letra de cada tablero.`);

      return;
    }

    // !validar que sean iguales las letras
    if (letraElegidaUno !== letraElegidaDos) {
      if (auth?.tipo === "Cliente") setErrores(errores + 1);

     
      // console.log(aciertos);
      setDataAlert({
        icon: "sad",
        tittle: "Letras distintas",
        detalle:
          "Ups!, las letras seleccionadas no son iguales, inténtalo de nuevo.",
        active: true,
        tipe: "validation",
      });
      if (sonido)
        Speech.speak(
          `Ups!, las letras seleccionadas no son iguales, inténtalo de nuevo.`
        );

      return;
    }

    // * valida si son iguales le muestra el conffeti
    if (letraElegidaUno === letraElegidaDos) {
      // setConffetiShow(true);
      if (auth?.tipo === "Cliente") setAciertos(aciertos+1);
      // detener el tiempo

      confettiRef.current?.play(0);
      const newArregloOne = await arregloAbecedario.filter(
        (letra) => letra !== letraElegidaUno
      );
      const newArregloTwo = await arregloAbecedarioTwo.filter(
        (letra) => letra !== letraElegidaDos
      );
      setArregloAbecedario(newArregloOne);
      setArregloAbecedarioTwo(newArregloTwo);
      setLetraElegidaUno("");
      setletraElegidaDos("");

      // * valida que si ya no hay elementos finaliza el juego

      if (newArregloOne.length == 0 || newArregloTwo.length == 0) {
        // console.log(arregloAbecedario.length);

        // todo: Aqui se termina de capturar los datos
        if (auth?.tipo === "Cliente") capturarTiempo(false);

        // *Aqui se registran los datos
        registrarAvance();

        setConffetiShow(true);
        confettiRef.current?.play(0);
        setDataAlert({
          icon: "success",
          tittle: "¡FELICIDADES!",
          detalle:
            "Has logrado encontrar todos los pares del abecedario. Sigue así y llegarás lejos!.",
          active: true,
          tipe: "validation",
        });

        if (sonido)
          Speech.speak(
            `Has logrado encontrar todos los pares del abecedario. Sigue así y llegarás lejos!.`
          );
      }
    }
  };
  return (
    <>
      <View style={styles.contenido}>
        {/* <Text style={{ fontWeight: "700"}}>Selecciona un número</Text> */}
        <View style={styles.contenedorTablero}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700" }}>La letra escogida es: </Text>
            <TouchableOpacity>
              <Card style={{ ...styles.card }}>
                {/* <Card.Content> */}
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {letraElegidaUno}
                </Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
                {/* </Card.Content> */}
              </Card>
            </TouchableOpacity>
          </View>

          <View style={styles.contenidoCard}>
            {arregloAbecedario.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => seleccionarCard(value, "T1")}
              >
                <Card style={styles.card}>
                  {/* <Card.Content> */}
                  <Text style={{ fontSize: 12, fontWeight: "700" }}>
                    {value}
                  </Text>
                  {/* <Text variant="titleLarge">Card title</Text> */}
                  {/* </Card.Content> */}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* <Text style={{ fontWeight: "700"}}>Números Ordenados</Text> */}

        <View style={styles.contenedorTablero}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "700" }}>La letra escogida es: </Text>
            <TouchableOpacity>
              <Card style={styles.card}>
                {/* <Card.Content> */}
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {letraElegidaDos}
                </Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
                {/* </Card.Content> */}
              </Card>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.contenidoCard, backgroundColor: "#9fa8da" }}>
            <>
              {arregloAbecedarioTwo.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => seleccionarCard(value, "T2")}
                >
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
                    <Text style={{ fontSize: 12, fontWeight: "700" }}>
                      {value}
                    </Text>
                    {/* <Text variant="titleLarge">Card title</Text> */}
                    {/* </Card.Content> */}
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          </View>
        </View>
      </View>
      <View style={styles.controles}>
        <TouchableOpacity
          style={styles.btnReload}
          onPress={() => {
            setLetraElegidaUno("");
            setletraElegidaDos("");
            barajearArreglo();
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

export default AbecedarioOneGame;

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
    flexDirection: "row",

    // backgroundColor: "yellow",
    width: "100%",
    height: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",
    gap: 20,
    overflow: "hidden",
  },
  btnPlay: {},
  contenedorTablero: {
    display: "flex",
    // backgroundColor: "green",
    width: "48%",
  },
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#8c9eff",
    padding: 6,
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 10,
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
    width: 35,
    height: 35,
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
    marginTop: 0,
  },
});
