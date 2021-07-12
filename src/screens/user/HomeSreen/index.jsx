import React, {memo, useEffect, useState} from "react";
import TopBar from "../../../components/TopBar";
import {Dimensions, FlatList, View} from "react-native";
import Publication from "../../../components/Publication";
import {styles} from "./style"
import {createStackNavigator} from "@react-navigation/stack";
import {useRecoilState} from "recoil";
import {ShowBar} from "../../../atoms";
import api, {tokenAuth} from "../../../core/api";
const DEVICE_WIDTH = Dimensions.get('window').width;

function HomeScreen({navigation}){

    const [refresh, setRefresh] = useState(false)
    const [allData, setAllData]=useState([])
    const [data, setData]=useState([])
    const [, setShowBar]=useRecoilState(ShowBar)
    const [scrollOldValue, setScrollOldValue]=useState(0)
    const [token, setToken] = useState("");
    const [focusedIndex, setFocusedIndex] = React.useState(0);




    useEffect(()=>{
        tokenAuth().then(session=>{
            setToken(session)
            loadData("load")
        })
    },[])

    function loadData(type="next"){
        if(type === "load"){
            setRefresh(true)
            api.get('publication/feed').then((res)=>{
                setData(res.data.data)
                setAllData(res.data)
                setRefresh(false)
            })
        }else{
            if(allData.next_page_url!==null){
                setRefresh(true)
                let tmpData = data
                api.get('publication/feed?page='+allData.current_page+1).then(res=>{
                    tmpData.push(res.data.data.data)
                    setData(tmpData)
                    setAllData(res.data)
                    setRefresh(false)
                })
            }
        }
    }





    return(
        <>
            <TopBar/>
            <View style={styles.container}>
                <FlatList
                    onScroll={event => {
                        const offset = Math.round(event.nativeEvent.contentOffset.y / DEVICE_WIDTH+0.5);
                        setFocusedIndex(offset)
                        const currentOffset = event.nativeEvent.contentOffset.y;
                        const dif = currentOffset - (scrollOldValue || 0);
                        if (Math.abs(dif) < 5) {
                            setShowBar(true)
                        } else if (dif < 0) {
                            setShowBar(true)
                        } else {
                            setShowBar(false)

                        }
                        setScrollOldValue(currentOffset)
                    }}
                    style={{marginTop: 5, paddingTop: 50}}
                    data={data}
                    renderItem={props=><Publication{...props} token={token}  navigation={navigation} focus={focusedIndex} />}
                    keyExtractor={(row)=>row.id.toString()}
                    onRefresh={() => loadData("load")}
                    refreshing={refresh}
                    tintColor="red"
                    scrollEventThrottle={100}

                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        loadData()
                    }}
                />
            </View>
        </>
    )
}



export default memo(HomeScreen)