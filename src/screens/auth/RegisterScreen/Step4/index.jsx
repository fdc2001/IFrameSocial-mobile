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
import {createSession, getEmail} from "../../../../core/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "../../../../core/theme";
import DatePicker from "../../../../components/DatePicker"
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const RegisterScreenStep4 = ({ route, navigation })=> {
        const { message } = route.params;
        const [code, setCode] = useState({ value: '', error: '' });
        const [status, setStatus] = useState("");

        function handleResend(){

            getEmail().then(store=>{
                                    console.log(store.email)

                api.post('account/validateNewCode', {email:store.email}).then(res=>{
                    console.log(res.data)
                    setStatus(res.data.data)
                })
            })
        }

        function next(){
            setStatus("")
            const codeError = empetyValidator(code.value);
            if(codeError){
                setCode({...name, error:codeError});
                return;
            }else{
                api.post('account/validate',{
                    code:code.value
                }).then(res=>{
                    if(res.data.code!==0){
                        setCode({...code, error:res.data.error})
                    }else{
                        createSession(res.data.data.sessionToken, res.data.data.deviceID, res.data.data.username).then(r =>
                            alert('login')
                        )
                    }
                })
            }

        }

        return(
            <Background>
                    <Logo />
                    <Text style={{color:theme.colors.text}}>Activate account</Text>
                    <TextInput
                        label="Code activation"
                        returnKeyType="next"
                        value={code.value}
                        onChangeText={text => setCode({ value: text, error: '' })}
                        error={!!code.error}
                        errorText={code.error}
                        keyboardType="numeric"
                        autoCapitalize={"sentences"}
                        autoCompleteType="name"
                    />


                <Button mode="contained"  onPress={next}>
                    Activate
                </Button>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleResend()}>
                        <Text style={styles.link}>Resend code</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {status!==""?<Text style={styles.link}>{status}</Text>:null}
                </View>
            </Background>
        );
}

export default memo(RegisterScreenStep4);
