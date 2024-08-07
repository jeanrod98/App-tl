import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import useAuth from "../Hooks/useAuth";
import imagen_menu from "../assets/imagen_menu.png";
import alfabeto from "../assets/alfabeto.png";
import TRANSPORTES from "../assets/TRANSPORTES.png";
import FRUTAS from "../assets/FRUTAS.png";
import VOCALES from "../assets/VOCALES.png";
import COLORES from "../assets/COLORES.png";
import ANIMALES from "../assets/ANIMALES.png";
import numeros from "../assets/numeros.png";
import figuras from "../assets/figuras.png";
import musica from "../assets/musica.png";
import Alerts from "./Alerts";
import { useEffect, useState } from "react";

import * as Speech from 'expo-speech';
import { Gesture, GestureDetector  } from "react-native-gesture-handler";


const Menu = () => {
  const { setAuth, logOut, cargando, auth, dataAlert, option, setOption, sonido } = useAuth();

  const [ optionMenu, setOptionMenu] = useState("");
 
  useEffect(() => {
    Speech.stop()
  },[])

  const seleccionarOpcion = async (option) => {
    if(sonido) {
      await Speech.stop();
      Speech.speak(`Has seleccionado ${option}, manten precionado para ingresar`)
    }
    
    setOption({
      activo: true,
      nameOption: option,
    });

  };

  const accederOpcion = (option) => {
    
    if(option === "ALFABETO"){
      setOption({
        activo: true,
        nameOption: "ALFABETO",
        next: true
      });
    } else if (option === "TRANSPORTES") {
      setOption({
        activo: true,
        nameOption: "TRANSPORTES",
        next: true
      });
    } else if (option === "FRUTAS") {
      setOption({
        activo: true,
        nameOption: "FRUTAS",
        next: true
      });
    } else if (option === "VOCALES") {
      setOption({
        activo: true,
        nameOption: "VOCALES",
        next: true
      });
    } else if (option === "COLORES") {
      setOption({
        activo: true,
        nameOption: "COLORES",
        next: true
      });
    } else if (option === "ANIMALES") {
      setOption({
        activo: true,
        nameOption: "ANIMALES",
        next: true
      });
    } else if (option === "NÚMEROS") {
      setOption({
        activo: true,
        nameOption: "NUMEROS",
        next: true
      });
    } else if (option === "FIGURAS") {
      setOption({
        activo: true,
        nameOption: "FIGURAS",
        next: true
      });
    } else if (option === "MUSICA") {
      setOption({
        activo: true,
        nameOption: "MUSICA",
        next: true
      });
      
    }
  };


 

  return (
    <View style={styles.contenedorMenu}>
      <View style={styles.menu}>
        <View style={styles.tittleMenu}>
          <Text style={styles.txtMenu}>MENÚ</Text>
        </View>
        <Image source={imagen_menu} />
      </View>
      <View style={styles.form}>
        <ScrollView>
          <View style={styles.contenedorCards}>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "ALFABETO" ? "red" : "#fff", borderWidth: 3,  }}>
            
              <TouchableOpacity onPress={() => seleccionarOpcion("ALFABETO")}
                onLongPress={() => accederOpcion("ALFABETO")}>
                <Image source={alfabeto} style={styles.img} />
                <Text style={styles.txt}>ALFABETO</Text>
              </TouchableOpacity>
              
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "TRANSPORTES" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("TRANSPORTES")}
                onLongPress={() => accederOpcion("TRANSPORTES")}>
                <Image source={TRANSPORTES} style={styles.img} />
                <Text style={styles.txt}>TRANSPORTES</Text>
              </TouchableOpacity>
            </View>

            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "FRUTAS" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("FRUTAS")}
                onLongPress={() => accederOpcion("FRUTAS")}>
                <Image source={FRUTAS} style={styles.img} />
                <Text style={styles.txt}>FRUTAS</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "VOCALES" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("VOCALES")}
                onLongPress={() => accederOpcion("VOCALES")}>
                <Image source={VOCALES} style={styles.img} />
                <Text style={styles.txt}>VOCALES</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "COLORES" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("COLORES")}
                onLongPress={() => accederOpcion("COLORES")}>
                <Image source={COLORES} style={styles.img} />
                <Text style={styles.txt}>COLORES</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "ANIMALES" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("ANIMALES")}
                onLongPress={() => accederOpcion("ANIMALES")}>
                <Image source={ANIMALES} style={styles.img} />
                <Text style={styles.txt}>ANIMALES</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "NÚMEROS" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("NÚMEROS")}
                onLongPress={() => accederOpcion("NÚMEROS")}>
                <Image source={numeros} style={styles.img} />
                <Text style={styles.txt}>NÚMEROS DEL 1 AL 10</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "FIGURAS" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPress={() => seleccionarOpcion("FIGURAS")}
                onLongPress={() => accederOpcion("FIGURAS")}>
                <Image source={figuras} style={styles.img} />
                <Text style={styles.txt}>FIGURAS GEOMÉTRICAS</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.card, borderColor: option.activo === true && option.nameOption === "MUSICA" ? "red" : "#fff", borderWidth: 3,  }}>
              <TouchableOpacity onPressIn={() => seleccionarOpcion("MUSICA")}
                onLongPress={() => accederOpcion("MUSICA")}>
                <Image source={musica} style={styles.img} />
                <Text style={styles.txt}>MÚSICA</Text>
              </TouchableOpacity>
            </View>
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
    height: height < 500 ? height - 132 : width - 132,
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
    paddingTop: 0,
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
  form: {
    // height: width - 590,
    width: "80%",
    // display: "flex",
    // justifyContent: "center",
    // backgroundColor: "grey",
    height: "100%",
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
    color: "#fff",
  },
  contenedorCards: {
    width: "97%",
    // height: "50%",
    // backgroundColor: "#303F9F",
    overflow: "hidden",

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
    // alignItems: "space-between",


    // elevation: 5
  },
  img: {
    width: "100%",
    height: "80%",
  },
  txt: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    // backgroundColor: "red",
    height: "20%",
    

  },
});
