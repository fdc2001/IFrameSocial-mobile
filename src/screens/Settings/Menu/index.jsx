import React from "react";
import {Alert, ScrollView, View} from "react-native";
import {styles} from "./style";
import { ListItem, Avatar } from 'react-native-elements'

import TopBar from "../../../components/TopBar";
import {Button} from "react-native-paper";
import {logout} from "../../../core/auth";
import {useRecoilState} from "recoil";
import {IsAuth} from "../../../atoms";

function Menu({navigation}) {
    const [isAuth, setIsAuth]=useRecoilState(IsAuth)

    async function exit(){

        Alert.alert(
            "Confirmation",
            "Are you sure you want to finish the session?",
            [
                {
                    text: "Cancel",
                    //onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", style:"destructive", onPress: async () => {
                         logout().then(()=>{
                             setIsAuth(false)
                             navigation.navigate("HomeScreen")
                         })
                }}
            ]
        );
    }

    return (
        <View style={styles.container}>
            <TopBar title={"Settings"} back={false} />
            <ScrollView >
                <ListItem
                    bottomDivider
                    style={styles.item}
                    containerStyle={styles.item}
                    textStyle={styles.item}
                    onPress={()=>navigation.navigate('Other', {screen: 'Settings/SocialNetworks'})}
                >
                    <ListItem.Content >
                        <ListItem.Title style={styles.text} >Redes</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem
                    bottomDivider
                    style={styles.item}
                    containerStyle={styles.item}
                    textStyle={styles.item}
                    onPress={()=>navigation.navigate('Other', {screen: 'Settings/DevicesList'})}
                >
                    <ListItem.Content >
                        <ListItem.Title style={styles.text} >Devices Logged</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <Button icon="exit-to-app" color={"red"} mode="outlined" onPress={ () => {
                    exit()
                }}>
                    LogOut
                </Button>
            </ScrollView>
        </View>
    )
}

export default Menu;