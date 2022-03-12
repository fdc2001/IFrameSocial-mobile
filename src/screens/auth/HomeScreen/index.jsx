import React, { memo } from 'react';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import {Text} from "react-native";
import {theme} from "../../../core/theme";


const HomeScreen = ({ navigation }) => (
    <Background>
        <Logo />


        <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            Login
        </Button>
        <Text style={{color:theme.colors.text}}>Novo por aqui?</Text>
        <Button
            mode="outlined"
            onPress={() => navigation.navigate('RegisterScreen')}
        >
            Sign Up
        </Button>
    </Background>
);

export default memo(HomeScreen);
