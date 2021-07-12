import React, { memo, useState } from 'react';
import Background from '../../../../components/Background';
import Logo from '../../../../components/Logo';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import BackButton from '../../../../components/BackButton';
import {Alert, Text, TouchableOpacity, View} from "react-native";
import TextInput from "../../../../components/TextInput"
//import Paragraph from '../../../components/Paragraph';
import {styles} from "./style"
import {emailValidator, empetyValidator, passwordValidator} from "../../../../core/utils";
import api from "../../../../core/api";
import {createSession} from "../../../../core/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreenStep1 = ({ navigation })=> {
        const [email, setEmail] = useState({ value: '', error: '' });
        const [username, setUsername] = useState({ value: '', error: '' });

        function next(){
            const emailError = emailValidator(email.value);
            const usernameError = empetyValidator(username.value);
            if (emailError || usernameError) {
                setEmail({ ...email, error: emailError });
                setUsername({ ...username, error: usernameError });
                return;
            }else{
                api.post('account/new/verify', {
                    username:username.value,
                    email:email.value,
                }).then(res=>{
                    if(res.data.code!=0){
                        if(res.data.error.email!==undefined)
                            setEmail({...email, error: res.data.error.email.join(', ')})
                        if(res.data.error.username!==undefined)
                            setUsername({...username, error: res.data.error.username.join(', ')})
                    }else {
                        navigation.navigate('RegisterScreen2', {
                            email:email.value, username:username.value
                        })
                    }
                })

            }
        }

        return(
            <Background>
                    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
                    <Logo />

                    <TextInput
                        label="Email"
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
                        label="Username"
                        returnKeyType="done"
                        value={username.value}
                        onChangeText={text => setUsername({ value: text, error: '' })}
                        error={!!username.error}
                        errorText={username.error}
                    />
                <Button mode="contained"  onPress={next}>
                    Next
                </Button>
                <View style={styles.row}>
                    <Text style={styles.label}>Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
}

export default memo(RegisterScreenStep1);
