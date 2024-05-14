import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  import useAuth from "../Hooks/useAuth";
  
  const Colores = () => {
    const { dataAlert, setDataAlert, logOut, setOption, option } = useAuth();
  
    return (
      <View style={styles.containerColores}>
        <View style={styles.header}>
          <View style={styles.opcionesModulo}>
            <Text>Opcion 1</Text>
            <Text>Opcion 2</Text>
            <Text>Opcion 3</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setOption({...option,
                next: false,
              });
            }}
          >
            <AntDesign
              style={styles.btnClose}
              name="closecircle"
              size={28}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contenido}>
          <Text>Colores</Text>
        </View>
      </View>
    );
  };
  
  export default Colores;
  
  let { height, width } = Dimensions.get("screen");
  
  const styles = StyleSheet.create({
    containerColores: {
      position: "absolute",
      top: 0,
      height: height < 500 ? height - 50 : width - 50,
      width: "100%",
      backgroundColor: "#fff",
      zIndex: 12,
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      // backgroundColor: "blue",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      height: 50,
    },
    opcionesModulo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    },
    btnClose: {
      // position: "absolute",
      // top: 20,
      // right: 20,
    },
    contenido: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: height < 500 ? height - 110 : width - 110,
      // backgroundColor: "yellow",
    },
  });
  