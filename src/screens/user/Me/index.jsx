import React, {memo, useEffect, useState} from "react";
import {Modal, RefreshControl, ScrollView, Text, View} from "react-native";
import {styles} from "./style";
import TopBar from "../../../components/TopBar";
import api, {baseURL} from "../../../core/api";
import { Button, Divider} from "react-native-paper";
import { Avatar } from 'react-native-elements';

import {theme} from "../../../core/theme";

function Me(props){
    const [userData, setUserData]=useState({username:"IFRAME", verified:1});
    const [refresh, setRefresh] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefresh(true);
    }, []);

    useEffect(()=>{
        if(refresh===true){
            api.get('account/profile').then(res=>{
                setUserData(res.data.data)
                console.log(res.data.data)
                setRefresh(false)
            }).catch(console.log)
        }

    }, [refresh])

    return (
        <View>
            <TopBar title={userData.username.toUpperCase()}/>
            <ScrollView
                style={styles.containerMaster}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
                refreshing={refresh}
            >
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Text style={{color: theme.colors.text, fontWeight: 'bold'}}>{userData.totalFollowers}</Text>
                            <Text style={{color: theme.colors.placeholder}}>Followers</Text>
                        </View>
                        <View style={styles.itemImage}>
                            <Avatar title={userData.username.charAt(0)} avatarStyle={{borderRadius: 25}} size={70}  source={{uri:baseURL+"account/photo/"+userData.username}} >
                                {userData.verified!==0?(
                                    <Avatar.Accessory size={15} containerStyle={{backgroundColor:"transparent", borderRadius: 30}} backgroundColor={"blue"} iconProps={{ name: 'done', size:15, rounded: true }} />
                                ):null}
                            </Avatar>
                        </View>
                        <View style={styles.item}>
                            <Text style={{color: theme.colors.text, fontWeight: 'bold'}}>{userData.totalFollowings}</Text>
                            <Text style={{color: theme.colors.placeholder}}>Following</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color: theme.colors.placeholder}}>{userData.name}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.row}>
                        <Text style={{color: theme.colors.placeholder}}>{userData.description}</Text>
                    </View>
                    <View style={styles.row}>
                        <Button  style={styles.button} color={theme.colors.secondary} mode="contained">Edit Profile</Button>
                    </View>
                    <View style={styles.divider}/>
                </View>
            </ScrollView>

        </View>
    )
}


export default memo(Me)