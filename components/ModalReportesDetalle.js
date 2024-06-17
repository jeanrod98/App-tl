import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../Hooks/useAuth";

const ModalReportesDetalle = ({
  setMostrarDetalles,
  registro,
  mostrarDetalles,
}) => {
  const { auth } = useAuth();

  useEffect(() => {
    obtenerDatos();
  }, []);

  const [barData, setBarData] = useState([]);
  const [tiempos, setTiempos] = useState("");
  const [aciertos, setAciertos] = useState("");
  const [intentos, setIntentos] = useState("");
  const [errores, setErrores] = useState("n/a");

  const obtenerDatos = async () => {
    // console.log(registro?._id);
    try {
      const { data } = await clienteAxios.get(`/avance/${registro?._id}`);
      // console.log(data[0]);
      let arrayUltimosDetalles = [];
      let tiemposArr = [];
      let erroresArr = [];
      let intentosArr = [];
      let aciertosArr = [];

      for (let index = 0; index < data.length; index++) {
        const arregloPrincipal = data[index];
        // console.log(arregloPrincipal);
        if (arregloPrincipal.nombreModulo_av == mostrarDetalles.modulo) {
          // extraer el ultimo registro del array
          // console.log(arregloPrincipal);
          const ultimoDetalle =
            arregloPrincipal.detalles[data[index]?.detalles.length - 1];
          ultimoDetalle.label = arregloPrincipal.fecha_av;
          ultimoDetalle.value = parseFloat(ultimoDetalle.promedio_pro_av);
          arrayUltimosDetalles.push(ultimoDetalle);

          //ciclo para extraer los tiempos, errores, aciertos
          for (
            let index = 0;
            index < arregloPrincipal.detalles.length;
            index++
          ) {
            const arregloTiempos = arregloPrincipal.detalles[index];
            // extraer los tiempos
            tiemposArr.push(arregloTiempos?.tiempo_modulo_av);
            erroresArr.push(arregloTiempos?.errores_pro_av);
            intentosArr.push(arregloTiempos?.intentos_pro_av);
            aciertosArr.push(arregloTiempos?.aciertos_pro_av);
          }
        }
      }

      //Enviar los datos a la grafica
      setBarData(arrayUltimosDetalles);

      //* calcular promedios generales
     

      // console.log(tiempos);
      // console.log(sumaTiempo / tiempos.length);
      const sumaTiempo = tiemposArr.reduce(
        (anterior, actual) => anterior + actual,
        0
      );
      // se agrega el promedio general del tiempo
      setTiempos(`${sumaTiempo / tiemposArr.length} seg.`);

      const sumaIntentos = intentosArr.reduce(
        (anterior, actual) => anterior + actual,
        0
      );
      // se agrega el promedio general de los intentos
      setIntentos(`${sumaIntentos / intentosArr.length}`);

      // Valida si hay errores agregados
      if (erroresArr.length > 0) {
        const sumaErrores = erroresArr.reduce(
          (anterior, actual) => anterior + actual,
          0
        );
        // agrega promedio de errores al estado
        setErrores(`${sumaErrores / erroresArr.length}`);
      console.log(sumaErrores);

      }

      // Sacar el promedio de aciertos en base a la suma de todos los intentos
      const sumaAciertos = aciertosArr.reduce(
        (anterior, actual) => anterior + actual,
        0
      );
      const aciertos = (sumaAciertos/sumaIntentos) * 10;
      setAciertos(`${aciertos.toFixed(2)} / 10`)

      // setDatosModulos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.contenido}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setMostrarDetalles({
              active: false,
              modulo: "",
            });
          }}
        >
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>

        <View style={styles.txtTittle}>
          <Text style={{ color: "#303F9F", fontSize: 20, fontWeight: "700" }}>
            {`MÓDULO ${mostrarDetalles?.modulo}`}
          </Text>
        </View>

        <View style={styles.detalles}>
          <View style={styles.detalleRegistro}>
            <Text style={styles.txtOption}>Datos del cliente:</Text>
            <View style={styles.infoCli}>
              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Cédula:{" "}
                </Text>
                <Text style={styles.label}>{registro?.cedula_cli}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Nombres:{" "}
                </Text>
                <Text style={styles.label}>{registro?.nombres_cli}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Correo:{" "}
                </Text>
                <Text style={styles.label}>{registro?.correo_cli}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Teléfono:{" "}
                </Text>
                <Text style={styles.label}>{registro?.telefono_cli}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Dirección:{" "}
                </Text>
                <Text style={styles.label}>{registro?.direccion_cli}</Text>
              </View>
            </View>

            {/* DAtos del modulo  */}
            <Text style={styles.txtOption}>Datos del módulo:</Text>

            <View style={styles.infoCli}>
              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de intentos:{" "}
                </Text>
                <Text style={styles.label}>{intentos}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de módulo:{" "}
                </Text>
                <Text style={styles.label}>{aciertos}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de errores:{" "}
                </Text>
                <Text style={styles.label}>{errores}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Tiempo promedio:{" "}
                </Text>
                <Text style={styles.label}>{tiempos}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detalleRegistro}>
            <Text style={styles.txtOption}>Gráfica del módulo:</Text>
            <Text style={{}}>Promedio</Text>
            <View style={{ ...styles.info, width: "100%" }}>
              <BarChart
                barWidth={35}
                height={150}
                width={320}
                // backgroundColor={"#000"}
                noOfSections={5}
                maxValue={10}
                // yAxisLabelTexts={['0', '5', '10',]}
                barBorderRadius={4}
                frontColor="#4A7BFF"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                referenceLine1Position={0}
                labelWidth={45}
                rotateLabel
                initialSpacing={10}
                endSpacing={10}
                // textColor={6}
                renderTooltip={(item, index) => {
                  return (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        right: index === 4 || index === 3 ? 5 : -150,

                        backgroundColor: "#ffcefe",
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "row",
                        width: 110,
                        flexWrap: "wrap",
                        columnGap: 10,
                      }}
                    >
                      <View>
                        <Text
                          style={{ fontSize: 12, fontWeight: "700" }}
                        >{`Intentos`}</Text>
                        <Text style={{ fontSize: 12 }}>
                          {item.intentos_pro_av}
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{ fontSize: 12, fontWeight: "700" }}
                        >{`Aciertos`}</Text>
                        <Text style={{ fontSize: 12 }}>
                          {item.aciertos_pro_av}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{ fontSize: 12, fontWeight: "700" }}
                        >{`Promedio`}</Text>
                        <Text style={{ fontSize: 12 }}>{`${item.value.toFixed(
                          2
                        )} / 10`}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ModalReportesDetalle;

const styles = StyleSheet.create({
  contenido: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    //   flexDirection: "row",

    backgroundColor: "rgba(255, 255, 255, .9)",
    width: "100%",
    height: "100%",
    //   height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    // alignItems: "center",
    // justifyContent: "center",
    gap: 20,
    overflow: "hidden",
  },
  btnClose: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },
  txtTittle: {
    // backgroundColor: "red",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txtOption: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    margin: 10,
  },

  detalles: {
    // backgroundColor: "blue",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    gap: 20,
  },

  detalleRegistro: {
    // backgroundColor: "red",
    width: "50%",
    height: "100%",
  },
  infoCli: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  info: {
    display: "flex",
    // flexDirection: "row",
    width: "30%",
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
  },
});
