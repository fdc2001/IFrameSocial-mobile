import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export async function createSession(token, device, username){
    try {
        await AsyncStorage.setItem('@iframe_token', token)
        await AsyncStorage.setItem('@iframe_device', device)
        await AsyncStorage.setItem('@iframe_username', username)
        return true
    } catch (e) {
        Alert.alert('Error', 'Error on save session')
        return false
        // saving error
    }
}

export async function getSession(){
    try {
        const token = await AsyncStorage.getItem('@iframe_token')
        const device = await AsyncStorage.getItem('@iframe_device')
        const username = await AsyncStorage.getItem('@iframe_username')
        if(token !== "" && device!=="" && username !== "") {
            return {
                token, device, username
            }
        }else{
            return {
                token:"", device:"", username: ""
            }
        }
    } catch(e) {
        return {
            token:"", device:"", username:""
        }
    }
}

export async function setPendingAccount(email){
    try {
        await AsyncStorage.setItem('@iframe_email', email)
        return true
    } catch (e) {
        Alert.alert('Error', 'Error on save session')
        return false
        // saving error
    }
}

export async function getEmail(){
    try {
        const email = await AsyncStorage.getItem('@iframe_email')
        if(email !== null) {
            return {
                email
            }
        }else{
            return {
                email:""
            }
        }
    } catch(e) {
        return {
            email:""
        }
    }
}

export function isAuthenticated(){
    return getSession().then(session=>{
        return session.token!=="" && session.device!=="" && session.username!=="" && session.token!==null && session.device!==null && session.username!==null
    })
}

export async function logout() {
    await AsyncStorage.clear()
}