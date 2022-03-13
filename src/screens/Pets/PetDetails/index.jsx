import TopBar from "../../../components/TopBar";
import {styles} from "./style";
import {RefreshControl} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {Center, ScrollView, View} from "native-base";
import api, {baseURL} from "../../../core/api";
import {Card} from "react-native-paper";
import CardContent from "react-native-paper/src/components/Card/CardContent";
import Pet from "../../../components/Pets/Pet";
import {BackgroundImage} from "react-native-elements/dist/config";

const PetDetails = ({route}) =>{
    const [details, setDetails] = useState({name:'Iframe', current_mood:"Happy", details:{ type:{type:'Cat'}, style:{color:'#ffffff'}}});

    useEffect(() => {
        api.get('/pet/' + route.params.petId).then(response => {
            setDetails(response.data.data)
        })
    }, []);

    return (
        <View>
            <TopBar title={details.name} back={true} />
            <ScrollView
                style={styles.containerMaster}
                /*refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
                refreshing={refresh}*/
            >
                <View style={{padding:5}}>
                        <BackgroundImage
                            source={{uri: baseURL+"pet/background/"+details.details.style.id}}
                            style={styles.backgroundImage}
                        >
                            <Center style={{flex:1, justifyContent:"flex-end"}} bottom={0}>
                                <Pet pet={details.details.type.type} mood={details.current_mood} size={150} color={details.details.style.color}/>
                            </Center>
                        </BackgroundImage>

                </View>
            </ScrollView>
        </View>
    )
}

export default memo(PetDetails, (prevProps, nextProps) => {
    return prevProps.route.params.petId === nextProps.route.params.petId
});