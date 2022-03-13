import {FlatList, RefreshControl, ScrollView, Text, View} from "react-native";
import React, {memo, useCallback, useEffect, useState} from "react";
import TopBar from "../../../components/TopBar";
import {styles} from "./style";
import api from "../../../core/api";
import ListPublication from "../../../components/ListPublication/Gallery";
import VerticalFeed from "../../../components/Pets/VerticalFeed";
import {DeviceInfo} from "react-native-web";

const ListPets = (props) =>{
    const [refresh, setRefresh] = useState(true)
    const [pets, setPets] = useState([])

    const onRefresh = useCallback(() => {
        setRefresh(true);
    }, []);

    useEffect(()=>{
        if (refresh === true) {
            api.get('pet/myList').then(response => {
                setRefresh(false)
                console.log(response.data)
                setPets(response.data.data)
            })
        }
    },[refresh])

    return (
        <View>
            <TopBar back={true} title={"Collection of pets"} />
            <View
                style={styles.containerMaster}

            >
                <View style={styles.container}>
                    <FlatList
                        numColumns={3}
                        style={styles.list}
                        data={pets}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={onRefresh}
                            />
                        }
                        refreshing={refresh}
                        renderItem={data=><VerticalFeed navigation={props.navigation} {...data}
                        />} />

                    <View style={styles.row}>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default (ListPets);