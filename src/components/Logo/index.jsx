import React, { memo } from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Header from "../Header";

const Logo = () => (
    /*<Image source={require('../../assets/logo.png')} style={styles.image}/>*/
    <Header>IFrame</Header>
);

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    },
});

export default memo(Logo);
