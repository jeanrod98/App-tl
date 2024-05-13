import { useEffect, useState, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState("");
  const [cargando, setCargando] = useState(false);

  const [inicio, setInicio] = useState("true");

  const [dataAlert, setDataAlert] = useState({
    tipe: "error",
    tittle: "ERRO DE AUTENTICACION",
    detalle: "LA CONTRASENIA ESTA EQUIVOCADA",
    active: false,
  });

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
      setToken(userToken);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    // setCargando(true)

    // setCargando(true)

    try {
      
      
        
        await AsyncStorage.removeItem("token");
      
        // await AsyncStorage.removeItem("welcome");
        setAuth({})
    } catch (error) {
        console.log(error);
    }

    setTimeout( () => {

    setCargando(false)
  }, 2000);
    
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
        setToken(data.token_session);
        await AsyncStorage.setItem("token", data.token_session);
      }
    } catch (e) {
      // console.log(e);
      console.log("Error de login");
      // console.log(e.response.data.msg);
      // ! Alert]
      setDataAlert({
        tipe: "error",
        tittle: "ERROR DE AUTENTICACIÓN",
        detalle: e.response.data.msg,
        active: true,
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
      // console.log(data);

      if (data) {
        // * Alert
        setDataAlert({
          tipe: "success",
          tittle: "ERROR DE AUTENTICACIÓN",
          detalle: e.response.data.msg,
          active: true,
        });
      }
    } catch (e) {
      // console.log(e);
      // ! Alert
      setDataAlert({
        tipe: "error",
        tittle: "ERROR DE AUTENTICACIÓN",
        detalle: e.response.data.msg,
        active: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        dataAlert,
        setDataAlert,
        cargando,
        setCargando,
        inicio, 
        setInicio,
        registrarUsuario,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
