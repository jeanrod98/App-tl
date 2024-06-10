import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Image,
  } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  
  import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
  import { useEffect, useState } from "react";
  import ComponentOnGame from "./NumerosOnGame";
  import useAuth from "../Hooks/useAuth";
  import Alerts from "./Alerts";
  import fondo_number_2 from "../assets/juego_frutas_2.jpg";
  import { Card } from "react-native-paper";
  import AbecedarioOneGame from "./AbecedarioOneGame";
  import ModalAlfabetoDetalles from "./ModalAlfabetoDetalles";
  import ModalTransporteDetalle from "./ModalTransporteDetalle";
  
  import banana from "../assets/banana.jpg";
  import manzana from "../assets/manzana.jpg";
  import uva from "../assets/uva.jpg";
  import fresa from "../assets/fresa.jpg";
  import pera from "../assets/pera.jpg";
  import sandia from "../assets/sandia.jpg";
  import melon from "../assets/melon.jpg";
  import papaya from "../assets/papaya.jpg";
  import durazno from "../assets/durazno.jpg";
  import pinia from "../assets/pinia.jpg";
  import naranja from "../assets/naranja.jpg";
  import mandarina from "../assets/mandarina.jpg";
import ModalFrutasDetalle from "./ModalFrutasDetalle";


  const FrutasAprender = ({ setVerAprender }) => {
    const { dataAlert, setDataAlert, logOut, setOption } = useAuth();
  
    const [mostrarGame, setMostrarGame] = useState(false);
  
    const [ transporte, setTransporte] = useState([
        { color: "yellow", nombre: "BANANA", source: banana, imagenes: "BANANA".split("") },
        { color: "red", nombre: "MANZANA", source: manzana, imagenes: "MANZANA".split("") },
        { color: "purple", nombre: "UVA", source: uva, imagenes: "UVA".split("") },
        { color: "red", nombre: "FRESA", source: fresa, imagenes: "FRESA".split("") },
        { color: "green", nombre: "PERA", source: pera, imagenes: "PERA".split("") },
        { color: "green", nombre: "SANDIA", source: sandia, imagenes: "SANDIA".split("") },
        { color: "orange", nombre: "MELÓN", source: melon, imagenes: "MELÓN".split("") },
        { color: "orange", nombre: "PAPAYA", source: papaya, imagenes: "PAPAYA".split("") },
        { color: "orange", nombre: "DURAZNO", source: durazno, imagenes: "DURAZNO".split("") },
        { color: "yellow", nombre: "PIÑA", source: pinia, imagenes: "PIÑA".split("") },
        { color: "orange", nombre: "NARANJA", source: naranja, imagenes: "NARANJA".split("") },
        { color: "orange", nombre: "MANDARINA", source: mandarina, imagenes: "MANDARINA".split("") },
    ]);
  
    const [ opcionSeleccionada, setOpcionSeleccionada] = useState({});
  
    return (
      <View style={styles.containerOrdenarNumeros}>
        <ImageBackground
          source={mostrarGame ? "" : fondo_number_2}
          resizeMode="cover"
          imageStyle={{ opacity: 0.6 }}
          style={{
            ...styles.container,
            backgroundColor: mostrarGame
              ? "rgba(255, 255, 255, .9)"
              : "rgba(255, 255, 255, 1)",
          }}
        >
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => {
              setVerAprender(false);
            }}
          >
            <AntDesign name="closecircle" size={32} color="red" />
          </TouchableOpacity>
          <View style={{ ...styles.contenido }}>
            <View style={styles.header}>
              <Text style={styles.txtHeader}>
                Escoge una fruta para aprenderla
              </Text>
              {/* <Text style={styles.txtHeader}>00 : 00 : 00</Text> */}
            </View>
  
            <View style={{ ...styles.game }}>
              {transporte.map((transporte, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setOpcionSeleccionada(transporte)}
                >
                  <Card style={styles.card}>
                    {/* <Card.Content> */}
  
                    <Image style={styles.imgCard} source={transporte?.source} />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "#242424",
                        textAlign: "center",
                      }}
                    >
                      {transporte.nombre}
                    </Text>
                    {/* <Text variant="titleLarge">Card title</Text> */}
                    {/* </Card.Content> */}
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ImageBackground>
        {dataAlert.active && <Alerts />}
        {opcionSeleccionada.nombre && (
          <ModalFrutasDetalle
          setOpcionSeleccionada={setOpcionSeleccionada}
            opcionSeleccionada={opcionSeleccionada}
          />
        )}
      </View>
    );
  };
  
  export default FrutasAprender;
  
  let { height, width } = Dimensions.get("screen");
  
  const styles = StyleSheet.create({
    containerOrdenarNumeros: {
      position: "absolute",
      top: -50,
      height: height < 500 ? height - 52 : width - 52,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      zIndex: 12,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  
      // padding: "2%",
      // paddingVertical: "3%",
    },
    card: {
      width: 85,
      height: 85,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "50%",
      backgroundColor: "#8c9eff",
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    btnPlay: {
      // backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    btnClose: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 2,
    },
    contenido: {
      display: "flex",
      gap: 20,
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "60%",
      height: 50,
      backgroundColor: "rgba(255, 255, 255, .9)",
      // backgroundColor: "red",
      borderRadius: 8,
    },
    txtHeader: {
      fontSize: 20,
      // textAlign: "center",
      fontWeight: "700",
    },
    game: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "red",
    },
    imgCard: {
      width: 70,
      height: 70,
      resizeMode: "contain",
    },
  });
  