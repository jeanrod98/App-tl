import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  
  import imagen_3 from "../assets/imagen_3_login.png";
const FormularioLogin = () => {
    return ( 
        <View style={styles.container}>
            <Image source={imagen_3} style={styles.img} />

      <View style={styles.form}>
        <View
          style={{
            width: "100%",
            height: 200,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#303F9F",
            paddingVertical: 10,

            
          }}
        >
          {/* <Image style={{ width: 100, height: 65, marginTop: 35 }} source={logo} /> */}
          <View style={styles.formulario}>
            <Text style={styles.titulo}>INICIAR SESIÓN</Text>

           
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su correo"
              />
            </View>
            <View style={styles.contenedorInputs}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ingrese su contraseña"
              />
            </View>
           
          </View>
        </View>
      </View>
    </View>
     );
}
 
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
  
    form: {
      width: "40%",
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
      width: "90%",
      // overflow: "scroll",
      // margin: "auto",
      // marginLeft: 50,
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
      height: 25,
      paddingLeft: 10,
      // marginLeft: 15,
      marginTop: 12,
      borderRadius: 0,
      backgroundColor: "#fff",
      borderRadius: 4,
    },
    label: {
      fontWeight: "bold",
      fontSize: 12,
      alignSelf: "flex-start",
      paddingLeft: 0,
      marginTop: 10,
      color: "#fff"
    },
  });
  