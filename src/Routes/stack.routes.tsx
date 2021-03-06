import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../Screens/Home";
import { CarDetails } from "../Screens/CarDetails";
import { Scheduling } from "../Screens/Scheduling";
import { SchedulingDetails } from "../Screens/SchedulingDetails";
import { SchedulingComplete } from "../Screens/SchedulingComplete";
import { MyCars } from "../Screens/MyCars";
import { Splash } from "../Screens/Splash";
import { SignIn } from "../Screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
