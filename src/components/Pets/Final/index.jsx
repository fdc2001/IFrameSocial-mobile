import React, {memo} from "react";
import {Button} from "react-native-paper";
import {theme} from "../../../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import {styles} from "./styles";

const PetsListFinal = ({navigation}) => {
    return (
        <Button onPress={()=>navigation.navigate('Other',{screen:'Pets/List'})} color={theme.colors.primary}  style={styles.container}>
            <Ionicons size={75} name={'chevron-forward-outline'}/>
        </Button>
    );
};
export default memo(PetsListFinal);