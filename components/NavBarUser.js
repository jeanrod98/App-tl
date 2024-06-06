import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import useAuth from "../Hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import Alerts from "./Alerts";

import * as Speech from 'expo-speech';

const NavBarUser = () => {
  const { auth, logOut, dataAlert, setDataAlert } = useAuth();

//   console.log(auth);
  const salir = () => {
    Speech.speak("¿Estás seguro de salir o cerrar la sesión?");

    setDataAlert({
      icon: "error",
      tipe: "question",
      tittle: "Salir del menú",
      detalle: "¿Estás seguro de salir o cerrar la sesión?",
      active: true,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.datosUsuario}>
        <Text style={styles.usuario}>{auth?.nombres_usu}</Text>
        <Text style={styles.tipo}>{auth?.tipo_usu}</Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={salir}>
        <AntDesign name="logout" size={18} color="#FC5151" />
        <Text style={styles.text}>{"Salir"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBarUser;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    //   backgroundColor: "#5C6BC0",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    width: "100%",
    paddingHorizontal: 15,
  },
  datosUsuario: {
    display: "flex",

    alignItems: "flex-start",
    justifyContent: "center",
  },
  usuario: {
    fontSize: 14,
    color: "#5C6BC0",
    fontWeight: "700",
  },
  tipo: {
    fontSize: 10,
    color: "#5C6BC0",
    fontWeight: "700",
  },
  text: {
    color: "#5C6BC0",
    fontWeight: "700",
    fontSize: 10,
  },
  boton: {
    // backgroundColor: "#C5CAE9",
    // width: 38,
    height: 38,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
