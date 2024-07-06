import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ImageBackground
} from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

import img_fondo from "../assets/fondo_setting.jpg"

import { SelectList } from "react-native-dropdown-select-list";

import * as Speech from "expo-speech";
import ModalCambioPassword from "../components/ModalCambioPassword";

const Cuenta = ({ setMostrar }) => {
  const { sonido, auth, setDataAlert, usuarioModificado, setUsaurioModificado } = useAuth();

  

  useEffect(() => {
    if (sonido) {
      Speech.stop()
      Speech.speak("Cuenta");
    }
  }, []);

  const narrarAccion = async ( text ) => {
    await Speech.stop();
    Speech.speak(`${text}, mantén presionado para seleccionar esta opción.`)
  }

  
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);
  const [selected, setSelected] = useState(auth?.tipo);
  // console.log(auth.tipo);

  const [editar, setEditar] = useState(false);
  const [data, setdata] = useState([
    { key: "1", value: "Regular" },
    { key: "2", value: "Terapeuta" },
  ]);

  const actualizarInformacion = () => {
    // console.log(usuarioModificado);
    // Validar que el usuario quiera actualizar su informacion

    if (auth.tipo === "Cliente") {
      setDataAlert({
        icon: "error",
        tipe: "actualizar-cliente",
        tittle: "Actualizar el cliente?",
        detalle: "¿Estás seguro de actualizar la información del cliente?",
        active: true,
        cli: usuarioModificado,
        perfil_cli_modificado: true
      });
    }else{
      setDataAlert({
        icon: "error",
        tipe: "actualizar",
        tittle: "Actualizar la información",
        detalle: "¿Estás seguro de actualizar la información de esta cuenta?",
        active: true,
      });
    }

    
  }

// console.log(auth);

  return (
    <>
    <ImageBackground
    source={img_fondo}
    resizeMode="contain"
    imageStyle={{ opacity: 0.2 }} style={styles.cuenta}>
      <TouchableOpacity
        style={styles.btnClose}
        onLongPress={() => {
          Speech.stop();
          setMostrar("");
        }}
        onPress={() => narrarAccion("Cerrar Ventana")}
      >
        <AntDesign name="closecircle" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.txtTittle}>
        <Text style={{ color: "#303F9F", fontSize: 20, fontWeight: "700" }}>
          CUENTA
        </Text>
      </View>

      <View style={styles.formCuenta}>
        <View style={styles.formTittle}>
          <Text style={styles.txtBoton}> Información de la cuenta</Text>
        </View>

        <View style={styles.formContenedor}>
          <View style={styles.form}>
            {/* <ScrollView> */}

            <View style={styles.card}>
              <Text style={styles.label}>Tipo de cuenta:</Text>
              {editar && auth?.tipo !== "Cliente"  ? (
                <SelectList
                  setSelected={(val) =>{ 
                    // console.log(selected);
                    setSelected(val)
                    setUsaurioModificado({...usuarioModificado, "tipo" : val})
                  }}
                  data={data}
                  save="value"
                  search={false}
                  defaultOption={{key: auth?.tipo, value: auth?.tipo }}
                  // maxHeight={40}
                  boxStyles={{
                    borderRadius: 0,
                    height: 36,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff"
                  }}
                  dropdownStyles={{ padding: 0, backgroundColor: "#fff" }}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="Tipo de cuenta"
                  value={auth?.tipo}
                  editable={false}
                  
                />
              )}

              <Text style={styles.label}>Nombre:</Text>

              <TextInput
                style={styles.input}
                placeholder="Nombre"
                editable={editar}
                value={usuarioModificado?.nombres}
                onChangeText={(text) => setUsaurioModificado({...usuarioModificado, "nombres" : text})}
              />
              <Text style={styles.label}>Correo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                editable={editar}
                value={usuarioModificado?.correo}
                onChangeText={(text) => setUsaurioModificado({...usuarioModificado, "correo" : text})}


              />
            </View>

            {selected === "Terapeuta" || auth.tipo === "Cliente" ? (
              <View style={styles.card}>
                <Text style={styles.label}>Cédula:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cédula"
                  editable={editar}
                  value={usuarioModificado?.cedula}
                onChangeText={(text) => setUsaurioModificado({...usuarioModificado, "cedula" : text})}


                />
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  editable={editar}
                  value={usuarioModificado?.telefono}
                onChangeText={(text) => setUsaurioModificado({...usuarioModificado, "telefono" : text})}


                />
                <Text style={styles.label}>Dirección:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Dirección"
                  editable={editar}
                  value={usuarioModificado?.direccion}
                onChangeText={(text) => setUsaurioModificado({...usuarioModificado, "direccion" : text})}


                />
              </View>
            )
          : null }
            {/* </ScrollView> */}
          </View>
          <View style={{...styles.formBotones, justifyContent: editar ? "space-between" : "flex-end", }}>
            {editar ? (
              <>
              <View >
                <TouchableOpacity style={{...styles.boton, width: 160}} onPress={() => setMostrarCambioPassword(true)}>
                    <Text style={{...styles.txtBoton, color: "#fff",}}>Cambiar Contraseña</Text>
                </TouchableOpacity>
              </View>
                
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>

                <TouchableOpacity
                  style={{ ...styles.boton, backgroundColor: "grey" }}
                  onPress={() => {
                    setEditar(false)
                    setSelected(auth?.tipo)
                  }}
                >
                  <Text style={{...styles.txtBoton, color: "#fff",}}>Salir</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.boton} onPress={() => actualizarInformacion()}>
                  <Text style={{...styles.txtBoton, color: "#fff",}}>Guardar</Text>
                </TouchableOpacity>
              </View>

              </>
            ) : (
              <TouchableOpacity
                style={styles.boton}
                onPress={() => {
                  setEditar(true);
                  // console.log(selected);
                }}
              >
                <Text style={{...styles.txtBoton, color: "#fff",}}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
    {
      mostrarCambioPassword && <ModalCambioPassword setMostrarCambioPassword={setMostrarCambioPassword}  />
    }
    </>


  );
};

export default Cuenta;
const styles = StyleSheet.create({
  cuenta: {
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
  formTittle: {
    display: "flex",
  },

  formCuenta: {
    display: "flex",
    gap: 0,
    marginTop: 0,
    // backgroundColor: "red",
    height: "87%",
  },

  formContenedor: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "blue",
    paddingHorizontal: 20,
    height: "95%",
  },
  form: {
    // backgroundColor: "green",
    width: "100%",
    height: "70%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  card: {
    width: "40%",
    // backgroundColor: "red",
    display: "flex",
    gap: 4,
  },
  formBotones: {
    // backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",


    
  },
  input: {
    borderColor: "#000",
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff"
  },
  label: {
    fontWeight: "700",
  },
  boton: {
    backgroundColor: "#7986cb",
    padding: 6,
    borderRadius: 4,
    width: 100,
  },
  txtBoton: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    

  },
});
