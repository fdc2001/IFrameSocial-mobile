import React, {memo, useEffect, useRef, useState} from "react";
import {Dimensions, ImageBackground, Text, TouchableOpacity, Animated, View, Image} from "react-native";
import {Card, Paragraph, Title} from "react-native-paper";
import { Avatar } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import {baseURL, tokenAuth} from "../../../core/api";
import {styles} from "./styles"
import {getSession} from "../../../core/auth";
import {Video, Audio} from "expo-av";
import {useRecoilState} from "recoil";
import {Muted} from "../../../atoms";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from "../../../core/theme";
import Autolink from 'react-native-autolink';


function List (props){
    const [muted, setMuted] = useRecoilState(Muted)
    const data=props.item
    const token = props.token
    const navigation = props.navigation
    const focus = props.focus
    const index = props.index

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false)

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.9,
            useNativeDriver: true,
            duration: 500
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300
        }).start();
    };

    function handleProfile(){
        getSession().then(session=>{
            if(session.username===data.user){
                navigation.navigate("Me")
            }else{
                navigation.navigate('Other', {screen: 'Profile', params:{username:data.user}})
            }
        })
    }

    useEffect(()=>{
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true
        });
    }, [])


    useEffect(()=> {
        if(show){
            fadeOut();
            setShow(false)
        }

    }, [show])


    return(
        <Card key={data.id} style={styles.card} onPress={()=>alert(1)}>
            {data.type==="IMAGE"?(
                <ImageBackground imageStyle={styles.imageStyle} style={styles.imageBG}  source={{ uri: index<=(focus+1)?baseURL+"publication/media/"+data.id+"/"+token:baseURL+"publication/media/thumbnail/"+data.id+"/"+token }}>
                    <BlurView intensity={3} BlurTint={"dark"} style={index<=(focus+1)?null:styles.imageBG} >
                        <Card.Title
                            titleStyle={{color: "#fff"}}
                            title={data.user}
                            left={() => <Avatar title={data.user.charAt(1)} avatarStyle={{borderRadius: 25}} size={35} source={{uri:baseURL+"account/photo/"+data.user}} onPress={handleProfile} />}
                        />
                    </BlurView>
                </ImageBackground>
            ):data.type==="VIDEO"?(
                <>
                    <BlurView intensity={3} BlurTint={"dark"}>
                        <Card.Title
                            style={{zIndex:2, position: 'absolute'}}
                            titleStyle={{color: "#fff"}}
                            title={data.user}
                            left={() => <Avatar title={data.user.charAt(1)} avatarStyle={{borderRadius: 25}} size={35} source={{uri:baseURL+"account/photo/"+data.user}} onPress={handleProfile} />}
                            onPress={()=>setMuted(false)}

                        />
                    </BlurView>
                    {index<=(focus+1)?(
                        <Video
                            style={styles.video}
                            paused={false}
                            isLooping
                            useNativeControls={false}
                            resizeMode="cover"
                            isMuted={muted}
                            volume={1.0}
                            source={{
                                uri: baseURL+"publication/media/"+data.id+"/"+token
                            }}
                            shouldPlay={focus === index}
                        />
                    ):<Image style={styles.video} source={{ uri: baseURL+"publication/media/thumbnail/"+data.id+"/"+token }} />}
                    <Animated.View
                        style={[
                            styles.muteContainer,
                            {
                                // Bind opacity to animated value
                                opacity: fadeAnim
                            }
                        ]}
                    >
                        <TouchableOpacity onPress={()=>{
                            fadeIn()
                            setMuted(!muted)
                            setTimeout(()=>setShow(true), 1000)
                        }} style={styles.muteButton}>
                            {muted?<Icon name="volume-off" style={styles.iconMute} size={100} color="rgba(0, 0, 0, 0.8)"></Icon>:<Icon name="volume-up" style={styles.iconMute} size={100} color="rgba(0, 0, 0, 0.8)"></Icon>}
                        </TouchableOpacity>
                    </Animated.View>
                </>
            ):data.type="Text"?
                <>
                    <View style={[styles.imageStyle, {backgroundColor:theme.colors.background, padding: 40, height: 300}]}>

                        <Autolink
                            hashtag="instagram"
                            mention="twitter"
                            email
                            url
                            text={data.content}
                            style={{fontSize: 29, lineHeight: 32, alignSelf: 'center', color: theme.colors.text}}/>
                    </View>
                </>
                :null}
            <View style={{backgroundColor:"transparent",zIndex: 90, height: "10%", width: '100%', position: 'absolute', bottom:'15%', paddingLeft: 10}}>
                <BlurView style={{borderRadius: 100, width: '8%'}} intensity={80}><Icon size={30}  name={"favorite-outline"}/></BlurView>
            </View>
        </Card>
    )

}

export function EmptyComponent({refresh}){
    if(!refresh) {
        return (
            <Card style={styles.card}>
                <View style={[styles.imageStyle, {backgroundColor: theme.colors.background, padding: 40, height: 300}]}>
                    <Paragraph style={{fontSize: 29, lineHeight: 32, alignSelf: 'center'}}>Not have more to show 😞</Paragraph>
                </View>
            </Card>
        )
    }else {
        return  null
    }
}

//export default Publication
export default memo(List)
