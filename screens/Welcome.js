import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import HeaderApp from "../components/HeaderApp";
import FooterApp from "../components/FooterApp";

import imagen_1 from "../assets/imagen_1_inicio.png";
import useAuth from "../Hooks/useAuth";

const Welcome = ({ setInicio }) => {
  const { auth } = useAuth();
// console.log(a);
  return (
    <>
      {!auth._id && (
        <View style={styles.container}>
          <HeaderApp text={"BIENVENIDO A MAVE"} />

          <View style={styles.contenido}>
            <View style={styles.texto}>
              <Text style={styles.titulo}>Aprende mientras te diviertes!</Text>
              <Text style={styles.msg}>
                MAVE es una aplicación pensada para los más pequeños de la casa,
                donde podrán aprender de una manera segura, interactiva y
                divertida.
              </Text>
            </View>
            <Image source={imagen_1} style={styles.img} />
          </View>

          <FooterApp
            ruta={"/siguiente"}
            name={"SIGUIENTE"}
            setInicio={setInicio}
          />
        </View>
      )}
    </>
  );
};

export default Welcome;

let { height, width } = Dimensions.get("screen");
// console.log(height);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contenido: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    height: height < 500 ? height - 132 : width - 132,
  },
  texto: {
    width: "30%",
  },

  img: {
    width: 220,
    height: 200,
  },
  titulo: {
    fontSize: 25,
    marginTop: 10,
  },
  msg: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },
});
