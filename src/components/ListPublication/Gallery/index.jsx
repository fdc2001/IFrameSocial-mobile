import {Text, View} from "react-native";
import React, {memo} from "react";
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import {styles} from "./style";
import {Card, Title} from "react-native-paper";
import {baseURL} from "../../../core/api";

function Gallery (props){
    const data=props.item
    const token = props.token
    const index = props.index


    return (
        <View style={index!==0?styles.card:[styles.card]}>
            {data.type==="IMAGE" || data.type==="VIDEO"?(
                <Image style={styles.imageBG} source={{ uri: baseURL+"publication/media/thumbnail/"+data.id+"/"+token}}/>
            ):<Title>{/*data.content*/}</Title>}
        </View>
    )
}

export default memo(Gallery)