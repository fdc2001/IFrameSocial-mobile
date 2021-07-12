import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/auth/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreenStep1 from "../screens/auth/RegisterScreen/Step1";
import RegisterScreenStep2 from "../screens/auth/RegisterScreen/Step2";
import RegisterScreenStep3 from "../screens/auth/RegisterScreen/Step3";
import RegisterScreenStep4 from "../screens/auth/RegisterScreen/Step4";

export default function Routes(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="RegisterScreen" component={RegisterScreenStep1} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="RegisterScreen2" component={RegisterScreenStep2} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="RegisterScreen3" component={RegisterScreenStep3} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="RegisterScreen4" component={RegisterScreenStep4} />
        </Stack.Navigator>
    )
}