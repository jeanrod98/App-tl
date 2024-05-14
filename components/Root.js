import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from "react-native";
import useAuth from "../Hooks/useAuth";
import Loading from "./Loading";
import Menu from "./Menu";
import FooterApp from "./FooterApp";
import { useState } from "react";
import NavBarUser from "./NavBarUser";
import Alerts from "./Alerts";
import Alfabeto from "../screens/Alfabeto";
import Numeros from "../screens/Numeros";
import Transportes from "../screens/Transportes";
import Frutas from "../screens/Frutas";
import Vocales from "../screens/Vocales";
import Colores from "../screens/Colores";
import Animales from "../screens/Animales";
import Figuras from "../screens/Figuras";
import Musica from "../screens/Musica";

const Root = () => {
    const { setAuth, logOut, cargando, dataAlert, option } = useAuth();
    const [dataForm, setDataForm] = useState({
        nombres: "",
        correo: "",
        password: "",
        rptPassword: ""
      });
   
    return ( 
        <View style={styles.contenedorRoot}>
            <NavBarUser/>
            <Menu/>
            <FooterApp ruta={"/menu"} name={"SIGUIENTE"} data={dataForm} />
            { cargando && <Loading/> }
            {dataAlert.active && <Alerts tipe={"question"} />}
            { option?.next && option?.nameOption === "ALFABETO" && <Alfabeto/>}
            { option?.next && option?.nameOption === "NUMEROS" && <Numeros/>}
            { option?.next && option?.nameOption === "TRANSPORTES" && <Transportes/>}
            { option?.next && option?.nameOption === "FRUTAS" && <Frutas/>}
            { option?.next && option?.nameOption === "VOCALES" && <Vocales/>}
            { option?.next && option?.nameOption === "COLORES" && <Colores/>}
            { option?.next && option?.nameOption === "ANIMALES" && <Animales/>}
            { option?.next && option?.nameOption === "FIGURAS" && <Figuras/>}
            { option?.next && option?.nameOption === "MUSICA" && <Musica/>}
            
        </View>
     );
}
 
export default Root;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    contenedorRoot:{
        // display: "flex",
        // flexDirection: "row",
        // gap: 20,
        // height: height < 500 ? (height - 13) : (width - 13),


    },

});