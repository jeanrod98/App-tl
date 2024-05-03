import { View } from "react-native";
import Welcome from "../screens/Welcome";
import MenuLogin from "./MenuLogin";
import { useState } from "react";

const Main = () => {

  const [inicio, setInicio] = useState(true);

    return ( 
        <View>

            {
                inicio ?
                <Welcome/>
                :
                <MenuLogin/>

            }

        </View>
     );
}
 
export default Main;