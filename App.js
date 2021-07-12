import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {RecoilRoot, useRecoilState} from "recoil";
import Base from "./Base";

export default function App() {


  return (
      <RecoilRoot>
          <Base/>
      </RecoilRoot>

  );
}


