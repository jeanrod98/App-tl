import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import imagen_2 from "../assets/registro.jpg";

const FormularioRegistro = ({ dataForm, setDataForm }) => {

  return (
    <View style={styles.container}>
      {/* <Image source={imagen_2} style={styles.img} /> */}

      <View style={styles.form}>
        <ImageBackground
        source={imagen_2}
        resizeMode="center"
          style={styles.contenedorFormulario}
        >
         <Text style={styles.titulo}>REGISTRO DE USUARIO</Text>

          {/* <Image style={{ width: 100, height: 65, marginTop: 35 }} source={logo} /> */}
          <View style={styles.formulario}>
          

            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Nombre y Apellido:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su nombre y apellido"
                onChangeText={(text) => {
                  setDataForm({...dataForm, "nombres" : text})
                }}
              />
            </View>
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su correo"
                onChangeText={(text) => {
                  setDataForm({...dataForm, "correo" : text})
                }}
              />
            </View>
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su contraseña"
                onChangeText={(text) => {
                  setDataForm({...dataForm, "password" : text})
                }}
              />
            </View>
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Repetir Contraseña</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Repita su contraseña"
                onChangeText={(text) => {
                  setDataForm({...dataForm, "rptPassword" : text})
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default FormularioRegistro;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    //   width: "100%",
    height: "100%",

    
  },

  img: {
    width: "20%",
    height: 200,
    
  },

  form: {
    width: "80%",
    // backgroundColor: "#fff",
    // backgroundColor: "yellow",
    display: "flex",
    
    // alignItems: "center",
    // justifyContent: "center"
    
  },

  titulo: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    //  marginTop: 50,
    textAlign: "center",
    backgroundColor: "rgba(48, 63, 159, .5)",
    width: "100%",
    paddingTop: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contenedorFormulario:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#303F9F",
    paddingVertical: 10,
    height: 220,
    

  },
  formulario: {
    backgroundColor: 'rgba(48, 63, 159, .5)',
    
    width: "100%",
    // overflow: "scroll",
    // margin: "auto",
    // marginLeft: 50,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    height: "80%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 15,

  },
  contenedorInputs: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "red",
    width: "45%",
    marginTop: 2,
    display: "flex",
    alignItems: "center",
  },
  textInput: {
    fontSize: 14,
    color: "#575353",
    fontWeight: "bold",
    width: "100%",
    height: 30,
    paddingLeft: 10,
    // marginLeft: 15,
    marginTop: 5,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingLeft: 0,
    marginTop: 5,
    color: "#fff"
  },
});
