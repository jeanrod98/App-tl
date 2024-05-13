import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from "react-native";
import useAuth from "../Hooks/useAuth";
import Loading from "./Loading";
import Menu from "./Menu";
import FooterApp from "./FooterApp";
import { useState } from "react";

const Root = () => {
    const { setAuth, logOut, cargando } = useAuth();
    const [dataForm, setDataForm] = useState({
        nombres: "",
        correo: "",
        password: "",
        rptPassword: ""
      });
   
    return ( 
        <View style={styles.contenedorRoot}>
            <Menu/>
            <FooterApp ruta={"/menu"} name={"SIGUIENTE"} data={dataForm} />
            { cargando && <Loading/> }
            
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