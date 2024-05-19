import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import OrdenarNumeros from "../components/OrdenarNumeros";
  
  const Numeros = () => {
    const { dataAlert, setDataAlert, logOut, setOption, option } = useAuth();
    
    const [ ordenarNumeros, setOrdenarNumeros ] = useState(false);
    const [ escogerNumeros, setEscogerNumeros ] = useState(false);
    const [ encontrarNumeros, setEncontrarNumeros ] = useState(false);

    return (
      <View style={styles.containerNumeros}>
        <View style={styles.header}>
          <View style={styles.opcionesModulo}>
          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setEscogerNumeros(false);
              setEncontrarNumeros(false);
              setOrdenarNumeros(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Ordena los números</Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setOrdenarNumeros(false);
              setEncontrarNumeros(false);
              setEscogerNumeros(true);

            }}
          >
            <Text style={styles.txtSubmenu}>Escoge los pares</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonSubMenu}
            onPress={() => {
              setOrdenarNumeros(false);
              setEscogerNumeros(false);
              setEncontrarNumeros(true);
            }}
          >
            <Text style={styles.txtSubmenu}>Encuentra los números</Text>
          </TouchableOpacity>
            
            
          </View>
          <TouchableOpacity
            onPress={() => {
              setOption({...option,
                next: false,
              });
            }}
          >
            <AntDesign
              style={styles.btnClose}
              name="closecircle"
              size={28}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contenido}>
          {
            ordenarNumeros && <OrdenarNumeros setOrdenarNumeros={setOrdenarNumeros}/>
          }
          {
            escogerNumeros && <Text>Escoge los pares</Text>
          }
          {
            encontrarNumeros && <Text>Encuentra los números</Text>
          }
          {
            !ordenarNumeros && !escogerNumeros && !encontrarNumeros && <Text style={styles.txtAviso}>Elija una opción para iniciar</Text>
          }
          
        </View>
      </View>
    );
  };
  
  export default Numeros;
  
  let { height, width } = Dimensions.get("screen");
  
  const styles = StyleSheet.create({
    containerNumeros: {
      position: "absolute",
      top: 0,
      height: height < 500 ? height - 50 : width - 50,
      width: "100%",
      backgroundColor: "#fff",
      zIndex: 12,
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      // backgroundColor: "blue",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      height: 50,
    },
    opcionesModulo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    btnClose: {
      // position: "absolute",
      // top: 20,
      // right: 20,
    },
    contenido: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: height < 500 ? height - 110 : width - 110,
      // backgroundColor: "yellow",
    },
    botonSubMenu: {
      backgroundColor: "#7986cb",
      padding: 10,
      borderRadius: 4,

    },
    txtSubmenu: {
      color: "#fff",
    },
    txtAviso: {
      color: "red",
      fontSize: 16,
      
    },
  });
  