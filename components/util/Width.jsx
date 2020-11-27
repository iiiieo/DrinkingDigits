import React from 'react';
import { Dimensions, Platform } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";


const dim = Dimensions.get("window");
let width = dim.width;
export function getWidth (){
    checkRotation()
    return width
} 
const GetNormalWidth = ()=>{
    return dim.width
}
const checkRotation = async () => {
  if (Platform.OS === "web") {
    width = dim.width;
    return;
  }
  let orient = await ScreenOrientation.getOrientationAsync();
  if (orient === 1) {
    width = dim.width;
  } else {
    width = dim.height;
  }
};
