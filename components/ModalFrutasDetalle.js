

import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Image,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  
  import { useEffect, useState, createRef, useRef } from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  import { Card } from "react-native-paper";
  import useAuth from "../Hooks/useAuth";
  import conffeti from "../assets/confeti.json";
  import LottieView from "lottie-react-native";
  
  import * as Speech from 'expo-speech';
  
  
  
  const ModalFrutasDetalle = ({ opcionSeleccionada, setOpcionSeleccionada }) => {
    const { dataAlert, setDataAlert, conffetiShow, setConffetiShow } = useAuth();
  
    const [arregloAbecedario, setArregloAbecedario] = useState([]);
    const [arregloAbecedarioTwo, setArregloAbecedarioTwo] = useState([]);
    const confettiRef = useRef(null);

    useEffect(() => {
        Speech.speak(`Elegiste la fruta ${opcionSeleccionada.nombre}`);
        Speech.speak("Presiona la fruta para escuchar su nombre")

    }, []);
  
  
  
   
    return (
      <>
        <View style={styles.contenido}>

        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setOpcionSeleccionada({});
            Speech.stop();
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>

          <View style={styles.detalles}>
          <Text style={{ fontSize: 16, fontWeight: "700"}}>{"Presiona la fruta para escuchar su nombre"}</Text>

            <View >
            <TouchableOpacity  style={{ display: "flex", flexDirection: "row", alignItems: "flex-end"}}
                    onPress={() => Speech.speak(`${opcionSeleccionada.nombre}`)}>

        
                    <Image style={{...styles.imgCard, width: 100, height: 100,}} source={opcionSeleccionada.source} />
                      
                    </TouchableOpacity>
                
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 20, backgroundColor: "transparent" }}>
              {
                opcionSeleccionada.imagenes.map((obj, index) => (
                    <TouchableOpacity key={index} style={styles.btnText} 
                    onPress={() => Speech.speak(`${obj}`)}>
                      
       
        <Card  style={{...styles.card, backgroundColor: opcionSeleccionada.color, }} >
                    
                      
                    {/* <Image style={styles.imgCard} source={obj} /> */}
                    <Text style={{ textAlign: "center", fontWeight: "700"}}>
                        {obj}
                      </Text>

                  </Card>
                  </TouchableOpacity>

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
  
  export default ModalFrutasDetalle;
  
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
        backgroundColor: "rgba(255, 255, 255, 1)",

        
        borderRadius: 8,

    },
    imgCard: {
        width: 60,
        height: 60,
        resizeMode: "contain",
      },

      card: {
        width: 60,
        height: 60,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // borderRadius: "50%",
        // backgroundColor: "#8c9eff",
        // backgroundColor: "rgba(255, 255, 255, 1)",
      },
      
  });
  