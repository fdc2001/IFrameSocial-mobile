import {Dimensions, StyleSheet} from "react-native"
import { theme } from '../../../core/theme';
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    frame:{
        margin:5
    },
    container:{
        width:(DEVICE_WIDTH/3),
        marginLeft:3,
        marginRight:3,
        elevation:10,
        shadowOpacity:0.2
    },
    image:{
        height:100,
        width:100,
        justifyContent: "flex-end",
        alignItems:'center'
    },
    imageStyle:{
        borderRadius: 10
    },
    tagName:{
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:theme.colors.primary,
    }
});