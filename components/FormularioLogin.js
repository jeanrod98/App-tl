import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import imagen_3 from "../assets/imagen_3_login.png";
import imagen_2 from "../assets/registro.jpg";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const FormularioLogin = ({ setDataForm, dataForm }) => {
  const [mostrarPass, setMostrarPass] = useState(true);

  return (
    <View style={styles.container}>
      {/* <Image source={imagen_3} style={styles.img} /> */}

      <View style={styles.form}>
        <ImageBackground
          source={imagen_2}
          resizeMode="center"
          style={styles.contenedorFormulario}
        >
          {/* <Image style={{ width: 100, height: 65, marginTop: 35 }} source={logo} /> */}
          <View style={styles.formulario}>
            <Text style={styles.titulo}>INICIAR SESIÓN</Text>

            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su correo"
                onChangeText={(text) => {
                  setDataForm({ ...dataForm, correo: text });
                }}
              />
            </View>
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={{...styles.textInput, position: "relative"}}
                placeholder="Ingrese su contraseña"
                secureTextEntry={mostrarPass}
                onChangeText={(text) => {
                  setDataForm({ ...dataForm, password: text });
                }}
              />
              {mostrarPass ? (
                <Ionicons
                  style={styles.iconShowPass}
                  name="eye"
                  size={24}
                  onPress={() => setMostrarPass(false)}
                />
              ) : (
                <Ionicons
                  style={styles.iconShowPass}
                  name="eye-off"
                  size={24}
                  onPress={() => setMostrarPass(true)}
                />
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default FormularioLogin;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    //   backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    //   width: "100%",
    height: "100%",
  },

  img: {
    width: "40%",
    height: 200,
  },
  contenedorFormulario: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#303F9F",
    paddingVertical: 10,
    height: 220,
  },

  form: {
    width: "80%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    // justifyContent: "center"
  },

  titulo: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "700",
    //  marginTop: 50,
    textAlign: "center",
  },
  formulario: {
    // backgroundColor: 'yellow',
    backgroundColor: "rgba(48, 63, 159, .5)",
    width: "70%",
    // overflow: "scroll",
    // margin: "auto",
    // marginLeft: 50,
    padding: 10,
    borderRadius: 8,
    paddingBottom: 15,
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
  textInput: {
    fontSize: 14,
    color: "#575353",
    fontWeight: "bold",
    width: "90%",
    height: 30,
    paddingLeft: 10,
    paddingRight: 35,

    // marginLeft: 15,
    marginTop: 12,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
    

  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingLeft: 10,
    marginTop: 10,
    color: "#fff",
  },

  iconShowPass: {
    position: "absolute",
    top: 43,
    right: 30,
    color: "#303F9F"
  }
});
