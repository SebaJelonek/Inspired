import "./style.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { navigationRef } from "utils/navigationRef";
import { AppLayout } from "@components/AppLayout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppLayout />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
