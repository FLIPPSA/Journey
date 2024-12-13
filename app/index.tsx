import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../src/pages/Home";
import Chat from "../src/pages/Chat";
import NewPost from "../src/pages/NewPost";
import Tasklist from "../src/pages/Tasklist";
import Profile from "../src/pages/Profile";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StatusBar } from "react-native";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "Home") {
                        return <Feather name="home" size={size} color={color} />;
                    } else if (route.name === "Chat") {
                        return <MaterialIcons name="groups" size={size} color={color} />;
                    } else if (route.name === "NewPost") {
                        return <MaterialCommunityIcons name="treasure-chest" size={size} color={color} />;
                    } else if (route.name === "Tasklist") {
                        return <Feather name="edit" size={size} color={color} />;
                    } else if (route.name === "Profile") {
                        return <Feather name="user" size={size} color={color} />;
                    }
                },
                tabBarLabel: () => null,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="NewPost" component={NewPost} />
            <Tab.Screen name="Tasklist" component={Tasklist} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default function App() {
    useEffect(() => {
        StatusBar.setBarStyle("light-content");
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true,
                        headerStyle: { backgroundColor: 'red' },
                    }}
                >
                    <Stack.Screen name="NavBar" component={NavBar} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
