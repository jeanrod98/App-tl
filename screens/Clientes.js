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
  const { sonido, dataAlert, setDataAlert } = useAuth();


  const arr = [
    {
      nombre_usu: "Jean Rodriguez",
      correo_usu: "jcrod@gmail.com",
      cedula_usu: "1314567738",
      telefono_usu: "n/a",
      direccion_usu: "n/a",
      tipo_usu: "cliente"

    },
    {
      nombre_usu: "John Rodriguez",
      correo_usu: "jcrod@gmail.com",
      cedula_usu: "n/a",
      telefono_usu: "n/a",
      direccion_usu: "n/a",
      tipo_usu: "cliente"

    },
    {
      nombre_usu: "Juan Rodriguez",
      correo_usu: "jcrod@gmail.com",
      cedula_usu: "n/a",
      telefono_usu: "n/a",
      direccion_usu: "n/a",
      tipo_usu: "cliente"

    },
    {
      nombre_usu: "Jose Rodriguez",
      correo_usu: "jcrod@gmail.com",
      cedula_usu: "n/a",
      telefono_usu: "n/a",
      direccion_usu: "n/a",
      tipo_usu: "cliente"

    },
    {
      nombre_usu: "Alex Rodriguez",
      correo_usu: "jcrod@gmail.com",
      cedula_usu: "n/a",
      telefono_usu: "n/a",
      direccion_usu: "n/a",
      tipo_usu: "cliente"

    },
  ]

  const [client, setClient] = useState(arr);

  const [nuevoCliente, setNuevoCliente] = useState({
      nombre_usu: "",
      correo_usu: "",
      cedula_usu: "",
      telefono_usu: "",
      direccion_usu: "",
      tipo_usu: "cliente"
    });


  useEffect(() => {
    if (sonido) Speech.speak("Clientes");
  }, []);

  const [registroSelect, setRegistroSelect] = useState("");
  const [modificar, setModificar] = useState(false);
  const filtrar = async () => {
    //! Validar que sea una cedula
    if (registroSelect === '' || registroSelect.length == 0) {
      
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
                  onChangeText={(text) => setNuevoCliente({...nuevoCliente, "cedula_usu" : text})}
                  value={nuevoCliente.cedula_usu}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Nombres:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombres"
                  editable={true}
                  onChangeText={(text) => setNuevoCliente({...nuevoCliente, "nombre_usu" : text})}
                  value={nuevoCliente.nombre_usu}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Correo:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Correo"
                  editable={true}
                  onChangeText={(text) => setNuevoCliente({...nuevoCliente, "correo_usu" : text})}
                  value={nuevoCliente.correo_usu}
                />
              </View>

              <View style={styles.contenedorInputs}>
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  editable={true}
                  onChangeText={(text) => setNuevoCliente({...nuevoCliente, "telefono_usu" : text})}
                  value={nuevoCliente.telefono_usu}
                />
              </View>

              <View style={{ ...styles.contenedorInputs, width: "100%" }}>
                <Text style={styles.label}>Dirección:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Dirección"
                  editable={true}
                  onChangeText={(text) => setNuevoCliente({...nuevoCliente, "direccion_usu" : text})}
                  value={nuevoCliente.direccion_usu}
                />
              </View>
            </View>
            <View style={styles.formBotones}>
            <TouchableOpacity onPress={() => {
              setModificar(false);
              setNuevoCliente({
                nombre_usu: "",
                correo_usu: "",
                cedula_usu: "",
                telefono_usu: "",
                direccion_usu: "",
                tipo_usu: "cliente"
              });
            }} style={{...styles.boton, backgroundColor: "grey"}}>
                <Text style={styles.txtBoton}>Nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton}>
                <Text style={styles.txtBoton}>{modificar ? "Actualizar" : "Guardar"}</Text>
              </TouchableOpacity>
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
                  // value={usuario.cedula_usu}
                />
                {
                  registroSelect.length > 0 &&
                  <TouchableOpacity
                  style={{ position: "absolute", top: 8, right: 70, zIndex: 1 }}
                  onPress={() => {
                    setRegistroSelect("");
                    setClient(arr)
                  }}
                >
                  <AntDesign name="closecircle" size={20} color="red" />
                </TouchableOpacity>
                }
               

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

                {
                  client.length > 0 ?
                  <>
                  {client.map((cli, index) => (
                  <Card key={index} style={styles.cardCli}>
                    <TouchableOpacity
                      onPress={() => {
                        setModificar(true)
                        setNuevoCliente(cli)
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
                        <Text style={{ color: "#fff" }}>{cli.cedula_usu}</Text>
                      </View>

                      <View>
                        <Text style={{ ...styles.label, color: "#fff" }}>
                          Nombres:{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>{cli.nombre_usu}</Text>
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
                        <AntDesign name="profile" size={24} color="#7986cb" />
                      </View>
                    </TouchableOpacity>
                  </Card>
                ))}
                  </>
                  :
                  <View>
                    <Text style={{ color: "red"}}>
                      No hay registros para mostrar
                    </Text>
                    </View>
                }
                
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
});
