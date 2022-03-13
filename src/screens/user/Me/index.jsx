import React, {memo, useEffect, useState} from "react";
import {FlatList, Modal, RefreshControl, ScrollView, Text, View, SafeAreaView, Dimensions, LogBox} from "react-native";
import {styles} from "./style";
import TopBar from "../../../components/TopBar";
import api, {baseURL, tokenAuth} from "../../../core/api";
import {Button, Divider, Title} from "react-native-paper";
import { Avatar } from 'react-native-elements';

import {theme} from "../../../core/theme";
import ListPublication from "../../../components/ListPublication/Gallery";
import { Backpack } from 'react-kawaii/lib/native/'
import HorizontalFeed from "../../../components/Pets/HorizontalFeed";
import {EmptyComponent} from "../../../components/ListPublication/List";
import PetsListFinal from "../../../components/Pets/Final";
const DEVICE_WIDTH = Dimensions.get('window').width;

function Me(props){
    const [userData, setUserData]=useState({username:"IFRAME", verified:1, pets:[]});
    const [refresh, setRefresh] = useState(true)
    const [publications, setPublications] = useState([])
    const [allData, setAllData] = useState({})
    const [token, setToken] = useState("");

    const onRefresh = React.useCallback(() => {
        setRefresh(true);
    }, []);

    useEffect(()=>{
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        tokenAuth().then(session=> {
            setToken(session)

            if (refresh === true) {
                api.get('account/profile').then(res => {
                    setUserData(res.data.data)
                    setRefresh(false)
                })
                getPublications()

            }
        })

    }, [refresh])

    function getPublications(type = "load"){
        if(type==="load"){
            api.get('publication?page=1').then(res=>{
                setPublications(res.data.data)
            })
        }else{
            if(allData.next_page_url!==null){
                api.get('publication?page='+(parseInt(allData.current_page)+1)).then(res=>{
                    setPublications(prevState => prevState.concat(res.data.data))
                })
            }
        }
    }

    return (
        <View>
            <TopBar title={userData.username.toUpperCase()} action={()=>props.navigation.navigate('Other', {screen: 'Settings/Menu'})}  icon={"cog"} />
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
                <View style={styles.pubContainer}>
                    <View style={{flex:1, alignContent:'flex-start', width:DEVICE_WIDTH, marginBottom:20}}>
                        <View style={{...styles.row, justifyContent:'center'}}>
                            <Title>Pets</Title>
                        </View>
                            <View style={styles.divider}/>
                        <FlatList
                            data={userData.pets}
                            renderItem={({item})=>(
                                <HorizontalFeed
                                    navigation={props.navigation}
                                    data={item}
                                    token={token}
                                />
                            )}
                            horizontal={true}
                            keyExtractor={item => item.id}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={<PetsListFinal navigation={props.navigation}/>}
                        />
                    </View>
                    <View style={styles.divider}/>
                    <FlatList numColumns={3} data={publications} renderItem={props=><ListPublication {...props} token={token}  />} />
                </View>
                <View style={{height: 150}}/>
            </ScrollView>

        </View>
    )
}


export default (Me)