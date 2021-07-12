import {Appbar} from "react-native-paper";
import React from "react";
import {theme} from "../../core/theme";

export default function TopBar({title = "IFRAME", action=null}){
    return(
        <Appbar.Header style={{backgroundColor:theme.colors.background, borderBottomColor: theme.colors.placeholder, borderBottomWidth: 0.5}}>
            <Appbar.Action icon={"cog"}/>
            <Appbar.Content title={title} />
            {action!==null?<Appbar.Action onPress={action} icon={"menu"}/>:null}

        </Appbar.Header>
    )
}