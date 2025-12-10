import { createNavigationContainerRef } from "@react-navigation/native";

// This creates a global reference we can use anywhere
export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// Helper to get current route name safely
export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return undefined;
}
