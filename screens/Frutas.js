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

import fondo_number from "../assets/juego_frutas.jpg";
import OrdenarNumeros from "../components/OrdenarNumeros";
import EscogeParesABC from "../components/EscogeParesABC";
import EscogerTransportes from "../components/EscogerTransportes";
import EscogerFrutas from "../components/EscogerFrutas";
import FrutasAprender from "../components/FrutasAprender";
import * as Speech from 'expo-speech';


const Frutas = () => {
  const { dataAlert, setDataAlert, logOut, setOption, option } = useAuth();

  const [ordenarNumeros, setOrdenarNumeros] = useState(false);
  const [verAprender, setVerAprender] = useState(false);

  const [encontrarNumeros, setEncontrarNumeros] = useState(false);

  useEffect(() => {
    Speech.stop();
  }, []);

  return (
    <View style={styles.containerFrutas}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setOption({ ...option, next: false });
          }}
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
        resizeMode="contain"
        style={styles.contenido}
      >
        <View style={styles.opcionesModulo}>
          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setVerAprender(false);
              setEncontrarNumeros(false);
              setOrdenarNumeros(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Escoge las frutas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setOrdenarNumeros(false);
              setEncontrarNumeros(false);
              setVerAprender(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Aprender las Frutas</Text>
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
          </TouchableOpacity> */}
        </View>
        {ordenarNumeros && (
          <EscogerFrutas setOrdenarNumeros={setOrdenarNumeros} />
        )}
        {verAprender && <FrutasAprender setVerAprender={setVerAprender} />}
        {encontrarNumeros && <Text>Encuentra los números</Text>}
      </ImageBackground>
    </View>
  );
};

export default Frutas;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerFrutas: {
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
