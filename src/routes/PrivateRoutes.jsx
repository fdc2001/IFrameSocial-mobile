import React from "react";
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import Profile from "../screens/user/Profile";
import HomeScreen from "../screens/user/HomeSreen";
import Menu from "../screens/Settings/Menu";
import SocialNetworks from "../screens/Settings/SocialNetworks";
import SocialConfig from "../screens/Settings/SocialConfig";
import DevicesList from "../screens/Settings/DevicesList";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreenStep1 from "../screens/auth/RegisterScreen/Step1";
import RegisterScreenStep2 from "../screens/auth/RegisterScreen/Step2";
import RegisterScreenStep3 from "../screens/auth/RegisterScreen/Step3";
import RegisterScreenStep4 from "../screens/auth/RegisterScreen/Step4";
import ListPets from "../screens/Pets/ListPets";
import PetDetails from "../screens/Pets/PetDetails";


export default function PrivateRoutes(){
    const Stack = createStackNavigator();

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return(
        <Stack.Navigator >
            <Stack.Screen  options={{ headerShown: false, gestureEnabled: false }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="RegisterScreen" component={RegisterScreenStep1} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="RegisterScreen2" component={RegisterScreenStep2} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true }} name="RegisterScreen3" component={RegisterScreenStep3} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="RegisterScreen4" component={RegisterScreenStep4} />


            <Stack.Screen name={"Feed"} options={{headerShown: false, gestureEnabled: false}} component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false}} name="Profile" component={Profile} />

            {/*Pet*/}
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name="Pets/List" component={ListPets} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name="Pets/Details" component={PetDetails} />

            {/*Settings*/}
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/Menu" component={Menu}  />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/SocialNetworks" component={SocialNetworks}  />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/SocialConfig" component={SocialConfig}  />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: true, cardStyleInterpolator: forFade}} name="Settings/DevicesList" component={DevicesList}  />
        </Stack.Navigator>
    )
}