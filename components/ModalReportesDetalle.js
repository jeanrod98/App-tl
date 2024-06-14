import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";



const ModalReportesDetalle = ({
  setMostrarDetalles,
  registro,
  mostrarDetalles,
}) => {

    
    const barData = [
        {value: (5/50 * 10) , intentos: 50, aciertos: 5, label: '1/6/2424', frontColor: '#216E66'},
        {value: (16/40 * 10), intentos: 40, aciertos: 16, label: '2/6/2424', frontColor: '#BF3140'},
        {value: (25/45 * 10), intentos: 45, aciertos: 25, label: '3/6/2424', frontColor: '#31BF8E'},
        {value: (25/32 * 10), intentos: 32, aciertos: 25, label: '4/6/2424', frontColor: '#3133BF'},
        {value: (60/60 * 10), intentos: 60, aciertos: 60, label: '5/6/2424', frontColor: '#F3451A'},
        
      ];

     

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
                <Text style={styles.label}>{registro?.cedula_usu}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Nombres:{" "}
                </Text>
                <Text style={styles.label}>{registro?.nombre_usu}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Correo:{" "}
                </Text>
                <Text style={styles.label}>{registro?.correo_usu}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Teléfono:{" "}
                </Text>
                <Text style={styles.label}>{registro?.telefono_usu}</Text>
              </View>

              <View style={styles.info}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Dirección:{" "}
                </Text>
                <Text style={styles.label}>{registro?.direccion_usu}</Text>
              </View>
            </View>

            {/* DAtos del modulo  */}
            <Text style={styles.txtOption}>Datos del módulo:</Text>

            <View style={styles.infoCli}>
              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de intentos:{" "}
                </Text>
                <Text style={styles.label}>{"20"}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de aciertos:{" "}
                </Text>
                <Text style={styles.label}>{"14.2"}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Promedio de errores:{" "}
                </Text>
                <Text style={styles.label}>{"8.2"}</Text>
              </View>

              <View style={{ ...styles.info, width: "40%" }}>
                <Text style={{ ...styles.label, color: "#7986cb" }}>
                  Tiempo en prueba:{" "}
                </Text>
                <Text style={styles.label}>{"20 minutos"}</Text>
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
                noOfSections={5}
                maxValue={10}
                
                // yAxisLabelTexts={['0', '5', '10',]}
                barBorderRadius={4}
                frontColor="lightgray"
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
                          right:  index === 4 || index === 3 ? 5 : -150,
                          
                          backgroundColor: '#ffcefe',
                          paddingHorizontal: 6,
                          paddingVertical: 4,
                          borderRadius: 4,
                          display: "flex",
                          flexDirection: "row",
                          width: 110,
                          flexWrap: "wrap",
                          columnGap: 10
                          
                        }}>
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "700"}}>{`Intentos`}</Text>
                                <Text style={{ fontSize: 12}}>{item.intentos}</Text>

                            </View>

                            <View>
                            
                            <Text style={{ fontSize: 12, fontWeight: "700"}}>{`Aciertos`}</Text>
                            <Text style={{ fontSize: 12}}>{item.aciertos}</Text>
                            </View>
                            <View>

                            <Text style={{ fontSize: 12, fontWeight: "700"}}>{`Promedio`}</Text>
                            <Text style={{ fontSize: 12}}>{`${item.value.toFixed(2)} / 10`}</Text>
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
