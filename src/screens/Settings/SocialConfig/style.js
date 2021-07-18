import {Dimensions, StyleSheet} from "react-native"
import { theme } from '../../../core/theme';
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.background,
        width: DEVICE_WIDTH,
        height: '100%'
    },
    text:{
        color: 'white',
        fontWeight: 'bold'
    },
    item:{
        backgroundColor: theme.colors.background,
        color: "red"
    }
})