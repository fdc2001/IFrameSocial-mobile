import React, {useCallback, useEffect, useState} from "react";
import {Linking, RefreshControl, ScrollView, Text, View} from "react-native";
import {styles} from "./style";
import {ListItem, Avatar} from 'react-native-elements'

import TopBar from "../../../components/TopBar";
import Icon from "react-native-vector-icons/FontAwesome";
import {theme} from "../../../core/theme";
import api, {baseURL} from "../../../core/api";
import {Card, Paragraph} from "react-native-paper";
import moment from "moment";
import "moment/min/locales"
import {locale, region} from "expo-localization";

function SocialNetworks(props) {
    const [refresh, setRefresh] = useState(true)

    const onRefresh = useCallback(() => {
        setRefresh(true);
    }, []);


    const [data, setData] = useState({
        instagram:{
            username:"",
            created_at:"",
            automateRenewAccess:false,
            automatePublications:false,
            expireDate:null,
            lastSync:null
        },
        twitter:{
            username:"",
            created_at:"",
            automateRenewAccess:false,
            automatePublications:false,
            expireDate:null,
            lastSync:null
        }
    })

    useEffect(()=>{
        if(props.route.params!==undefined){
            if(props.route.params.from==="config"){
                props.route.params.from=""
                setRefresh(true)
            }
        }
    })

    useEffect(()=>{
        moment.locale(locale.toLocaleLowerCase())
        if(refresh){
            api.get('sync/configs').then((res)=>{
                setRefresh(false)
                setData(res.data.data)
            })
        }

    }, [refresh, props.navigation])

    return (
        <View style={styles.container}>
            <TopBar title={"Social Networks"} back={true}/>
            <ScrollView
                style={{marginTop: 10}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
                refreshing={refresh}
            >
                <ListItem
                    bottomDivider
                    style={styles.item}
                    containerStyle={styles.item}
                    textStyle={styles.item}
                    onPress={()=>props.navigation.navigate('Other', {screen: 'Settings/SocialConfig',params:{social:"Instagram"}})}
                >
                    <Icon name="instagram" color={theme.colors.text} size={30} />
                    <ListItem.Content >
                        <ListItem.Title style={styles.text}>Instagram</ListItem.Title>
                        {
                            data.instagram===null?<ListItem.Subtitle style={styles.subTitle}>Not configured. Tap to configures</ListItem.Subtitle>: (
                                <Card style={{backgroundColor:"transparent", height:'65%'}}>
                                    <Card.Content>
                                        <Paragraph>Username: {data.instagram.username}</Paragraph>
                                        <Paragraph>Configured in: {moment(data.instagram.created_at).fromNow()}</Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        }
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem
                    bottomDivider
                    style={styles.item}
                    containerStyle={styles.item}
                    textStyle={styles.item}
                    onPress={()=>props.navigation.navigate('Other', {screen: 'Settings/SocialConfig',params:{social:"Twitter"}})}
                >
                    <Icon name="twitter" color={theme.colors.text} size={30} />
                    <ListItem.Content style={{ margin:0}}>

                        <ListItem.Title style={styles.text} >Twitter</ListItem.Title>
                        {
                            data.twitter===null?<ListItem.Subtitle style={styles.subTitle}>Not configured. Tap to configure</ListItem.Subtitle>: (
                                <Card style={{backgroundColor:"transparent", height:'65%', margin:0}}>
                                    <Card.Content>
                                        <Paragraph>Username: {data.twitter.username}</Paragraph>
                                        <Paragraph>Configured in: {moment(data.twitter.created_at).fromNow()}</Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        }
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </ScrollView>
        </View>
    )
}

export default SocialNetworks;