import React, {memo, useEffect, useState} from "react";
import TopBar from "../../../components/TopBar";
import {Appearance, Dimensions, FlatList, Text, View} from "react-native";
import Publication, {EmptyComponent, emptyComponent} from "../../../components/ListPublication/List";
import {styles} from "./style"
import {useRecoilState} from "recoil";
import {ShowBar} from "../../../atoms";
import api, {tokenAuth} from "../../../core/api";
import {ActivityIndicator} from "react-native";
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
            //setRefresh(true)
            api.get('publication/feed?page=1').then((res)=>{
                setData(res.data.data)
                setAllData(res.data)
                setRefresh(false)
            })
        }else{
            console.error(allData.current_page)
            if(allData.next_page_url!==null){
                setRefresh(true)
                let tmpData = data
                api.get('publication/feed?page='+(parseInt(allData.current_page)+1)).then(res=>{
                    tmpData.concat(res.data.data)
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
                    style={{marginTop: 5, paddingTop: 50, marginBottom: 0}}
                    data={data}
                    renderItem={props=><Publication{...props} token={token}  navigation={navigation} focus={focusedIndex} />}
                    keyExtractor={(row)=>row.id.toString()}
                    onRefresh={() => loadData("load")}
                    refreshing={refresh}
                    tintColor="red"
                    scrollEventThrottle={100}
                    renderToHardwareTextureAndroid={true}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        loadData()
                    }}
                    ListEmptyComponent={<ActivityIndicator renderToHardwareTextureAndroid={false} size={"large"} color={Appearance.getColorScheme()==="dark"?"white":"gray"}/>}
                    ListFooterComponent={<EmptyComponent refresh={refresh}/>}
                    removeClippedSubviews={true} // Unmount components when outside of window
                    initialNumToRender={3} // Reduce initial render amount
                    maxToRenderPerBatch={5} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                    windowSize={7}




                />
            </View>
        </>
    )
}



export default (HomeScreen)