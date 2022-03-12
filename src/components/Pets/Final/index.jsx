import React, {memo} from "react";
import { Backpack } from 'react-kawaii/lib/native/'
import Pet from "../Pet";
import {ImageBackground, Text, View} from "react-native";
import {Card} from "react-native-paper";
import CardContent from "react-native-paper/src/components/Card/CardContent";
import {theme} from "../../../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

const Final = () => {
    return (
        /*<View style={{flex:1}}>
            <ImageBackground style={{height:100, width:100,justifyContent: "flex-end", alignItems:'center'}}
                             source={{uri:'https://www.dhresource.com/0x0/f2/albu/g7/M00/F9/B9/rBVaSVrw_LCACDBLAAJ3HfBGOiQ640.jpg'}}>

            </ImageBackground>
        </View>*/
        <View style={{height:100, width:100,justifyContent: "center", alignItems:'center', backgroundColor:theme.colors.background}}>
            <Ionicons size={50} name={'chevron-forward-outline'}/>
        </View>

    );
};
export default memo(Final);