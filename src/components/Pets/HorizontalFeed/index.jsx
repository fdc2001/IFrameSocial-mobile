import React, {memo} from "react";
import { Backpack } from 'react-kawaii/lib/native/'
import Pet from "../Pet";
import {ImageBackground, View} from "react-native";
import {Card} from "react-native-paper";
import {styles} from "./styles";
import {baseURL} from "../../../core/api";

const HorizontalFeed = ({ data }) => {
  return (
          <View style={styles.container}>
            <ImageBackground style={styles.image} imageStyle={styles.imageStyle}
                             source={{uri:baseURL+"pet/background/"+data.details.style.id}}>
              <Pet pet={data.details.type.type} size={80} color={data.details.style.color} mood={data.current_mood}/>
            </ImageBackground>
          </View>
  );
};
export default memo(HorizontalFeed);