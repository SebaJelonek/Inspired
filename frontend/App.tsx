import "./style.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { navigationRef } from "utils/navigationRef";
import { AppLayout } from "@components/AppLayout";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppLayout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
