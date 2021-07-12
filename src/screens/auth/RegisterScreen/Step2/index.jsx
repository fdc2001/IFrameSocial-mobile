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
import {theme} from "../../../../core/theme";

const RegisterScreenStep2 = ({ route, navigation })=> {
        const { username, email } = route.params;
        const [password, setPassword] = useState({ value: '', error: '' });
        const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' });

        function next(){
            const passwordError = passwordValidator(password.value);
            const passwordConfirmError = empetyValidator(passwordConfirm.value);
            if (passwordError || passwordConfirmError) {
                setPassword({ ...password, error: passwordError });
                setPasswordConfirm({ ...passwordConfirm, error: passwordConfirmError });
                return;
            }else{
                if(passwordConfirm.value===password.value){
                    navigation.navigate('RegisterScreen3', {
                        email, username, password:password.value, passwordConfirm:passwordConfirm.value
                    })
                }else{
                    setPassword({ ...password, error: "The passwords not match" });
                    setPasswordConfirm({ ...passwordConfirm, error: "The passwords not match" });
                }

            }
        }

        return(
            <Background>
                    <BackButton goBack={() => navigation.goBack()} />
                    <Logo />
                    <Text style={{color:theme.colors.text}}>Set Password for account</Text>
                    <TextInput
                        label="Password"
                        returnKeyType="next"
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        autoCapitalize="none"
                        autoCompleteType="password"
                        textContentType="password"
                        secureTextEntry
                    />

                    <TextInput
                        label="Password Verify"
                        returnKeyType="done"
                        value={passwordConfirm.value}
                        onChangeText={text => setPasswordConfirm({ value: text, error: '' })}
                        error={!!passwordConfirm.error}
                        errorText={passwordConfirm.error}
                        autoCompleteType="password"
                        textContentType="password"
                        secureTextEntry
                    />
                <Button mode="contained"  onPress={next}>
                    Next
                </Button>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}>Back</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
}

export default memo(RegisterScreenStep2);
