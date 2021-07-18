import axios from "axios"
import * as Localization from 'expo-localization';
import {getSession, isAuthenticated, logout} from "./auth";
import {encode as btoa} from 'base-64'
import * as Device from 'expo-device';
import {Alert} from "react-native";
import * as Updates from 'expo-updates';


export const baseURL="http://192.168.1.140:8000/api/"+Localization.locale+"/v1/"


const source = axios.CancelToken.source();

const api = axios.create({
    baseURL:baseURL,
    headers:{
        "iframe-tz":Localization.timezone,
        "iframe-device":Device.brand+" "+Device.modelName,
        "iframe-OS":Device.osName,
        "iframe-type":"App"
    },
    cancelToken: source.token
})

api.interceptors.request.use( async config=>{
    if(await isAuthenticated()){
        const session=await getSession()
        config.headers.Authorization="Basic "+btoa(session.device+":"+session.token)
        return config
    }else{
        return config
    }

})

api.interceptors.response.use(res=>{
    return res;
}, error=>{
    if (401 === error.response.status) {
        Alert.alert('Information', error.response.data.data,
            [
                { text: "Ok", style:"destructive", onPress: async () => {
                        await logout()
                        Updates.reloadAsync()
                    }
                }
            ]
        )
    }

    if(error.message==="Network error" && !error.response){
        Alert.alert('Information', error.response.data.data,
            [
                { text: "Ok", style:"destructive", onPress: ()=>null}
            ]
        )
    }
})

export function tokenAuth  (){
    return getSession().then(session=>{
        return btoa(session.device+":"+session.token)
    })
}



export default api