import React, {memo, useEffect, useRef, useState} from "react";
import {Dimensions, ImageBackground, Text, TouchableOpacity, Animated, View} from "react-native";
import { Card} from "react-native-paper";
import { Avatar } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import {baseURL, tokenAuth} from "../../core/api";
import {styles} from "./styles"
import {getSession} from "../../core/auth";
import {Video, Audio} from "expo-av";
import {useRecoilState} from "recoil";
import {Muted} from "../../atoms";
import Icon from 'react-native-vector-icons/MaterialIcons';


function Publication (props){
    const [muted, setMuted] = useRecoilState(Muted)
    const data=props.item
    const token = props.token
    const navigation = props.navigation
    const focus = props.focus
    const index = props.index
    const DEVICE_WIDTH = Dimensions.get('window').width;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false)

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
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
                console.log("oi")
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
                <ImageBackground imageStyle={styles.imageStyle} style={styles.imageBG} source={{ uri: baseURL+"publication/media/"+data.id+"/"+token }}>
                    <BlurView intensity={3} BlurTint={"dark"}>
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
            ):<Text>undefined</Text>}
            <View style={{backgroundColor:"transparent",zIndex: 90, height: "10%", width: '100%', position: 'absolute', bottom:'15%'}}>
                <BlurView intensity={80}><Icon size={50}  name={"cards-heart"}/></BlurView>
            </View>
        </Card>
    )

}

//export default Publication
export default memo(Publication)