import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/v1`
})
// console.log(process.env.EXPO_PUBLIC_BACKEND_URL);
export default clienteAxios;