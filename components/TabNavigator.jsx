import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import IconAnt from "react-native-vector-icons/AntDesign";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./home/HomeScreen";
import SettingsScreen from "./settings/SettingsScreen";
import RoomsScreen from "./rooms/RoomsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon, iconName;

            if (route.name === "Home") {
              icon = <IconAnt name={"home"} size={size} color={color}/>;
            } else if (route.name === "Rooms") {
              icon = <IconMCI name={"door"} size={size} color={color} />;
            } else if (route.name === "Settings") {
              icon = (
                <IconMCI name={"settings-outline"} size={size} color={color} />
              );
            }
            return icon;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          activeBackgroundColor: '#333',
          inactiveBackgroundColor: '#333',
          style:{backgroundColor: '#111'}
        }}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Rooms" component={RoomsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
