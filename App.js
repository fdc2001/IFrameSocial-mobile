import React from 'react';
import 'react-native-gesture-handler';
import {RecoilRoot} from "recoil";
import Base from "./Base";

export default function App() {


  return (
      <RecoilRoot>
          <Base/>
      </RecoilRoot>

  );
}


