import { useEffect, useState, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [usuarioModificado, setUsaurioModificado] = useState(auth);
  const [token, setToken] = useState("");
  const [cargando, setCargando] = useState(false);

  const [inicio, setInicio] = useState("true");
  const [sonido, setSonido] = useState(true);

  const [dataAlert, setDataAlert] = useState({
    icon: "",
    tittle: "",
    detalle: "",
    active: false,
    tipe: "",
  });

  const [option, setOption] = useState({
    activo: false,
    nameOption: "",
    next: false
  });


  const [ conffetiShow, setConffetiShow ] = useState(false);

  useEffect(() => {
    obtenerLogin();
    // console.log(auth);
  }, []);

  const obtenerLogin = async () => {
    try {
      // await AsyncStorage.setItem('userToken', userToken);
      let userToken = "";
      userToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      // peticion del perfil
      const { data } = await clienteAxios.get("/perfil", config);
      console.log(data);

      // console.log(userToken);
      setAuth(data);
      setUsaurioModificado(data)
      setToken(userToken);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    // setCargando(true)

    // ! resetear estados
    setDataAlert({
      icon: "",
      tittle: "",
      detalle: "",
      active: false,
      tipe: "",
    });

    setOption({
      activo: false,
      nameOption: "",
    });

    try {
      await AsyncStorage.removeItem("token");

      // await AsyncStorage.removeItem("welcome");
      setAuth({});
      setUsaurioModificado({})
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (correo, password) => {
    setCargando(true);
    try {
      console.log("cargando...");

      const { data } = await clienteAxios.post("/login", {
        correo,
        password,
      });
      if (data) {
        // console.log(data);
        // console.log("mostrar menu");

        setAuth(data);
        setUsaurioModificado(data)
        setToken(data.token_session);
        await AsyncStorage.setItem("token", data.token_session);
      }
    } catch (e) {
      // console.log(e);
      console.log("Error de login");
      // console.log(e.response.data.msg);
      // ! Alert]
      setDataAlert({
        icon: "error",
        tittle: "ERROR DE AUTENTICACIÓN",
        detalle: e.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
    setTimeout(() => {
      setCargando(false);
    }, 3000);
  };

  const registrarUsuario = async (datos) => {
    try {
      // console.log("cargando...");

      const { data } = await clienteAxios.post("/registro-usuario", datos);
      console.log(data);

      if (data) {
        // * Alert
        setDataAlert({
          icon: "success",
          tittle: "Registro de usuario",
          detalle: "El usuario se registró con éxito!",
          active: true,
          tipe: "info",
        });

        return true;
      }
    } catch (e) {
      // console.log(e);
      // ! Alert
      setDataAlert({
        icon: "error",
        tittle: "ERROR DE AUTENTICACIÓN",
        detalle: e.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
  };

  const actualizarPerfil = async () => {
    try {

     
      const { data } = await clienteAxios.put(`/profile-update/${auth._id}`, usuarioModificado);
      console.log(data);


      if (data) {
        // * Alert
        setAuth(data)
        setUsaurioModificado(data)
        setDataAlert({
          icon: "success",
          tittle: "Actualización de perfil",
          detalle: "Los datos del perfil se actualizaron con éxito!",
          active: true,
          tipe: "info",
        });

        return true;
      }
    } catch (error) {
      // ! Alert
      setDataAlert({
        icon: "error",
        tittle: "ERROR DE ACTUALIZACIÓN",
        detalle: e.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
  }

  const cambiarPassword = async () => {

    setCargando(true);

    
   
    try {

     
      const { data } = await clienteAxios.put(`/profile-update-password/${auth._id}`, {
        password_usu: dataAlert?.passwords?.passActual,
        nueva_password_usu: dataAlert?.passwords?.pass1
      });
      console.log(data);

    

      if (data) {
        // * Alert
       
        

        logOut();

        setTimeout(() => {
          setCargando(false);
        }, 3000);

        return true;
      }
    } catch (error) {
      // ! Alert
      setDataAlert({
        icon: "error",
        tittle: "ERROR DE ACTUALIZACIÓN",
        detalle: error.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        usuarioModificado, 
        setUsaurioModificado,
        token,
        setToken,
        dataAlert,
        setDataAlert,
        cargando,
        setCargando,
        inicio,
        setInicio,
        option,
        setOption,
        conffetiShow, 
        setConffetiShow,
        registrarUsuario,
        actualizarPerfil,
        cambiarPassword,
        login,
        logOut,
        sonido, 
        setSonido
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
