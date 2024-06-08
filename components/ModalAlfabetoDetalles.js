
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  
  import { useEffect, useState, createRef, useRef } from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  import { Card } from "react-native-paper";
  import useAuth from "../Hooks/useAuth";
  import conffeti from "../assets/confeti.json";
  import LottieView from "lottie-react-native";
  
  import * as Speech from 'expo-speech';
  
  
  
  const ModalAlfabetoDetalles = ({ letraSeleccionada, setLetraSeleccionada }) => {
    const { dataAlert, setDataAlert, conffetiShow, setConffetiShow } = useAuth();
  
    const [arregloAbecedario, setArregloAbecedario] = useState([]);
    const [arregloAbecedarioTwo, setArregloAbecedarioTwo] = useState([]);
    const confettiRef = useRef(null);

    useEffect(() => {
        Speech.speak("Presiona las palabras para escuchar como suenan")
        Speech.speak(`Elegiste la letra ${letraSeleccionada.letra}`);
    }, []);
  
  
  
   
    return (
      <>
        <View style={styles.contenido}>

        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setLetraSeleccionada({});
            Speech.stop();
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>

          <View style={styles.detalles}>
          <Text style={{ fontSize: 16, fontWeight: "700"}}>{"Presiona las palabras para escuchar como suenan"}</Text>

            <View >
            <TouchableOpacity  style={{ display: "flex", flexDirection: "row", alignItems: "flex-end"}}
                    onPress={() => Speech.speak(`${letraSeleccionada.letra}`)}>
                      <Text style={styles.text}>{letraSeleccionada.letra}</Text>
                      <Text style={styles.textMinuscula}>{letraSeleccionada.minuscula}</Text>
                    </TouchableOpacity>
                
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 20, }}>
              {
                letraSeleccionada.palabras.map((palabra, index) => (
                  <View key={index}>
                    <TouchableOpacity style={styles.btnText} 
                    onPress={() => Speech.speak(`${letraSeleccionada.letra} de ${palabra}`)}>
                      <Text>
                        {palabra}
                      </Text>
                    </TouchableOpacity>

                  </View>

                ))
              }
            </View>
          

          </View>
        </View>
        <LottieView
          ref={confettiRef}
          source={conffeti}
          autoPlay={false}
          loop={false}
          style={{ ...styles.lottie, zIndex: conffetiShow ? 1000 : -1 }}
          resizeMode="cover"
        />
      </>
    );
  };
  
  export default ModalAlfabetoDetalles;
  
  let { height, width } = Dimensions.get("screen");
  
  const styles = StyleSheet.create({
    lottie: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
    },
    btnClose: {
        position: "absolute",
        top: 5,
        right: 5,
        zIndex: 2,
      },

  
    contenido: {
        position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
    //   flexDirection: "row",
  
      backgroundColor: "rgba(255, 255, 255, .8)",
      width: "100%",
      height: "100%",
    //   height: height < 500 ? height - 150 : width - 150,
      marginTop: 0,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      overflow: "hidden",
      
    },

    detalles: {
    //   backgroundColor: "red",
      width: "100%",
      height: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,


    },
    text: {
        fontSize: 62,
    //   backgroundColor: "red",

    },
    textMinuscula: {
        fontSize: 42,
    //   backgroundColor: "red",


    },
    btnText: {
      backgroundColor: "#8c9eff",
      paddingVertical: 4,
      paddingHorizontal: 20,
      borderRadius: 8,

    }
  });
  