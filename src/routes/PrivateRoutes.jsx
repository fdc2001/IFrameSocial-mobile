import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../screens/user/Profile";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import Menu from "../components/Menu";
import HomeScreen from "../screens/user/HomeSreen";


export default function PrivateRoutes(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name={"Feed"} options={{headerShown: false, gestureEnabled: false}} component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false}} name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}