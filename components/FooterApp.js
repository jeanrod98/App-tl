import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { AntDesign } from '@expo/vector-icons';

const FooterApp = ({ ruta, name, setInicio}) => {

    const handleNex = () => {

        if(ruta === "/siguiente") {
            setInicio(false);
        }else if (ruta === "REGISTRAR"){
            console.log("Registrando")

        }else{
            console.log("Inicio de sesion")
        }
    }

    const mostrarAyuda = () => {

        alert("Mostrar Ayuda")
    }
    return ( 

        <View style={styles.container}>
            <AntDesign name="questioncircle" size={24} color="#fff" onPress={mostrarAyuda}/>

            <TouchableOpacity style={styles.boton} onPress={handleNex}>
                <Text style={styles.text}>
                    {name}
                </Text>
            </TouchableOpacity>

        </View>
     );
}
 
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
    text:{
        color: "#303F9F",
        fontWeight: "700",
        fontSize: 16,
    },
    boton:{
        backgroundColor: "#C5CAE9",
        width: 100,
        height: 28,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
  });