import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import useAuth from "../Hooks/useAuth";

const Alerts = () => {

    const { dataAlert, setDataAlert } = useAuth();

    return ( 
        <View style={styles.containerAlert}>
            <View style={styles.card}>
            {
                    dataAlert.type === "success" ?  
                    <AntDesign name="checkcircle" size={32} color="green" />
                     :
                    <MaterialIcons name="error" size={32} color="red" />

                }
                <Text style={styles.tittle}>{dataAlert.tittle}</Text>
                <Text style={styles.description}>{dataAlert.detalle}</Text>
                <TouchableOpacity style={styles.button}
                onPress={() => setDataAlert({
                    tittle: "",
                    detalle: "",
                    active: false,
                })}>
                    <Text style={styles.textBtn}>Aceptar</Text>
                </TouchableOpacity>

            </View>
        </View>
     );
}
 
export default Alerts;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    containerAlert:{
        position: "absolute",
        top: 0,
        height: height < 500 ? (height - 50) : (width - 50),
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .5)",
        zIndex: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


    },

    card:{
        width: "50%",
        // height: 160,
        backgroundColor: "#fff",
        // top: 50,
        padding: 20,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        borderRadius: 10,
        
        

    },
    tittle: {
        fontWeight: "700",
        color: "#303f9f",
        fontSize: 16,


    }, 
    description: {
        color: "#000",
        fontStyle: "italic",
        fontWeight: "700",

    }, 
    button:{
        padding: 8,
        backgroundColor: "#c5cae9",
        width: 100,
        borderRadius: 4,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textBtn: {
        fontWeight: "700",

    },
});