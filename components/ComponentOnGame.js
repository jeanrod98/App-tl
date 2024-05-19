import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';

import { Card } from "react-native-paper";

const ComponentOnGame = ({ setMostrarGame }) => {
  const [arregloNumeros, setArregloNumeros] = useState([]);
  const [resultNumeros, setResultNumeros] = useState([]);

  useEffect(() => {
    let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // barajea el arreglo

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setArregloNumeros(shuffle(arregloNumeros));
  }, []);


  const ubicarNumero = (values) => {
    // console.log(values);
    if (resultNumeros.length <= 9) {
      setResultNumeros([...resultNumeros, values])
    }else{
      console.log("Ya se completaron los 10 numeros");
    }
    
  }

  const validarResultados = () => {
    console.log("validando...");
  }
  return (
    <View style={styles.contenido}>
      <Text>Selecciona un número</Text>
      <View style={styles.contenidoCard}>
        {arregloNumeros.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{value}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Números Ordenados</Text>

      <View style={styles.contenidoCard}>
        {
          resultNumeros.length > 0 ?
          <>
          {resultNumeros.map((obj, index) => (
          <TouchableOpacity key={index} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{obj}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
          </>
          :
          <>
          {arregloNumeros.map((obj, index) => (
          <TouchableOpacity key={index} >
            <Card style={styles.card}>
              <Card.Content>
                <Text>{""}</Text>
                {/* <Text variant="titleLarge">Card title</Text> */}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
          </>
        }
        
      </View>

      <View style={styles.controles}>

      <TouchableOpacity
                style={styles.btnReload}
                onPress={() => {
                  setResultNumeros([]);
                }}
              >
                {/* <FontAwesome name="stop" size={24} color="#5c6bc0" /> */}
                <Ionicons name="reload-circle" size={24} color="#5c6bc0" />
                <Text>Reiniciar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnValidar}
                onPress={() => validarResultados()}
              >
                <AntDesign name="checkcircle" size={24} color="green" />
                <Text>Revisar</Text>
              </TouchableOpacity>
      </View>

      
              
    </View>
  );
};

export default ComponentOnGame;

let { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  contenido: {
    display: "flex",
    // backgroundColor: "yellow",
    width: "100%",
    // height: height < 500 ? height - 150 : width - 150,
    marginTop: 0,
    alignItems: "center",
    gap: 20
  },
  btnPlay: {},
  contenidoCard: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    
  },
  btnReload:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnValidar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  card: {
    width: 50,
    height: 50,
    borderRadius: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  controles: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: 10,

  },
});
