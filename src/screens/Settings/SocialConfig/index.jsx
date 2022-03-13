import React, {useEffect, useState} from "react";
import {ActivityIndicator, View} from "react-native";
import {styles} from "./style";

import TopBar from "../../../components/TopBar";
import api, {baseURL, tokenAuth} from "../../../core/api";

import WebView from "react-native-webview";

function SocialConfig(props) {
    const [token, setToken] = useState("")
    const jsCode = 'window.ReactNativeWebView.postMessage(document.getElementsByTagName("pre")[0].innerHTML)'

    useEffect(()=>{
        tokenAuth().then(session=>{
            setToken(session)
        })
    }, [props.route.params.social])

    return (
        <View style={styles.container}>
            <TopBar title={"Social Networks ("+props.route.params.social+")"} back={true}/>
            {token!==""?<WebView
                source={{uri:baseURL+"sync/saveSession/" + token + "/" + props.route.params.social}}
                injectedJavaScript={jsCode}
                //onNavigationStateChange={data=>console.log(data)}
                allowingReadAccessToURL
                allowsLinkPreview
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator />}
                onMessage={event => {
                    //JSON.parse(event.nativeEvent.data)!==undefined?props.navigation.navigate('Other', {screen: 'Settings/SocialNetworks', params:{from:"config"}}):null

                }}
                javaScriptEnabled
            />:null}
        </View>
    )
}

export default SocialConfig;