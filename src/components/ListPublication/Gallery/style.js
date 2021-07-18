import {Dimensions, StyleSheet} from "react-native";
import {theme} from "../../../core/theme";
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    card:{
        backgroundColor:theme.colors.background,
        borderColor:theme.colors.placeholder,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        height: DEVICE_WIDTH/3,
        width: DEVICE_WIDTH/3,
    },
    imageStyle:{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    imageBG:{
        width: DEVICE_WIDTH/3,
        height: DEVICE_WIDTH/3,
        overflow: 'hidden'
    },
    video:{
        width: DEVICE_WIDTH,
        height: DEVICE_WIDTH,
        overflow: 'hidden',
        zIndex: -1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    muteButton:{
        backgroundColor:"transparent",
        margin: '10%',
        height: '50%',
        width: '50%',
        alignSelf:'center',
        position: "absolute",
        borderRadius:900,
        alignItems:"center",
        alignContent:"center",
    },
    iconMute:{
        top: '50%'
    },
    muteContainer:{
        backgroundColor:"transparent",
        margin: '10%',
        height: '50%',
        width: '50%',
        alignSelf:'center',
        position: "absolute",
        borderRadius:900,
        alignItems:"center",
        alignContent:"center",
    }


});