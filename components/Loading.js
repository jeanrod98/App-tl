import { ActivityIndicator, View, StyleSheet, Dimensions, ImageBackground } from "react-native";

import imagen_2 from "../assets/registro.jpg";

const Loading = () => {
    return ( 
        <ImageBackground source={imagen_2} imageStyle={{opacity:0.5}} resizeMode="center" style={styles.containerLoading}>
            <ActivityIndicator size={100} color="#3f51b5" />
        </ImageBackground>
     );
}
 
export default Loading;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    containerLoading:{
        position: "absolute",
        top: 0,
        height: height < 500 ? (height - 50) : (width - 50),
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        zIndex: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


    },
});