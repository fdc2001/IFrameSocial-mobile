import {Dimensions, StyleSheet} from "react-native";
import {theme} from "../../../core/theme";
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    card:{
        backgroundColor:theme.colors.background,
        //borderColor:theme.colors.placeholder,
        //shadowColor: "#000000",
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        //shadowOpacity: 0.58,
        //shadowRadius: 16.00,
        //elevation: 24,
        //height: DEVICE_WIDTH/3,
        //width: (DEVICE_WIDTH/3)-1.8,

    },

    imageBG:{
        height: (DEVICE_WIDTH/3)-6,
        //aspectRatio:16/9,
        width: (DEVICE_WIDTH/3)-6,
        //overflow: 'hidden',
        borderRadius:10,
        margin:3
    },



});