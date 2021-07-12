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
import {createSession, setPendingAccount} from "../../../../core/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "../../../../core/theme";
import DatePicker from "../../../../components/DatePicker"
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const RegisterScreenStep3 = ({ route, navigation })=> {
        const { username, email, password, passwordConfirm } = route.params;
        const [name, setName] = useState({ value: '', error: '' });
        const [birthDate, setBirthDate] = useState({ value: new Date(), error: '' });

        function next(){
            const nameError = empetyValidator(name.value);
            if(nameError){
                setName({...name, error:nameError});
                return;
            }else{
                api.post('account/new',{
                    name:name.value,
                    birthDate: moment(birthDate.value).format('YYYY/MM/DD'),
                    username,email,password, passwordVerify:passwordConfirm
                }).then(res=>{
                    if(res.data.code===0){
                        setPendingAccount(email).then(r =>
                            navigation.navigate('RegisterScreen4', {
                                message:res.data.data
                            })
                        )

                    }
                })
            }
        }

        return(
            <Background>
                    <BackButton goBack={() => navigation.goBack()} />
                    <Logo />
                    <Text style={{color:theme.colors.text}}>A little about you</Text>
                    <TextInput
                        label="Name"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={text => setName({ value: text, error: '' })}
                        error={!!name.error}
                        errorText={name.error}
                        autoCapitalize={"sentences"}
                        autoCompleteType="name"
                    />

                    <DatePicker
                        onChange={(e, date)=>setBirthDate({value:date, error:""})}
                        maximumDate={moment().subtract(13, 'years').toDate()}
                        value={birthDate.value}
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

export default memo(RegisterScreenStep3);
