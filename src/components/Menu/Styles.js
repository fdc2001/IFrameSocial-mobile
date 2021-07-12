import {Dimensions, StyleSheet} from "react-native"
import {theme} from "../../core/theme";
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    menu:{
        borderTopLeftRadius:21,
        borderTopRightRadius:21,
        backgroundColor:theme.colors.background,
        position:'absolute',
        bottom: 0,
        padding:10,
        width: DEVICE_WIDTH,
        height: 75,
        zIndex: 8,
        borderColor: theme.colors.placeholder,
        borderWidth: 1,
        borderTopWidth: 1,
        borderTopColor: theme.colors.placeholder,
        borderBottomWidth:0
    }
});