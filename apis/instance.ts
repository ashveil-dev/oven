import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const devAxios = axios.create({
    baseURL : "http://localhost:4000",
})

devAxios.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    
    if(accessToken === null) return config;
    return {
        ...config,
        Authorization : `Bearer : ${accessToken}`
    };
})

const prodAxios = axios.create({
    baseURL : "http://localhost:4000"
})

prodAxios.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    
    if(accessToken === null) return config;
    return {
        ...config,
        Authorization : `Bearer : ${accessToken}`
    };
})

export default devAxios;