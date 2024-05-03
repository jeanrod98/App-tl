import { View, StyleSheet, Text } from "react-native";

const HeaderApp = ({ text }) => {
    return ( 
        <View style={styles.container}>
            <Text style={styles.nameApp}>{text}</Text>
        </View>
     );
}
 
export default HeaderApp;

const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: "#5C6BC0",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      width: "100%"
      
    },
    nameApp: {
        fontSize: 18,
        color: "#E8EAF6",
    }
  });