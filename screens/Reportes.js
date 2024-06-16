import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import * as Speech from "expo-speech";

import { SelectList } from "react-native-dropdown-select-list";

import img_fondo from "../assets/fondo_reportes.jpg";
import { Card } from "react-native-paper";
import ModalReportesDetalle from "../components/ModalReportesDetalle";

const Reportes = ({ setMostrar }) => {
  const { sonido, clientes } = useAuth();

  const [selected, setSelected] = useState("Alfabeto");

  const [mostrarDetalles, setMostrarDetalles] = useState({
    active: false,
    modulo: ""
});

  const [data, setdata] = useState([
    { key: "1", value: "Regular" },
    { key: "2", value: "Avanzada" },
  ]);



  const [client, setClient] = useState(clientes);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_usu: "",
    correo_usu: "",
    cedula_usu: "",
    telefono_usu: "",
    direccion_usu: "",
    tipo_usu: "cliente",
  });

  useEffect(() => {
    if (sonido) Speech.speak("Reportes");
    
  }, []);

  const [registroSelect, setRegistroSelect] = useState("");

  const filtrar = async () => {
    //! Validar que sea una cedula
    if (registroSelect === "" || registroSelect.length == 0) {
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "Debes ingresar una cédula que esté registrada.",
        active: true,
        tipe: "info",
      });
      return;
    }

    const res = await client.filter((cli) => cli.cedula_usu === registroSelect);
    setClient(res);
  };

  return (
    <>

    <ImageBackground
    source={img_fondo}
    resizeMode="contain"
    imageStyle={{ opacity: 0.1 }}
     style={styles.reportes}>
      <TouchableOpacity
        style={styles.btnClose}
        onPress={() => {
          setMostrar("");
        }}
      >
        <AntDesign name="closecircle" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.txtTittle}>
        <Text style={{ color: "#303F9F", fontSize: 20, fontWeight: "700" }}>
          Reportes
        </Text>
      </View>

      <View style={styles.contenedorCards}>
        {/* contenedor lista de clientes  */}
        <View style={styles.card}>
          <View style={styles.contenedorLista}>
            {/* <Text style={styles.label}>Buscar cliente por cédula:</Text> */}
            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              <View
                style={{
                  ...styles.contenedorInputs,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, width: "82%", paddingRight: 40 }}
                  placeholder="Buscar por cédula"
                  editable={true}
                  onChangeText={(text) => setRegistroSelect(text)}
                  value={registroSelect}
                  // value={usuario.cedula_usu}
                />
                {registroSelect.length > 0 && (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 70,
                      zIndex: 1,
                    }}
                    onPress={() => {
                      setRegistroSelect("");
                      setClient(clientes);
                    }}
                  >
                    <AntDesign name="closecircle" size={20} color="red" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => filtrar()}
                  style={styles.botonSearch}
                >
                  <FontAwesome name="search" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Lista de usuarios clientes  */}
            <ScrollView>
              <View style={styles.lista}>
                {client.length > 0 ? (
                  <>
                    {client.map((cli, index) => (
                      <Card key={index} style={styles.cardCli}>
                        <TouchableOpacity
                          onPress={() => {
                            setNuevoCliente(cli);
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <View>
                            <Text style={{ ...styles.label, color: "#fff" }}>
                              Cédula:{" "}
                            </Text>
                            <Text style={{ color: "#fff" }}>
                              {cli.cedula_cli}
                            </Text>
                          </View>

                          <View>
                            <Text style={{ ...styles.label, color: "#fff" }}>
                              Nombres:{" "}
                            </Text>
                            <Text style={{ color: "#fff" }}>
                              {cli.nombres_cli}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: 40,
                              backgroundColor: "#fff",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 6,
                            }}
                          >
                            <AntDesign
                              name="profile"
                              size={24}
                              color="#7986cb"
                            />
                          </View>
                        </TouchableOpacity>
                      </Card>
                    ))}
                  </>
                ) : (
                  <View>
                    <Text style={{ color: "red" }}>
                      No hay registros para mostrar
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.card2}>
          <View>
            <Text style={styles.txtOption}>Información del cliente</Text>
          </View>
          {nuevoCliente.nombres_cli ? (
            <>
              <View style={styles.infoCli}>
                <View style={styles.info}>
                  <Text style={{...styles.label, color: "#7986cb"}}>Cédula: </Text>
                  <Text style={styles.label}>{nuevoCliente?.cedula_cli}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={{...styles.label, color: "#7986cb"}}>Nombres: </Text>
                  <Text style={styles.label}>{nuevoCliente?.nombres_cli}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={{...styles.label, color: "#7986cb"}}>Correo: </Text>
                  <Text style={styles.label}>{nuevoCliente?.correo_cli}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={{...styles.label, color: "#7986cb"}}>Teléfono: </Text>
                  <Text style={styles.label}>{nuevoCliente?.telefono_cli}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={{...styles.label, color: "#7986cb"}}>Dirección: </Text>
                  <Text style={styles.label}>{nuevoCliente?.direccion_cli}</Text>
                </View>
              </View>

              <View style={styles.botonesModulos}>
                <Text style={{...styles.label, color: "#7986cb"}}>Módulos:</Text>
                <View style={styles.contenedorBotones}>
                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "ALFABETO"
            })} style={{...styles.btnModulo, backgroundColor: "#59A2FF"}}>
                    <Text style={styles.txt}>ALFABETO</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "TRANSPORTES"
            })} style={{...styles.btnModulo, backgroundColor: "#FF897B"}}>
                    <Text style={styles.txt}>TRANSPORTES</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "FRUTAS"
            })} style={{...styles.btnModulo, backgroundColor: "#FFD97B"}}>
                    <Text style={styles.txt}>FRUTAS</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "VOCALES"
            })} style={{...styles.btnModulo, backgroundColor: "#9DFF7B"}}>
                    <Text style={styles.txt}>VOCALES</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "COLORES"
            })} style={{...styles.btnModulo, backgroundColor: "#7B8BFF"}}>
                    <Text style={styles.txt}>COLORES</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "ANIMALES"
            })} style={{...styles.btnModulo, backgroundColor: "#E85C6B"}}>
                    <Text style={styles.txt}>ANIMALES</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "NÚMEROS DEL 1 AL 10"
            })} style={{...styles.btnModulo, backgroundColor: "#CF7BFF"}}>
                    <Text style={styles.txt}>NÚMEROS DEL 1 AL 10</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "FIGURAS GEOMÉTRICAS"
            })} style={{...styles.btnModulo, backgroundColor: "#FF7BB7"}}>
                    <Text style={styles.txt}>FIGURAS GEOMÉTRICAS</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setMostrarDetalles({
                active: true,
                modulo: "MÚSICA"
            })} style={{...styles.btnModulo, backgroundColor: "#86D1AC"}}>
                    <Text style={styles.txt}>MÚSICA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View>
              <Text style={{ color: "red", fontWeight: "700"}}>Seleccione un registro para ver detalles</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
    {
      mostrarDetalles?.active && <ModalReportesDetalle registro={nuevoCliente} mostrarDetalles={mostrarDetalles}  setMostrarDetalles={setMostrarDetalles}/>
    }
    </>

  );
};

export default Reportes;
const styles = StyleSheet.create({
  reportes: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  txtTittle: {
    // backgroundColor: "red",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnClose: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },
  contenedorCards: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 0,
    // backgroundColor: "blue",
    width: "100%",
    height: "87%",
    justifyContent: "space-around",
  },

  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "blue",
    // paddingHorizontal: 20,
    width: "40%",
    height: "100%",
  },

  form: {
    width: "100%",
    // height: "75%",
    padding: 12,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    // borderRadius: 10,

    backgroundColor: "#fff",
    // backgroundColor: "red",
  },
  contenedorInputs: {
    display: "flex",
    gap: 8,
    // marginTop: 10,
    width: "48%",
    // height: 80,
    // backgroundColor: "red",
  },

  card2: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "blue",
    // paddingHorizontal: 20,
    width: "55%",
    height: "100%",
    // backgroundColor: "red",
    paddingHorizontal: 1,
  },
  contenedorLista: {
    display: "flex",
    // backgroundColor: "red",
    height: "100%",
    gap: 10,
  },
  lista: {
    display: "flex",
    gap: 10,
  },
  cardCli: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#7986cb",
  },
  txtOption: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    borderColor: "#000",
    borderWidth: 0.5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#fff",
    width: "100%",
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
  },
  botonSearch: {
    backgroundColor: "#7986cb",
    padding: 6,
    borderRadius: 4,
    width: 50,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#7986cb",
    padding: 6,
    borderRadius: 4,
    width: 100,
  },
  formBotones: {
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",

    justifyContent: "center",
  },

  txtBoton: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
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
  botonesModulos: {
    display: "flex",
    // flexDirection: "row",
    width: "100%",
    gap: 10,

  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    
    gap: 10,
  },
  btnModulo: {
    // width: "30%",
    height: 35,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
    
  },
  txt: {
    fontWeight: "700",
    fontSize: 12
  },
});
