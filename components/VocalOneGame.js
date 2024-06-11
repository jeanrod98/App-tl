

  import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Image
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  
  import { useEffect, useState, createRef, useRef } from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  import { Card } from "react-native-paper";
  import useAuth from "../Hooks/useAuth";
  import Alerts from "./Alerts";
  import conffeti from "../assets/confeti.json";
  import LottieView from "lottie-react-native";
  
  import img_avion from "../assets/img_avion.png";
  import img_arania from "../assets/img_arania.png";
  import img_arbol from "../assets/img_arbol.png";

  import img_elefante from "../assets/img_elefante.png";
  import img_estrella from "../assets/img_estrella.png";
  import img_escoba from "../assets/img_escoba.png";

  import img_iguana from "../assets/img_iguana.png";
  import img_isla from "../assets/img_isla.png";
  import img_iman from "../assets/img_iman.png";

  import img_ojo from "../assets/img_ojo.png";
  import img_oso from "../assets/img_oso.png";
  import img_oreja from "../assets/img_oreja.png";

  import img_uva from "../assets/img_uva.png";
  import img_unia from "../assets/img_unia.png";
  import img_uno from "../assets/img_uno.png";
  

  import * as Speech from 'expo-speech';



  const VocalOneGame = ({ dinamica }) => {
    const { dataAlert, setDataAlert, conffetiShow, setConffetiShow, sonido } = useAuth();
  
    const [arregloNumeros, setArregloNumeros] = useState([]);
    const [resultNumeros, setResultNumeros] = useState([]);
    const [imgCard, setImgCard] = useState({});
    const [objetos, setObjetos] = useState([]);
    const confettiRef = useRef(null);
  
    useEffect(() => {
     
      generarObjetosAleatorio();
    }, []);
  
    const generarObjetosAleatorio = async () => {
      if (sonido) {
        Speech.speak(dinamica);

      }

        let arregloImagenes = [
            { nombre: "A", sources: [{img: img_avion, name: "Avión"}, {img: img_arania, name: "Araña"}, {img: img_arbol, name: "Árbol"}] },
            { nombre: "E", sources: [{img: img_elefante, name: "Elefante"}, {img: img_estrella, name: "Estrella"}, {img: img_escoba, name: "Escoba"}] },
            { nombre: "I", sources: [{img: img_iguana, name: "Iguana"}, {img: img_isla, name: "Isla"}, {img: img_iman, name: "Imán"}] },
            { nombre: "O", sources: [{img: img_ojo, name: "Ojo"}, {img: img_oso, name: "Oso"}, {img: img_oreja, name: "Oreja"}] },
            { nombre: "U", sources: [{img: img_uva, name: "Uva"}, {img: img_unia, name: "Uña"}, {img: img_uno, name: "Uno"}] },
            
          ];

      
  
      const objeto_principal = await extraerElemento(arregloImagenes);
      const source_principal = await extraerElemento(objeto_principal.sources)
     
          setImgCard({key: objeto_principal.nombre, source: source_principal})

    //   console.log({key: objeto_principal.nombre, source: source_principal});
    //   console.log(objeto_principal);
    //   console.log(source_principal);

    
  
      const arregloLimpio = await arregloImagenes.filter(arr => arr.nombre !== objeto_principal.nombre);
      // console.log(arregloLimpio);
      const objeto_secundario = await extraerElemento(arregloLimpio);
      const source_secundario = await extraerElemento(objeto_secundario.sources)
  
      const arrFinal = [{source: source_secundario, key: objeto_secundario.nombre}, {source: source_principal, key: objeto_principal.nombre}]
      setObjetos(shuffle(arrFinal))
      // console.log(objetos);
  
      if (sonido) Speech.speak(`¿Con qué vocal se escribe ${source_principal?.name}?`);

    };
  
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const extraerElemento = (arreglo) => {
     return arreglo[
          Math.floor(Math.random() * arreglo.length)
        ];
    }
  
    const [ vocalSeleccionada, setVocalSeleccionada ] = useState({});

  const seleccionarCard = (objeto) => {
    setVocalSeleccionada(objeto);
    // console.log(objeto);
    if (sonido) Speech.speak(objeto.key);

  }
  
    const [ botones, setBotones ] = useState(false);
    const validarCard = () => {
    //   console.log(objeto);
    //   console.log(imgCard);
      setBotones(true);
  
      
      // !validar que existan los 10 numeros
      if (vocalSeleccionada.key !== imgCard.key) {
  
          setDataAlert({
            icon: "sad",
            tittle: "Esa no era la vocal correcta",
            detalle: "Esa vocal no es la correcta para esta imagen, inténtalo con la otra opción.",
            active: true,
            tipe: "validation",
          });

          // Speech.speak("Esa no era la vocal correcta.");
          if (sonido) {Speech.speak("Esa vocal no es la correcta para esta imagen, inténtalo con la otra opción.");}

          // cambiar figuras
        //   generarObjetosAleatorio();
          setBotones(false);
  
          return;
        }else{
          confettiRef.current?.play(0);
  
         
  
          setTimeout(() => {
            generarObjetosAleatorio();
  
              setBotones(false);
              setVocalSeleccionada({});
              
          }, 3000);
        }
  
  
    }
  
    
  
    return (
      <>
        <View style={styles.contenido}>
          <Text
            style={{ fontWeight: "700" }}
          >{`¿Con qué vocal se escribe ${imgCard?.source?.name}?`}</Text>
          <View style={styles.contenidoCard}>
            <Card
              style={{
                ...styles.card,
                width: 80,
                height: 80,
              }}
            >
              
                {/* <Text>{imgCard?.key}</Text> */}
                <Image style={styles.imgCard} source={imgCard?.source?.img}/>

                {/* <Text variant="titleLarge">Card title</Text> */}
             
            </Card>
            {/* {arregloNumeros.map((value, index) => (
            <TouchableOpacity key={index} onPress={() => ubicarNumero(value)} >
              
            </TouchableOpacity>
          ))} */}
          </View>
          {/* <Text style={{ fontWeight: "700" }}>Números Ordenados</Text> */}
  
          <View style={styles.contenidoCard}>
            <Text style={{ position: "absolute", top: 14, right: 60, zIndex: 1, fontSize: 12}}>O</Text>
  
            {objetos.length > 0 ? (
              <>
                {objetos.map((obj, index) => (
                  <TouchableOpacity key={index} onPress={() => seleccionarCard(obj) }
                  disabled={botones}>
                    <Card style={{...styles.card,
                      borderColor: vocalSeleccionada.key === obj.key ? "red" : "#000",
                      borderWidth: vocalSeleccionada.key === obj.key ? 1 : 0,
                    }}>
                      {/* <Card.Content> */}
                            <Text>{obj?.key}</Text>
                        
                      {/* </Card.Content> */}
                    </Card>
                      
  
                  </TouchableOpacity>
                ))}
              </>
            ) : null}
            
  
            {/* <Card style={styles.card}>
              <Card.Content>
                
                <Image style={styles.imgCard} source={colorCard?.source}/>
              </Card.Content>
            </Card>
            <Text variant="titleLarge">O</Text>
  
            <Card style={styles.card}>
              <Card.Content>
                <Text>{""}</Text>
              </Card.Content>
            </Card> */}
          </View>
  
          <View style={styles.controles}>
            <TouchableOpacity
              style={styles.btnReload}
              onPress={() => {
                generarObjetosAleatorio();
                setVocalSeleccionada({});
              }}
            >
              {/* <FontAwesome name="stop" size={24} color="#5c6bc0" /> */}
              <Ionicons name="reload-circle" size={24} color="#5c6bc0" />
              <Text>Cambiar</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnValidar}
              onPress={() => validarCard()}
            >
              <AntDesign name="checkcircle" size={24} color="green" />
              <Text>Revisar</Text>
            </TouchableOpacity>
              {/* <Text>{`Aciertos: 3/10`}</Text> */}
  
  
          </View>
        </View>
        <LottieView
          ref={confettiRef}
          source={conffeti}
          autoPlay={false}
          loop={false}
          style={{ ...styles.lottie, zIndex: conffetiShow ? 1000 : -1 }}
          resizeMode="cover"
        />
      </>
    );
  };
  
  export default VocalOneGame;
  
  let { height, width } = Dimensions.get("screen");
  
  const styles = StyleSheet.create({
    lottie: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
    },
  
    contenido: {
      display: "flex",
      // backgroundColor: "yellow",
      width: "100%",
      // height: height < 500 ? height - 150 : width - 150,
      marginTop: 0,
      alignItems: "center",
      
  
      gap: 20,
    },
    btnPlay: {},
    contenidoCard: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 50,
    },
    btnReload: {
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
      width: 40,
      height: 40,
      borderRadius: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      
    },
    imgCard: {
      width: 70,
      height: 70,
      resizeMode:"contain"
    },
    controles: {
      display: "flex",
      flexDirection: "row",
      gap: 30,
      marginTop: 5,
    },
  });
  