import {DarkTheme, DefaultTheme} from 'react-native-paper';
import {Appearance} from "react-native";

const themeFn =()=>{
  if(Appearance.getColorScheme()==="dark") {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: '#b8b8b8',
        secondary: '#5b9279',
        error: '#f13a59',
        background:'#363333'
      }
    }
  }else {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#12130f',
        secondary: '#5b9279',
        error: '#f13a59',
      }
    }
  }
}


export const theme=themeFn()