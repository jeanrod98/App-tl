import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import useAuth from "../Hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import * as Speech from "expo-speech";

const FooterApp = ({ ruta, name, data, setDataForm }) => {
  const {
    registrarUsuario,
    login,
    logOut,
    auth,
    setInicio,
    option,
    setOption,
    setDataAlert,
  } = useAuth();

  const handleNex = async () => {
    const expresionCorreo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if (ruta === "/siguiente") {
      setInicio("false");
      await AsyncStorage.setItem("welcome", "false");
    } else if (ruta === "REGISTRAR") {
      // ! Validar registro
      if (
        data.correo === "" ||
        data.password === "" ||
        data.nombres === "" ||
        data.rptPassword === ""
      ) {
        setDataAlert({
          icon: "error",
          tittle: "Registro de usuario",
          detalle: "Todos los campos son obligatorios!",
          active: true,
          tipe: "validation",
        });
        Speech.speak("Todos los campos son obligatorios!");
        return;
      }
      // ! Validar registro correo

      // validar el formato de correo
      if (!expresionCorreo.test(data.correo)) {
        setDataAlert({
          icon: "error",
          tittle: "Registro de usuario",
          detalle: "El formato del correo no es el correcto!",
          active: true,
          tipe: "validation",
        });
        Speech.speak("El formato del correo no es el correcto!");
        return;
      }

      console.log(data);
      if (data.rptPassword !== data.password) {
        setDataAlert({
          icon: "error",
          tittle: "Registro de usuario",
          detalle: "Las contraseña no coinciden.",
          active: true,
          tipe: "validation",
        });
        Speech.speak("Las contraseña no coinciden.");
        return;
      }

      const res = await registrarUsuario(data);

      // console.log(res);
      if (res)
        setDataForm({
          nombres: "",
          correo: "",
          password: "",
          rptPassword: "",
        });
      // Validar Campos del formulario
      // console.log("Registrando");
    } else if (ruta === "INGRESAR") {
      // ! Validar Login
      if (data.correo === "" || data.password === "") {
        setDataAlert({
          icon: "error",
          tittle: "Inicio de Sesión",
          detalle: "Todos los campos son obligatorios!",
          active: true,
          tipe: "validation",
        });
        Speech.speak("Todos los campos son obligatorios!");
        return;
      }
      // ! Validar Login correo

      // validar el formato de correo
      if (!expresionCorreo.test(data.correo)) {
        setDataAlert({
          icon: "error",
          tittle: "Inicio de Sesión",
          detalle: "El formato del correo no es el correcto!",
          active: true,
          tipe: "validation",
        });
        Speech.speak("El formato del correo no es el correcto!");
        return;
      }

      // console.log("Inicio de sesion");

      await login(data.correo, data.password);
    } else if (ruta === "/menu") {
      // console.log("menu");
      // console.log(option.active);
      // validar que se haya elegido una opcion del menu
      if (option.activo === false) {
        // ! alerta
        setDataAlert({
          tipe: "error",
          tittle: "ELIGE UNA OPCIÓN",
          detalle: "Debes elegir una opción del menú para continuar!",
          active: true,
        });
        Speech.speak("Debes elegir una opción del menú para continuar!");

        return;
      }

      setOption({ ...option, next: true });
    }
  };

  const mostrarAyuda = () => {
    alert("Mostrar Ayuda");
  };

  const mostrarSettings = () => {
    alert("Mostrar Configuracion");
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <TouchableOpacity onPress={mostrarAyuda}>
          <AntDesign
            name="questioncircle"
            size={24}
            color="#fff"
            
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={mostrarSettings}>
          <Ionicons name="settings" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {ruta === "/menu" && (
        <Text style={{ color: "#fff", fontSize: 16 }}>
          ELIGE UNA OPCIÓN PARA CONTINUAR!
        </Text>
      )}
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <TouchableOpacity style={styles.boton} onPress={handleNex}>
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>

        {/* {ruta === "/menu" && (
        <TouchableOpacity style={{...styles.boton, backgroundColor: "#FC5151"}} onPress={logOut}>
          <Text style={{...styles.text, color: "#fff"}}>{auth?._id !== 1 ? "Cerrar Sesion" : "Salir"}</Text>
        </TouchableOpacity>
      )} */}
      </View>
    </View>
  );
};

export default FooterApp;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#5C6BC0",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    color: "#303F9F",
    fontWeight: "700",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#C5CAE9",
    width: 100,
    height: 28,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
