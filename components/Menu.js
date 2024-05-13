import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import useAuth from "../Hooks/useAuth";
import imagen_menu from "../assets/imagen_menu.png"
import alfabeto from "../assets/alfabeto.png"
import TRANSPORTES from "../assets/TRANSPORTES.png"
import FRUTAS from "../assets/FRUTAS.png"
import VOCALES from "../assets/VOCALES.png"
import COLORES from "../assets/COLORES.png"
import ANIMALES from "../assets/ANIMALES.png"
import numeros from "../assets/numeros.png"
import figuras from "../assets/figuras.png"
import musica from "../assets/musica.png"


const Menu = () => {
  const { setAuth, logOut, cargando, auth } = useAuth();

  return (
    <View style={styles.contenedorMenu}>
      <View style={styles.menu}>
        <View style={styles.tittleMenu}>
            <Text style={styles.txtMenu}>MENÚ</Text>
        </View>
        <Image source={imagen_menu}/>
      </View>
      <View style={styles.form}>
        
        <ScrollView >
            <View style={styles.contenedorCards}>

            <View style={styles.card}>
                <Image source={alfabeto} style={styles.img}/>
                <Text style={styles.txt}>ALFABETO</Text>
            </View>
            <View style={styles.card}>
            <Image source={TRANSPORTES} style={styles.img}/>
                <Text style={styles.txt}>TRANSPORTES</Text></View>
            <View style={styles.card}>
            <Image source={FRUTAS} style={styles.img}/>
                <Text style={styles.txt}>FRUTAS</Text></View>
            <View style={styles.card}>
                <Image source={VOCALES} style={styles.img}/>
                <Text style={styles.txt}>VOCALES</Text></View>
            <View style={styles.card}>
                <Image source={COLORES} style={styles.img}/>
                <Text style={styles.txt}>COLORES</Text></View>
            <View style={styles.card}>
                <Image source={ANIMALES} style={styles.img}/>
                <Text style={styles.txt}>ANIMALES</Text></View>
            <View style={styles.card}>
                <Image source={numeros} style={styles.img}/>
                <Text style={styles.txt}>NÚMEROS DEL 1 AL 10</Text></View>
            <View style={styles.card}>
                <Image source={figuras} style={styles.img}/>
                <Text style={styles.txt}>FIGURAS GEOMETR.</Text></View>
            <View style={styles.card}>
                <Image source={musica} style={styles.img}/>
                <Text style={styles.txt}>ANIMALES</Text></View>
            </View>
            


        </ScrollView>
        
      </View>
      
    </View>
  );
};

export default Menu;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  contenedorMenu: {
    // position: "absolute",
    // top: 0,
    height: height < 500 ? height - 92 : width - 92,
    width: "100%",
    // backgroundColor: "rgba(0, 0, 0, .5)",
    // zIndex: 12,

    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  menu: {
    // backgroundColor: "red",
    height: height < 500 ? height - 132 : width - 132,
    width: "20%",
    paddingTop: 10,
    display: "flex",
    gap: 20,
    alignItems: "center"
  },
  form: {
    // height: width - 590,
    width: "80%",
    // display: "flex",
    // justifyContent: "center",
    // backgroundColor: "grey",
    height: "90%",
    paddingVertical: 8,

  },

  tittleMenu: {
    width: "100%",
    height: 28,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303F9F",
  },
  txtMenu: {

    color: "#fff"
  },
  contenedorCards: {
    width: "97%",
    // height: "50%",
    // backgroundColor: "#303F9F",
    overflow: 'hidden',

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    // alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "30%",
    height: 100,
    backgroundColor: "#536dfe",
    display: "flex",
    justifyContent: "space-between",

  },
  img: {
    width: "100%",
    height: "80%",
  },
  txt: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  }
});
