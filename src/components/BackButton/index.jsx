import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Avatar } from 'react-native-paper';
import {theme} from "../../core/theme";

const BackButton = ({ goBack }) => (
    <TouchableOpacity onPress={goBack} style={styles.container}>
        {/*<Image style={styles.image} source={require('../../assets/arrow_back.png')} />*/}
        <Avatar.Icon style={{backgroundColor:'transparent', }} color={theme.colors.primary} icon={"arrow-left"} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: -40,

    },
    image: {
        width: 24,
        height: 24,
    },
});

export default memo(BackButton);
