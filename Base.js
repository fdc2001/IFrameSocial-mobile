import React, {useEffect} from "react";
import {theme} from "./src/core/theme";
import {NavigationContainer} from "@react-navigation/native";
import BaseApp from "./src/components/BaseApp";
import {Provider as PaperProvider} from "react-native-paper";
import {useRecoilState} from "recoil";
import {IsAuth} from "./src/atoms";
import {isAuthenticated} from "./src/core/auth";
import {Appearance} from "react-native";
import { StatusBar } from 'expo-status-bar';

import Routes from "./src/routes";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import nativeTheme from "./src/core/nativeTheme";

export default function Base(){

    const [isAuth, setIsAuth]=useRecoilState(IsAuth)

    useEffect(()=>{
        isAuthenticated().then(status=>setIsAuth(status))
        function cleanUp() {
            null
        }
    }, [])

    return(
        <NativeBaseProvider theme={nativeTheme}>
            <PaperProvider theme={theme}>
                    {Appearance.getColorScheme()==="dark"?<StatusBar style="light"  />:<StatusBar style="dark"  />}
                    <NavigationContainer>
                        {isAuth?<BaseApp/>:<Routes/>}
                    </NavigationContainer>
                </PaperProvider>
        </NativeBaseProvider>
    )
}