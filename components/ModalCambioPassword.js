import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import useAuth from "../Hooks/useAuth";
import { TextInput } from "react-native-paper";
import { useState } from "react";

const ModalCambioPassword = ({ setMostrarCambioPassword }) => {
  const {
    dataAlert,
    setDataAlert,
    logOut,
    setOption,
    setConffetiShow,
    auth,
    actualizarPerfil,
    cambiarPassword,
  } = useAuth();

  const [mostrarPass1, setMostrarPass1] = useState(true);
  const [mostrarPass2, setMostrarPass2] = useState(true);
  const [mostrarPass3, setMostrarPass3] = useState(true);

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passActual, setPassActual] = useState("");

  const cambiarContrasenia = () => {
    if (pass1 !== pass2){
        setDataAlert({
          icon: "danger",
          tittle: "Validación",
          detalle: "Las contraseñas no son iguales.",
          active: true,
          tipe: "validation",
        });
  
        return
    }

    if (pass1 === '' || pass2 === '' || passActual === ''){
        setDataAlert({
          icon: "danger",
          tittle: "Validación",
          detalle: "Los campos son obligatorios.",
          active: true,
          tipe: "validation",
        });
  
        return
    }

    setDataAlert({
        icon: "error",
        tipe: "actualizar-password",
        tittle: "Actualizar la contraseña",
        detalle: "¿Estás seguro de actualizar la contraseña de esta cuenta?, la sesión se cerrará!",
        active: true,
        passwords: {passActual, pass1}
      });
  }

  return (
    <View style={styles.containerAlert}>
      <View style={styles.card}>
        <Text style={styles.tittle}>{"Cambio de contraseña"}</Text>
        <View style={styles.contenedorInputs}>
          <TextInput
            placeholder="Contraseña Actual"
            secureTextEntry={mostrarPass1}
            style={styles.input}
            value={passActual}
            onChangeText={(text) => setPassActual(text)}
          />
          {mostrarPass1 ? (
            <Ionicons
              style={styles.iconShowPass}
              name="eye"
              size={24}
              onPress={() => setMostrarPass1(false)}
            />
          ) : (
            <Ionicons
              style={styles.iconShowPass}
              name="eye-off"
              size={24}
              onPress={() => setMostrarPass1(true)}
            />
          )}
        </View>
        <View style={styles.contenedorInputs}>
          <TextInput
            placeholder="Nueva contraseña"
            secureTextEntry={mostrarPass2}
            style={styles.input}
            value={pass1}
            onChangeText={(text) => setPass1(text)}

          />
          {mostrarPass2 ? (
            <Ionicons
              style={styles.iconShowPass}
              name="eye"
              size={24}
              onPress={() => setMostrarPass2(false)}
              
            />
          ) : (
            <Ionicons
              style={styles.iconShowPass}
              name="eye-off"
              size={24}
              onPress={() => setMostrarPass2(true)}
            />
          )}
        </View>
        <View style={styles.contenedorInputs}>
          <TextInput
            placeholder="Repetir la contraseña"
            secureTextEntry={mostrarPass3}
            style={styles.input}
            value={pass2}
            onChangeText={(text) => setPass2(text)}

          />
          {mostrarPass3 ? (
            <Ionicons
              style={styles.iconShowPass}
              name="eye"
              size={24}
              onPress={() => setMostrarPass3(false)}
            />
          ) : (
            <Ionicons
              style={styles.iconShowPass}
              name="eye-off"
              size={24}
              onPress={() => setMostrarPass3(true)}
            />
          )}
        </View>

        <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setMostrarCambioPassword(false)}
          >
            <Text style={styles.textBtn}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#3ECC57" }}
            onPress={() => cambiarContrasenia()}
          >
            <Text style={{ ...styles.textBtn, color: "#fff" }}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalCambioPassword;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerAlert: {
    position: "absolute",
    top: 0,
    height: height < 500 ? height - 50 : width - 50,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "50%",
    // height: 160,
    backgroundColor: "#fff",
    // top: 50,
    padding: 20,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
  tittle: {
    fontWeight: "700",
    color: "#303f9f",
    fontSize: 16,
  },
  description: {
    color: "#000",
    fontStyle: "italic",
    fontWeight: "700",
  },
  button: {
    padding: 8,
    backgroundColor: "#c5cae9",
    width: 100,
    borderRadius: 4,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontWeight: "700",
  },
  contenedorInputs: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "red",
    width: "100%",
    marginTop: 2,
    display: "flex",
    alignItems: "center",
  },

  input: {
    fontSize: 14,
    color: "#575353",
    fontWeight: "bold",
    width: "90%",
    height: 30,
    paddingRight: 35,

    // marginLeft: 15,
    // marginTop: 1,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderWidth: 0.3,

    borderColor: "#000",
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  iconShowPass: {
    position: "absolute",
    top: 3,
    right: 30,
    color: "#303F9F",
  },
});
