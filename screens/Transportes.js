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

import fondo_number from "../assets/juego_transportes_2.jpg";
import OrdenarNumeros from "../components/OrdenarNumeros";
import EscogeParesABC from "../components/EscogeParesABC";
import EscogerTransportes from "../components/EscogerTransportes";
import TransporteAprender from "../components/TransporteAprender";
import * as Speech from "expo-speech";

const Transportes = () => {
  const { dataAlert, setDataAlert, logOut, setOption, option, sonido } = useAuth();

  const [ordenarNumeros, setOrdenarNumeros] = useState(false);

  const [encontrarNumeros, setEncontrarNumeros] = useState(false);
  const [verAprender, setVerAprender] = useState(false);

  useEffect(() => {
    Speech.stop();
  }, []);

  const narrarAccion = async (text) => {
    if (sonido) {
      await Speech.stop();
      Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`);
    }
  };

  return (
    <View style={styles.containerTransportes}>
      <View style={styles.header}>
        <TouchableOpacity
          onLongPress={() => {
            Speech.stop();
            setOption({ ...option, next: false });
          }}
          onPress={() => narrarAccion("Cerrar Venta")}
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
            onLongPress={() => {
              Speech.stop();
              setVerAprender(false);
              setEncontrarNumeros(false);
              setOrdenarNumeros(true);
            }}
            onPress={() => narrarAccion("Realizar prueba")}
          >
            <Text style={styles.txtSubmenu}>Realizar prueba</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSubMenu}
            onLongPress={() => {
              Speech.stop();
              setOrdenarNumeros(false);
              setEncontrarNumeros(false);
              setVerAprender(true);
            }}
            onPress={() => narrarAccion("Aprender los transportes")}
          >
            <Text style={styles.txtSubmenu}>Aprender los Transportes</Text>
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
          <EscogerTransportes setOrdenarNumeros={setOrdenarNumeros} />
        )}
        {verAprender && <TransporteAprender setVerAprender={setVerAprender} />}
        {encontrarNumeros && <Text>Encuentra los números</Text>}
      </ImageBackground>
    </View>
  );
};

export default Transportes;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerTransportes: {
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
