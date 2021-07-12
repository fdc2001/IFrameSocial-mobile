import axios from "axios"
import * as Localization from 'expo-localization';
import {getSession, isAuthenticated} from "./auth";
import {encode as btoa} from 'base-64'

export const baseURL="http://192.168.1.140:8000/api/"+Localization.locale+"/v1/"


const source = axios.CancelToken.source();

const api = axios.create({
    baseURL:baseURL,
    headers:{
        "frame-tz":Localization.timezone
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

export function tokenAuth  (){
    return getSession().then(session=>{
        return btoa(session.device+":"+session.token)
    })
}



export default api