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

import juego_vocales_1 from "../assets/juego_vocales_1.jpg";
import OrdenarNumeros from "../components/OrdenarNumeros";
import EscogeParesABC from "../components/EscogeParesABC";
import EscogeVocal from "../components/EscogeVocal";
import VocalesAprender from "../components/VocalesAprender";
import * as Speech from "expo-speech";

const Vocales = () => {
  const { dataAlert, setDataAlert, logOut, setOption, option } = useAuth();

  const [escogeLaVocal, setEscogeLaVocal] = useState(false);
  const [verAprender, setVerAprender] = useState(false);
  const [encontrarNumeros, setEncontrarNumeros] = useState(false);

  useEffect(() => {
    Speech.stop();
  }, []);
  return (
    <View style={styles.containerVocales}>
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
        source={juego_vocales_1}
        resizeMode="contain"
        style={styles.contenido}
      >
        <View style={styles.opcionesModulo}>
          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setVerAprender(false);
              setEncontrarNumeros(false);
              setEscogeLaVocal(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Escoge la vocal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setEscogeLaVocal(false);
              setEncontrarNumeros(false);
              setVerAprender(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Aprender las Vocales</Text>
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
        {escogeLaVocal && <EscogeVocal setEscogeLaVocal={setEscogeLaVocal} />}
        {verAprender && <VocalesAprender setVerAprender={setVerAprender} />}
        {encontrarNumeros && <Text>Encuentra los números</Text>}
      </ImageBackground>
    </View>
  );
};

export default Vocales;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerVocales: {
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
