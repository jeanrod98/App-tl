import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";

import fondo_number from "../assets/colores_fondo_1.jpg";
import ColoresElegirObjetos from "../components/ColoresElegirObjetos";
import ColorAprender from "../components/ColorAprender";
import * as Speech from 'expo-speech';

const Colores = () => {
  const { dataAlert, setDataAlert, logOut, setOption, option, sonido } = useAuth();

  const [escogerObjetos, setEscogerObjetos] = useState(false);
  const [verAprender, setVerAprender] = useState(false);
  const [encontrarNumeros, setEncontrarNumeros] = useState(false);

  useEffect(() => {
    if(sonido) Speech.stop();
  }, []);

  const narrarAccion = async ( text ) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`)
    }
   
  }

  return (
    <View style={styles.containerColores}>
      <View style={styles.header}>
        <TouchableOpacity
          onLongPress={() => {
            Speech.stop();
            setOption({ ...option, next: false });
          }}

          onPress={() => narrarAccion("Cerrar Ventana")}
        >
          <AntDesign
            style={styles.btnClose}
            name="closecircle"
            size={28}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={fondo_number}
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
        style={styles.contenido}
      >
        <View style={styles.opcionesModulo}>
          <TouchableOpacity
            style={styles.botonSubMenu}
            onLongPress={() => {
              Speech.stop();
              setVerAprender(false);
              setEncontrarNumeros(false);
              setEscogerObjetos(true);
            }}
            onPress={() => narrarAccion("Realizar prueba")}
          >
            <Text style={styles.txtSubmenu}>Realizar prueba</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSubMenu}
            onLongPress={() => {
              Speech.stop();
              setEscogerObjetos(false);
              setEncontrarNumeros(false);
              setVerAprender(true);
            }}
            onPress={() => narrarAccion("Aprender los colores")}
          >
            <Text style={styles.txtSubmenu}>Aprender los colores</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setOrdenarNumeros(false);
              setEscogerNumeros(false);
              setEncontrarNumeros(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Encuentra los números</Text>
          </TouchableOpacity>
             */}
        </View>
        {escogerObjetos && (
          <ColoresElegirObjetos setEscogerObjetos={setEscogerObjetos} />
        )}
        {verAprender && <ColorAprender setVerAprender={setVerAprender} />}
        {encontrarNumeros && <Text>Encuentra los números</Text>}
      </ImageBackground>
    </View>
  );
};

export default Colores;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerColores: {
    position: "absolute",
    top: 0,
    height: height < 500 ? height - 50 : width - 50,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 12,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    height: 50,
  },
  opcionesModulo: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  btnClose: {
    // position: "absolute",
    // top: 20,
    // right: 20,
  },
  botonSubMenu: {
    backgroundColor: "#7986cb",
    padding: 10,
    borderRadius: 4,
    width: 200,
  },
  txtSubmenu: {
    color: "#fff",
    textAlign: "center",
  },
  contenido: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height < 500 ? height - 110 : width - 110,
    // backgroundColor: "yellow",
  },
});
