import React, {memo} from "react";
import { Backpack } from 'react-kawaii/lib/native/'
import Pet from "../Pet";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-paper";
import {styles} from "./styles";
import {baseURL} from "../../../core/api";
import {Center, VStack} from "native-base";
import {theme} from "../../../core/theme";

const VerticalFeed = ({ item:data, navigation }) => {
  return (
      <TouchableOpacity onPress={()=>navigation.navigate('Pets/Details', {petId:data.id})}>
          <View style={styles.frame}>
              <VStack space={1} alignItems="center">
                  <ImageBackground style={styles.image} imageStyle={styles.imageStyle}
                                   source={{uri:baseURL+"pet/background/"+data.details.style.id}}>
                      <Pet pet={data.details.type.type} size={80} color={data.details.style.color} mood={data.current_mood}/>
                  </ImageBackground>
                  <Center

                      _text={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          color: theme.colors.text
                      }}>
                      {data.name}
                  </Center>
              </VStack>
          </View>
      </TouchableOpacity>
  );
};
export default memo(VerticalFeed);