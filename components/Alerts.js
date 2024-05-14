import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import useAuth from "../Hooks/useAuth";

const Alerts = ({ tipe }) => {
  const { dataAlert, setDataAlert, logOut, setOption } = useAuth();

  return (
    <View style={styles.containerAlert}>
      <View style={styles.card}>
        {dataAlert.icon === "success" ? (
          <AntDesign name="checkcircle" size={32} color="green" />
        ) : (
          <MaterialIcons name="error" size={32} color="orange" />
        )}
        <Text style={styles.tittle}>{dataAlert.tittle}</Text>
        <Text style={styles.description}>{dataAlert.detalle}</Text>

        <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setDataAlert({
                icon: "",
                tittle: "",
                detalle: "",
                active: false,
                tipe: ""
              });

              setOption({
                activo: false,
                nameOption: "",
                next: false
              });
            }}
          >
            <Text style={styles.textBtn}>
              {dataAlert.tipe === "question" ? "Cancelar" : "Aceptar"}
            </Text>
          </TouchableOpacity>

          {dataAlert.tipe === "question" && (
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#FC5151" }}
              onPress={logOut}
            >
              <Text style={{ ...styles.textBtn, color: "#fff" }}>Salir</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Alerts;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  containerAlert: {
    position: "absolute",
    top: 0,
    height: height < 500 ? height - 50 : width - 50,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "50%",
    // height: 160,
    backgroundColor: "#fff",
    // top: 50,
    padding: 20,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
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
  button: {
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
