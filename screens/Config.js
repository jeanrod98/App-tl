import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Cuenta from "./Cuenta";
import Clientes from "./Clientes";
import Reportes from "./Reportes";
import AcercaDe from "./AcercaDe";
import useAuth from "../Hooks/useAuth";
import * as Speech from 'expo-speech';


const Config = ({ setMostrarSetting }) => {

    const [ mostrar, setMostrar ] = useState("");
    const [ user, setUser ] = useState(true);
    const { sonido } = useAuth();
    
    useEffect(() => {
      if (sonido) Speech.speak("CONFIGURACIÓN");
    }, []);

  return (
    <>
    <View style={styles.config}>
      <View style={styles.contenedorSetting}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setMostrarSetting(false);
          }}
        >
          <AntDesign name="closecircle" size={22} color="red" />
        </TouchableOpacity>
        <View style={styles.txtTittle}>
          <Text style={{ color: "#303F9F", fontSize: 20, fontWeight: "700" }}>
            CONFIGURACIÓN
          </Text>
        </View>

        <View style={styles.opcionesContenedor}>
        
            <TouchableOpacity style={styles.opciones} onPress={() => setMostrar("cuenta")}>
              <FontAwesome name="user" size={18} color="#303F9F" />
              <Text style={styles.txtOption}>Cuenta</Text>
            </TouchableOpacity>
      

         {
            user && 
            <>
            <TouchableOpacity style={styles.opciones} onPress={() => setMostrar("clientes")}>
              <FontAwesome name="users" size={18} color="#303F9F" />
              <Text style={styles.txtOption}>Cliente</Text>
            </TouchableOpacity>
       

      
            <TouchableOpacity style={styles.opciones} onPress={() => setMostrar("reportes")}>
              <Entypo name="pie-chart" size={18} color="#303F9F" />
              <Text style={styles.txtOption}>Reportes</Text>
            </TouchableOpacity>
            </>
         }
            
       

          
            <TouchableOpacity style={styles.opciones} onPress={() => setMostrar("acerdaDe")}>
              <AntDesign name="questioncircle" size={18} color="#303F9F" />
              <Text style={styles.txtOption}>Acerca de</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </View>
    {
        mostrar === "cuenta" && <Cuenta setMostrar={setMostrar}/>
    }
    {
        mostrar === "clientes" && <Clientes setMostrar={setMostrar}/>
    }
    {
        mostrar === "reportes" && <Reportes setMostrar={setMostrar}/>
    }
    {
        mostrar === "acerdaDe" && <AcercaDe setMostrar={setMostrar}/>
    }
    </>
  );
};

export default Config;

const styles = StyleSheet.create({
  config: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  txtTittle: {
    // backgroundColor: "red",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorSetting: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 250,
    height: "100%",
  },
  btnClose: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },
  opcionesContenedor: {
    display: "flex",
    gap: 20,
    marginTop: 20,
    // backgroundColor: "red",
  },

  opciones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "red",
    paddingHorizontal: 20,
  },
  txtOption: {
    fontSize: 16,
    fontWeight: "700",
  },
});
