import { useEffect, useState, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [usuarioModificado, setUsaurioModificado] = useState(auth);
  const [token, setToken] = useState("");
  const [clientes, setClientes] = useState([]);

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
    next: false,
  });

  const [conffetiShow, setConffetiShow] = useState(false);

  useEffect(() => {
    obtenerLogin();
    // console.log(auth);
    // consultarClientes();
  }, []);

  const consultarClientes = async (id) => {
    // console.log(id);
    try {
      const { data } = await clienteAxios.get(`/clientes/${id}`);

      // console.log(data);
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerLogin = async () => {
    setCargando(true);
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
      setUsaurioModificado(data);
      setToken(userToken);

      if (data.tipo === "Terapeuta") consultarClientes(data._id);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setCargando(false);
    }, 3000);
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
      setUsaurioModificado({});
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
        setUsaurioModificado(data);
        setToken(data.token_session);
        await AsyncStorage.setItem("token", data.token_session);
      }

      if (data.tipo === "Terapeuta") consultarClientes(data._id);
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

  const registrarCliente = async (cli) => {
    cli.usuario_id = auth._id;
    cli.usuario = auth.nombres;

    try {
      // console.log("cargando...");

      const { data } = await clienteAxios.post("/registro-cliente", cli);
      console.log(data);

      if (data) {
        setClientes([data, ...clientes]);

        // * Alert
        setDataAlert({
          icon: "success",
          tittle: "Registro de cliente",
          detalle: "El cliente se registró con éxito!",
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
      const { data } = await clienteAxios.put(
        `/profile-update/${auth._id}`,
        usuarioModificado
      );
      // console.log(data);

      if (data) {
        // * Alert
        setAuth(data);
        setUsaurioModificado(data);
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
  };

  const actualizarCliente = async (cli) => {
    cli.usuario_id = auth._id;
    cli.usuario = auth.nombres;

    // console.log(cli);
    // return

    try {
      const { data } = await clienteAxios.put(`/client-update/${cli._id}`, cli);
      // console.log(data);

      if (data) {
        // * Alert

        const filtrarClientes = await clientes.filter(
          (cliente) => cliente._id !== data._id
        );
        filtrarClientes.push(data);
        // console.log(filtrarClientes);

        if (dataAlert.perfil_cli_modificado) setAuth(data);

        setClientes(filtrarClientes);
        setDataAlert({
          icon: "success",
          tittle: "Actualización del cliente",
          detalle: "Los datos del cliente se actualizaron con éxito!",
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
        detalle: error.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
  };

  const cambiarPassword = async () => {
    setCargando(true);

    try {
      if (auth.tipo == "Cliente") {
        const { data } = await clienteAxios.put(
          `/profile-update-password-cliente/${auth._id}`,
          {
            password: dataAlert?.passwords?.passActual,
            nueva_password: dataAlert?.passwords?.pass1,
          }
        );
        // console.log(data);

        if (data) {
          // * Alert

          logOut();

          

          return true;
        }
      } else {
        const { data } = await clienteAxios.put(
          `/profile-update-password/${auth._id}`,
          {
            password: dataAlert?.passwords?.passActual,
            nueva_password: dataAlert?.passwords?.pass1,
          }
        );
        // console.log(data);

        if (data) {
          // * Alert

          logOut();

         

          return true;
        }
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
    setTimeout(() => {
      setCargando(false);
    }, 3000);
  };

  const deleteCliente = async (id) => {
    try {
      const { data } = await clienteAxios.delete(`/clientes/${id}`);
      // console.log(data);
      const filtrarClientes = await clientes.filter(
        (cliente) => cliente._id !== id
      );

      if (data.deletedCount == 1) {
        setClientes(filtrarClientes);

        setDataAlert({
          icon: "success",
          tittle: "Eliminación de cliente",
          detalle: "Los datos del cliente fueron eliminados con éxito!",
          active: true,
          tipe: "info",
        });
      }
    } catch (error) {
      // ! Alert
      setDataAlert({
        icon: "error",
        tittle: "ERROR DE ELIMINACIÓN",
        detalle: error.response.data.msg,
        active: true,
        tipe: "info",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        usuarioModificado,
        setUsaurioModificado,
        setClientes,
        clientes,
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
        actualizarCliente,
        registrarCliente,
        consultarClientes,
        deleteCliente,
        login,
        logOut,
        sonido,
        setSonido,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
