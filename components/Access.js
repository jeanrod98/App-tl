import { StyleSheet, Text, View } from "react-native";


import Main from "./Main";
import useAuth from "../Hooks/useAuth";
import Root from "./Root";
import Loading from "./Loading";

const Access = () => {


  const { auth, setAuth, cargando } = useAuth();

//   if(cargando == true ) return <Loading/>

    return ( 
        <>
        {!auth?._id ? (
          <Main />
        ) : (
          <Root />
        )}
        </>
     );
}
 
export default Access;