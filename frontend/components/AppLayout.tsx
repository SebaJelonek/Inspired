import { View } from "react-native";
import { Home } from "@screens/Home";
import { Activities } from "@screens/Activities";
import { Search } from "@screens/Search";
import { Favorite } from "@screens/Favorite";
import { Learn } from "@screens/Learn";
import BottomNavbar from "@components/BottomNavbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// 1. Create a layout that holds both the Stack AND the Navbar
export const AppLayout: React.FC = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      {/* The Screens (They will animate behind the navbar) */}
      <Stack.Navigator
        id={undefined}
        screenOptions={{ headerShown: false, animation: "default" }} // You can turn animations back on now!
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Learn" component={Learn} />
        {/* Add other screens here */}
      </Stack.Navigator>

      {/* The Persistent Navbar (Sits on top of everything) */}
      <BottomNavbar />
    </View>
  );
};
