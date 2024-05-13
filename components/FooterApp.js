import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import useAuth from "../Hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FooterApp = ({ ruta, name, data }) => {
  const { registrarUsuario, login, logOut, auth, setInicio } = useAuth();

  const handleNex = async () => {
   
    if (ruta === "/siguiente") {

      setInicio("false");
      await AsyncStorage.setItem("welcome", "false");

    } else if (ruta === "REGISTRAR") {
      await registrarUsuario(data);
      // Validar Campos del formulario
      console.log("Registrando");
    } else if (ruta === "INGRESAR") {
        console.log("Inicio de sesion");

      await login(data.correo, data.password);
    } else if (ruta === "/menu") {
      console.log("Entrar al juego");
    }
  };

  const mostrarAyuda = () => {
    alert("Mostrar Ayuda");
  };
  return (
    <View style={styles.container}>
      <AntDesign
        name="questioncircle"
        size={24}
        color="#fff"
        onPress={mostrarAyuda}
      />
      

      {ruta === "/menu" && (
        <Text style={{ color: "#fff", fontSize: 16 }}>
          ELIGE UNA OPCIÓN PARA CONTINUAR!
        </Text>
      )}
      <View style={{ display: "flex", flexDirection: "row", gap: 10}}>


      <TouchableOpacity style={styles.boton} onPress={handleNex}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>

      {ruta === "/menu" && (
        <TouchableOpacity style={{...styles.boton, backgroundColor: "#FC5151"}} onPress={logOut}>
          <Text style={{...styles.text, color: "#fff"}}>{auth?._id !== 1 ? "Cerrar Sesion" : "Salir"}</Text>
        </TouchableOpacity>
      )}
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
