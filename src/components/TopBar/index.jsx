import {Appbar} from "react-native-paper";
import React from "react";
import {theme} from "../../core/theme";
import { useNavigation } from '@react-navigation/native';

export default function TopBar({title = "IFRAME", action=null, icon="menu", back=false}){
    const navigation = useNavigation();

    return(
        <Appbar.Header style={{backgroundColor:theme.colors.background, borderBottomColor: theme.colors.placeholder, borderBottomWidth: 0.5}}>
            {/*<Appbar.Action icon={"cog"}/>*/}
            {back?<Appbar.Action onPress={()=>navigation.goBack()} icon={"arrow-left"}/>:null}
            <Appbar.Content title={title} />
            {action!==null?<Appbar.Action onPress={action} icon={icon}/>:null}

        </Appbar.Header>
    )
}