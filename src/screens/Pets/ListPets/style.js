import {Dimensions, StyleSheet} from "react-native"
import { theme } from '../../../core/theme';
const DEVICE_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.background,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: "space-around",
        alignContent: 'space-between',
        flexWrap: "wrap",
        width: DEVICE_WIDTH,
        //height: '100%'
    },
    containerMaster:{
        backgroundColor: theme.colors.background,
        height: '100%'
    },
    itemImage:{
        width: (DEVICE_WIDTH/6),
        alignItems:'center',
        alignContent: 'center'
    },
    item:{
        width: (DEVICE_WIDTH/3),
        alignItems:'center',
        alignContent: 'center'
    },
    row:{
        marginTop:10,
        flexDirection:'row',
        alignItems: 'center',
        alignContent:'center'
    },
    button:{
        borderRadius: 15
    },
    divider:{
        height: 0.3,
        margin: 5,
        //backgroundColor: theme.colors.placeholder,
        width: DEVICE_WIDTH-50
    },
    pubContainer:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: "space-around",
        alignContent: 'space-between',
        flexWrap: "wrap",

    },
    list:{
        width: DEVICE_WIDTH,
    },
});