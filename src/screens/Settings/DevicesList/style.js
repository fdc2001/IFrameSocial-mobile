import {Dimensions, StyleSheet} from "react-native"
import { theme } from '../../../core/theme';
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container:{
        paddingBottom:80,
        backgroundColor: theme.colors.background,
        width: DEVICE_WIDTH,
        height: '100%'
    },
    text:{
        color: theme.colors.text,
        fontWeight: 'bold',
    },
    subTitle:{
        color: theme.colors.text,
    },
    item:{
        backgroundColor: theme.colors.background,
        color: "red",
        margin:0
    }
})