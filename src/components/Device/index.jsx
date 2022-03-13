import React, {memo, useState} from "react";
import {Card, Paragraph, Snackbar} from "react-native-paper";
import moment from "moment";
import {theme} from "../../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import {ListItem, Avatar, Button} from 'react-native-elements'
import {styles} from "../../screens/Settings/SocialNetworks/style";
import {Alert} from "react-native";
import {logout} from "../../core/auth";
import api from "../../core/api";

function disableAccess(item, setRefresh){
    Alert.prompt(
        "Confirmation",
        "Are you sure you want disable this device? Please insert your password to confirm",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "Yes", style:"destructive", onPress: async (val) => {
                    await api.put('security/devices/'+item.id, {password: val}).then((res)=>{
                        if(res.data.code!==0){
                            if(res.data.error.password!==undefined){
                                Alert.alert("Error", res.data.error.password.join(", "), [{
                                    text: "OK",
                                    style: "cancel"
                                }])
                            }else{
                                Alert.alert("Error", res.data.error.join(", "), [{
                                    text: "OK",
                                    style: "cancel"
                                }])
                            }
                        }else{
                            Alert.alert('Information', res.data.data.join(", "), [{
                                text: "OK",
                                style: "cancel",
                                onPress:()=>setRefresh(true)
                            }])
                        }

                    })
                }}
        ],
        "secure-text"
    );
}

function Device ({item,setRefresh}){

    return(
        <>
            <ListItem
                bottomDivider
                style={styles.item}
                containerStyle={styles.item}
                textStyle={styles.item}
                onPress={()=>item.thisDevice?null:disableAccess(item, setRefresh)}
                leftWidth={0}
                leftContent={
                    null
                }
                rightContent={
                    <Button
                        title="Disable"
                        icon={{ name: 'lock', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: "red" }}
                    />
                }
            >
                <Icon name={item.device==="Computer"?"laptop":item.system==="iOS"?"apple":"android"} color={theme.colors.text} size={30} />
                <ListItem.Content >
                    <ListItem.Title style={styles.text}>{item.DeviceDescription}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitle}>Last access: {moment(item.updated_at).fromNow()}</ListItem.Subtitle>
                        {/*<Icon name={item.device==="Computer"?"laptop":"cellphone"} color={theme.colors.text} size={30} />*/}
                        <Paragraph>Method of access: {item.BrowserDescription}</Paragraph>
                        <Paragraph>First IP of device: {item.ip}</Paragraph>
                    {item.thisDevice?<Paragraph style={{color: "#5cb85c"}}>This Device</Paragraph>:null}
                        {/*<Paragraph>Configured in: {moment(data.instagram.created_at).fromNow()}</Paragraph>*/}
                </ListItem.Content>
                {!item.thisDevice?<ListItem.Chevron/>:null}
            </ListItem>
        </>
    )
}


export default memo(Device)