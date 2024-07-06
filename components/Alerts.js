import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
import * as Speech from "expo-speech";

const Alerts = ({ tipe }) => {
  const {
    dataAlert,
    setDataAlert,
    logOut,
    setOption,
    setConffetiShow,
    auth,
    actualizarPerfil,
    cambiarPassword,
    registrarCliente,
    actualizarCliente,
    deleteCliente
  } = useAuth();


  // useEffect(()=> {
  //   Speech.stop()
    
  // },[])

  const salir = () => {
    setDataAlert({
      icon: "",
      tittle: "",
      detalle: "",
      active: false,
      tipe: "",
    });

    setOption({
      activo: false,
      nameOption: "",
      next: false,
    });
  };

  const cerrarAlert = () => {
    setConffetiShow(false);
    setDataAlert({
      icon: "",
      tittle: "",
      detalle: "",
      active: false,
      tipe: "",
    });
  };

  const actualizarInformacionPerfil = async () => {
    cerrarAlert();
    await actualizarPerfil();
  };

  const actualizarPassword = async () => {
    cerrarAlert();
    await cambiarPassword();
  };

  const crearCliente = async () => {
    cerrarAlert();
    await registrarCliente(dataAlert.cli);
  };
  const modificarCliente = async () => {
    cerrarAlert();
    await actualizarCliente(dataAlert.cli);
  };

  const eliminarCliente = async () => {
    cerrarAlert();
    await deleteCliente(dataAlert.cli_id);
  };

  return (
    <View style={styles.containerAlert}>
      <View style={styles.card}>
        {dataAlert.icon === "success" && (
          <AntDesign name="checkcircle" size={32} color="green" />
        )}
        {dataAlert.icon === "error" && (
          <MaterialIcons name="error" size={32} color="orange" />
        )}
        {dataAlert.icon === "danger" && (
          // <MaterialIcons name="error" size={32} color="orange" />
          <MaterialIcons name="dangerous" size={32} color="red" />
        )}
        {dataAlert.icon === "sad" && (
          <FontAwesome6 name="face-sad-cry" size={32} color="red" />
        )}
        <Text style={styles.tittle}>{dataAlert.tittle}</Text>
        <Text style={styles.description}>{dataAlert.detalle}</Text>

        <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={
              dataAlert.tipe === "validation" || dataAlert.tipe === "actualizar"
                ? cerrarAlert
                : salir
            }
          >
            <Text style={styles.textBtn}>
              {dataAlert.tipe === "question" ||
              dataAlert.tipe === "actualizar" ||
              dataAlert.tipe === "actualizar-password" ||
              dataAlert.tipe === "crear-cliente" ||
              dataAlert.tipe === "actualizar-cliente" ||
              dataAlert.tipe === "eliminar-cliente"
                ? "Cancelar"
                : "Aceptar"}
            </Text>
          </TouchableOpacity>

          {dataAlert.tipe === "question" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#FC5151" }}
              onPress={logOut}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Salir</Text>
            </TouchableOpacity>
          )}

          {dataAlert.tipe === "actualizar" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#3ECC57" }}
              onPress={actualizarInformacionPerfil}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Aceptar</Text>
            </TouchableOpacity>
          )}

          {dataAlert.tipe === "actualizar-password" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#3ECC57" }}
              onPress={actualizarPassword}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Aceptar</Text>
            </TouchableOpacity>
          )}

          {dataAlert.tipe === "crear-cliente" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#3ECC57" }}
              onPress={crearCliente}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Aceptar</Text>
            </TouchableOpacity>
          )}

          {dataAlert.tipe === "actualizar-cliente" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#3ECC57" }}
              onPress={modificarCliente}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Aceptar</Text>
            </TouchableOpacity>
          )}

          {dataAlert.tipe === "eliminar-cliente" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#FF504A" }}
              onPress={eliminarCliente}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Alerts;

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
});
