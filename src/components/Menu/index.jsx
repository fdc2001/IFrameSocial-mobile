import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from "./Styles"
import {theme} from "../../core/theme";
import Profile from "../../screens/user/Me";
import HomeScreen from "../../screens/user/HomeSreen";
import PrivateRoutes from "../../routes/PrivateRoutes";
import {useRecoilState} from "recoil";
import {ShowBar} from "../../atoms";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

export default function Menu(){
    const Tab = createBottomTabNavigator();
    const [showBar, setShowBar]=useRecoilState(ShowBar)
    return(
        <ActionSheetProvider>
            <Tab.Navigator
                animationEnabled={true}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName="heart";
                        switch (route.name){
                            case "Home":{
                                if(focused){
                                    iconName='home'
                                }else{
                                    iconName='home-outline'
                                }
                                break;
                            }
                            case "Search":{
                                if(focused){
                                    iconName='search'
                                }else{
                                    iconName='search-outline'
                                }
                                break;
                            }
                            case "Activity":{
                                if(focused){
                                    iconName='heart'
                                }else{
                                    iconName='heart-outline'
                                }
                                break;
                            }
                            case "Me":{
                                if(focused){
                                    iconName='person'
                                }else{
                                    iconName='person-outline'
                                }
                                break;
                            }
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}


                tabBarOptions={{
                    activeTintColor: theme.colors.secondary,
                    inactiveTintColor: theme.colors.text,
                    style:styles.menu,
                    showLabel: false,
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarVisible: showBar}} />
                <Tab.Screen name="Search" component={HomeScreen} />
                <Tab.Screen name="Activity" component={HomeScreen} />
                <Tab.Screen name="Me" component={Profile} />
                <Tab.Screen

                    name="Other"
                    component={PrivateRoutes}
                    options={{
                        unmountOnBlur:true,
                        tabBarVisible:true,
                        tabBarButton: () => null,
                        tabBarButtonComponent: () => null,
                        tabBarLabel: () => null,
                    }}
                />
            </Tab.Navigator>
        </ActionSheetProvider>
    )
}



function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}