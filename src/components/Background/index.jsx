import React, { memo } from 'react';
import {
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView, View,
} from 'react-native';
import {theme} from "../../core/theme";



const Background = ({ children }) => (
        /*<ImageBackground
            source={require('../../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
        >*/
        <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </View>
        /*</ImageBackground>*/
);
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.background
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(Background);
