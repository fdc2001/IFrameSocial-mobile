import React, {memo, useEffect, useState} from "react";
import {Alert, Modal, RefreshControl, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {styles} from "./style";
import TopBar from "../../../components/TopBar";
import api, {baseURL} from "../../../core/api";
import { Button, Divider} from "react-native-paper";
import { Avatar } from 'react-native-elements';

import {theme} from "../../../core/theme";
import {useActionSheet} from "@expo/react-native-action-sheet";

function Profile(props){
    const [userData, setUserData]=useState({username:"IFRAME", verified:1, followMe:false});
    const [refresh, setRefresh] = useState(false)
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(()=>{
        if(refresh===true){
            api.get('account/profile/'+props.route.params.username).then(res=>{
                setUserData(res.data.data)
                console.log(res.data.data)
                setRefresh(false)
            }).catch(console.log)
        }

    }, [refresh])

    function follow(){
        if(!userData.isFollow) {
            api.get('account/follow/' + userData.username).then(res => {
                if (res.data.code == 0) {
                    setRefresh(true)
                }
            })
        }else{
            Alert.alert('Unfollow', 'You want to stop follow '+userData.username+'?', [
                {
                    text: "Yes",
                    onPress: () => {
                        api.delete('account/follow/' + userData.username).then(res => {
                            if (res.data.code == 0) {
                                setRefresh(true)
                            }
                        })
                    },
                },
                {
                    text: "No",
                },
            ])
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefresh(true);

    }, []);

    function handleMenu(){
        showActionSheetWithOptions(
            userData.isBlocked?{
                options: ['Cancel', 'Share', 'Unblock User'],
                cancelButtonIndex: 0
            }:{
                options: ['Cancel', 'Share', 'Block User'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            userData.isBlocked?(
                (buttonIndex) => {
                    if (buttonIndex === 2) {
                        api.delete('privacy/block/'+userData.id).then(res=>{
                            if(res.data.code===0){
                                Alert.alert('Information', res.data.data)
                            }
                        })
                        setRefresh(true)
                    }
                }
            ):(
                (buttonIndex) => {
                    if (buttonIndex === 2) {
                        api.get('privacy/block/'+userData.id).then(res=>{
                            if(res.data.code===0){
                                Alert.alert('Information', res.data.data)
                            }
                        })
                        setRefresh(true)
                    }
                }
            )
        )
    }



    return (
        <View>
            <TopBar title={userData.username.toUpperCase()} action={()=>handleMenu()} />
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
                        <Button  style={styles.button} color={theme.colors.secondary} onPress={follow} mode="contained">{userData.isFollow===true?"A seguir":"Seguir"}</Button>
                    </View>
                    <View style={styles.row}>{userData.followMe?<Text style={{color:theme.colors.placeholder}}>Follow You</Text>:null}</View>
                    <View style={styles.divider}/>
                </View>
            </ScrollView>

        </View>
    )
}


export default Profile