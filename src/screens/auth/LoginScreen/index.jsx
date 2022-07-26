import React, { memo, useState } from 'react';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import BackButton from '../../../components/BackButton';
import {Alert, Text, TouchableOpacity, View} from "react-native";
import TextInput from "../../../components/TextInput"
//import Paragraph from '../../../components/Paragraph';
import {styles} from "./style"
import {emailValidator, passwordValidator} from "../../../core/utils";
import api from "../../../core/api";
import {createSession} from "../../../core/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {IsAuth} from "../../../atoms";

const LoginScreen = ({ navigation })=> {
        const [email, setEmail] = useState({ value: '', error: '' });
        const [password, setPassword] = useState({ value: '', error: '' });
        const [isAuth, setIsAuth]=useRecoilState(IsAuth)


    function login(){
            const passwordError = passwordValidator(password.value);
            if (passwordError) {
                setPassword({ ...password, error: passwordError });
                return;
            }else{
                api.post('account/login',{
                    "username": email.value,
                    "password":password.value
                }).then(res=>{
                    if(res.data.code!=0){
                        Alert.alert("Error",res.data.error)
                    }else{

                        createSession(res.data.data.sessionToken, res.data.data.deviceID, res.data.data.username).then(status=>{
                            if(status){

                                setIsAuth(true)
                            }
                        })
                    }
                })
            }
        }

        return(
            <Background>
                    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
                    <Logo />
                    <Header>Welcome back.</Header>

                    <TextInput
                        label="Email or Username"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                    />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordScreen')}
                    >
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained"  onPress={login}>
                    Login
                </Button>
                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
}

export default memo(LoginScreen);
