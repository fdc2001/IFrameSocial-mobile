import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../screens/user/Profile";
import HomeScreen from "../screens/user/HomeSreen";
import Menu from "../screens/Settings/Menu";
import SocialNetworks from "../screens/Settings/SocialNetworks";
import SocialConfig from "../screens/Settings/SocialConfig";
import DevicesList from "../screens/Settings/DevicesList";


export default function PrivateRoutes(){
    const Stack = createStackNavigator();

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return(
        <Stack.Navigator>
            <Stack.Screen name={"Feed"} options={{headerShown: false, gestureEnabled: false}} component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false}} name="Profile" component={Profile} />
            <Stack.Screen  options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/Menu" component={Menu}  />
            <Stack.Screen  options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/SocialNetworks" component={SocialNetworks}  />
            <Stack.Screen  options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/SocialConfig" component={SocialConfig}  />
            <Stack.Screen  options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/DevicesList" component={DevicesList}  />
        </Stack.Navigator>
    )
}