import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HeaderApp from "./HeaderApp";
import { useState } from "react";
import FormularioLogin from "./FormularioLogin";
import FormularioRegistro from "./FormularioRegistro";
import FooterApp from "./FooterApp";

import { AntDesign } from '@expo/vector-icons';

const MenuLogin = () => {

    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [nameOpcion, setNameOpcion] = useState("INGRESAR");
  return (
    <View style={styles.container}>
      <HeaderApp text={"BIENVENIDO A MAVE"} />

      <View style={styles.contenido}>

        <View style={styles.menu}>
            <TouchableOpacity
            style={{...styles.boton, backgroundColor: mostrarLogin ? "#303F9F" : "#C5CAE9"}}
            onPress={(e) => {
                setMostrarRegistro(false)
                setMostrarLogin(true)
                setNameOpcion("INGRESAR")
            }}
            >
            <Text style={styles.text}>{"INICIAR SESIÓN"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{...styles.boton, backgroundColor: mostrarRegistro ? "#303F9F" : "#C5CAE9"}}
            onPress={(e) => {
                setMostrarLogin(false)
                setMostrarRegistro(true)
                setNameOpcion("REGISTRAR")

            }}
            >
            <Text style={styles.text}>{"REGISTRARSE"}</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.form}>

            {
                mostrarLogin && <FormularioLogin/>
            }

            {
                mostrarRegistro && <FormularioRegistro/>
            }
            
        </View>
        {/* <View style={styles.footer}>
            <AntDesign name="questioncircle" size={24} color="#fff" />
        </View> */}
        
        
      </View>
      <FooterApp ruta={nameOpcion} name={nameOpcion} />
      
    </View>
  );
};

export default MenuLogin;

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    // height: width - 590,
    // overflow: "scroll"
  },

  contenido: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "space-between",
    width: "100%",
    height: width - 132,
  },

  menu:{
    // backgroundColor: "red",
    height: width - 132,
    width: "20%",
    paddingTop: 20,
    display: "flex",
    gap: 10,
    // alignItems: "flex-start"

  },
  form:{
    height: width-590,
    width: "80%",
    // display: "flex",
    // justifyContent: "center",
    // backgroundColor: "blue",

    

  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  boton: {
    
    width: "100%",
    height: 28,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer:{
    width: "50%",
    height: 200,
    backgroundColor: "blue",
    zIndex: 10


  },
});
