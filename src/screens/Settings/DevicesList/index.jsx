import React, {useCallback, useEffect, useState} from "react";
import {FlatList, Linking, RefreshControl, ScrollView, Text, View} from "react-native";
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
import Device from "../../../components/Device";

function DevicesList(props) {
    const [refresh, setRefresh] = useState(true)

    const [data, setData] = useState([])

    useEffect(()=>{
        moment.locale(locale.toLocaleLowerCase())
        if(refresh){
            api.get('security/devices').then((res)=>{
                setRefresh(false)
                setData(res.data.data)
            })
        }

    }, [refresh])

    return (
        <View style={styles.container}>
            <TopBar title={"Devices with access"} back={true}/>
            <FlatList
                data={data}
                renderItem={propsList=><Device setRefresh={setRefresh} {...propsList} />}
                keyExtractor={item=>item.id}
                onRefresh={() => setRefresh(true)}
                refreshing={refresh}
            />
        </View>
    )
}

export default DevicesList;