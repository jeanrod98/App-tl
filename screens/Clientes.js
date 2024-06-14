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

import img_fondo from "../assets/fondo_clientes.jpg";
import { Card } from "react-native-paper";

const Clientes = ({ setMostrar }) => {
  const {
    sonido,
    dataAlert,
    setDataAlert,
    registrarCliente,
    actualizarCliente,
    clientes,
  } = useAuth();

  // Llenar este estado con registros de la bd
  const [client, setClient] = useState([]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombres: "",
    correo: "",
    cedula: "",
    telefono: "",
    direccion: "",
    tipo: "Cliente",
  });

  useEffect(() => {
    if (sonido) Speech.speak("Clientes");
    setClient(clientes);
    // console.log("Actualizado");
  }, [clientes]);

  const registrarNuevoCliente = async () => {
    // !Validaciones
    if (
      nuevoCliente.cedula === "" ||
      nuevoCliente.nombres === "" ||
      nuevoCliente.correo === "" ||
      nuevoCliente.telefono === "" ||
      nuevoCliente.direccion === ""
    ) {
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "Los campos son obligatorios.",
        active: true,
        tipe: "validation",
      });

      return;
    }

    const expresionCorreo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    // validar el formato de correo
    if (!expresionCorreo.test(nuevoCliente.correo)) {
      setDataAlert({
        icon: "error",
        tittle: "Validación",
        detalle: "El formato del correo no es el correcto!",
        active: true,
        tipe: "validation",
      });

      return;
    }

    if (modificar) {
      // console.log("Modificando");
      setDataAlert({
        icon: "error",
        tipe: "actualizar-cliente",
        tittle: "Actualizar el cliente?",
        detalle: "¿Estás seguro de actualizar la información del cliente?",
        active: true,
        cli: nuevoCliente,
      });

      // console.log(nuevoCliente);
    } else {
      // console.log("Registrando");
      setDataAlert({
        icon: "error",
        tipe: "crear-cliente",
        tittle: "Registro de cliente",
        detalle: "¿Estás seguro de registrar un nuevo cliente?",
        active: true,
        cli: nuevoCliente,
      });

      // console.log(nuevoCliente);
    }
  };

  const [registroSelect, setRegistroSelect] = useState("");
  const [modificar, setModificar] = useState(false);

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

    const res = await clientes.filter(
      (cli) => cli.cedula_cli === registroSelect
    );
    setClient(res);
  };

  const eliminarCliente = () => {

    setDataAlert({
      icon: "error",
      tipe: "eliminar-cliente",
      tittle: "Eliminar cliente",
      detalle: "¿Estás seguro de eliminar este cliente?",
      active: true,
      cli_id: nuevoCliente._id,
    });

  };

  return (
    <ImageBackground
      source={img_fondo}
      resizeMode="contain"
      imageStyle={{ opacity: 0.2 }}
      style={styles.clientes}
    >
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
          Clientes
        </Text>
      </View>

      <View style={styles.contenedorClientes}>
        <View style={styles.card}>
          <Card
            style={{
              width: "90%",
              height: "98%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text style={styles.txtOption}>Formulario de Registro</Text>
            <View style={styles.form}>
              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Cédula:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cédula"
                  editable={true}
                  onChangeText={(text) =>
                    setNuevoCliente({ ...nuevoCliente, cedula: text })
                  }
                  value={nuevoCliente.cedula}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Nombres:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombres"
                  editable={true}
                  onChangeText={(text) =>
                    setNuevoCliente({ ...nuevoCliente, nombres: text })
                  }
                  value={nuevoCliente.nombres}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Correo:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Correo"
                  editable={true}
                  onChangeText={(text) =>
                    setNuevoCliente({ ...nuevoCliente, correo: text })
                  }
                  value={nuevoCliente.correo}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  editable={true}
                  onChangeText={(text) =>
                    setNuevoCliente({ ...nuevoCliente, telefono: text })
                  }
                  value={nuevoCliente.telefono}
                />
              </View>

              <View style={{ ...styles.contenedorInputs, width: "100%" }}>
                <Text style={styles.label}>Dirección:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Dirección"
                  editable={true}
                  onChangeText={(text) =>
                    setNuevoCliente({ ...nuevoCliente, direccion: text })
                  }
                  value={nuevoCliente.direccion}
                />
              </View>
            </View>
            <View style={styles.formBotones}>
              <TouchableOpacity
                onPress={() => {
                  setModificar(false);
                  setNuevoCliente({
                    nombres: "",
                    correo: "",
                    cedula: "",
                    telefono: "",
                    direccion: "",
                    tipo: "Cliente",
                  });
                }}
                style={{ ...styles.boton, backgroundColor: "grey" }}
              >
                <Text style={styles.txtBoton}>Nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.boton}
                onPress={() => registrarNuevoCliente()}
              >
                <Text style={styles.txtBoton}>
                  {modificar ? "Actualizar" : "Guardar"}
                </Text>
              </TouchableOpacity>

              {modificar && (
                <TouchableOpacity
                  style={{ ...styles.boton, backgroundColor: "#FF504A" }}
                  onPress={() => eliminarCliente()}
                >
                  <Text style={styles.txtBoton}>Eliminar</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        </View>

        {/* contenedor lista de clientes  */}
        <View style={styles.card2}>
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
                  // value={usuario.cedula}
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
                            setModificar(true);
                            setNuevoCliente({
                              nombres: cli.nombres_cli,
                              correo: cli.correo_cli,
                              cedula: cli.cedula_cli,
                              telefono: cli.telefono_cli,
                              direccion: cli.direccion_cli,
                              tipo: cli.tipo_cli,
                              _id: cli._id,
                            });
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
      </View>
    </ImageBackground>
  );
};

export default Clientes;
const styles = StyleSheet.create({
  clientes: {
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
  contenedorClientes: {
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
    width: "55%",
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
    width: "40%",
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
    fontSize: 16,
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
    gap: 15,
    width: "100%",

    justifyContent: "center",
  },

  txtBoton: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
  },
});
