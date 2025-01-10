import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../src/pages/Homepage/Home";
import Message from "../src/pages/Message/Message";
import NewPost from "../src/pages/NewPost/NewPost";
import Tasklist from "../src/pages/TaskList/Tasklist";
import Profile from "../src/pages/Profile/Profile";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView, StatusBar } from "react-native";
import { useEffect } from "react";
import Splash from "../src/pages/Login/Splash";
import Login from "../src/pages/Login/Login";
import SignUp from "../src/pages/Login/SignUp";
import WelcomeBack from "../src/pages/WelcomeBack/WelcomeBack";
import NewPostShare from "../src/pages/NewPost/NewPostShare";
import { GlobalDataProvider } from "../src/utils/globalfetches";
import { UserProvider } from "../src/utils/authentication";
import Settings from "../src/pages/Settings/Settings";
import Account from "../src/pages/Settings/Account";
import ResetPassword from "../src/pages/Settings/ResetPassword";
import Support from "../src/pages/Settings/Support";
import CameraScreen from "../src/pages/NewPost/CameraScreen";
import PostDetails from "../src/pages/Profile/PostDetails";
import MessageTo from "../src/pages/Message/MessageTo";
import { colors } from "../src/utils/design";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ color, size }) => {
					switch (route.name) {
						case "Home":
							return (
								<Feather
									name="home"
									size={size}
									color={color}
								/>
							);
						case "Message":
							return (
								<Feather
									name="message-circle"
									size={size}
									color={color}
								/>
							);
						case "NewPost":
							return (
								<Feather
									name="plus"
									size={size}
									color={color}
								/>
							);
						case "Tasklist":
							return (
								<Feather
									name="list"
									size={size}
									color={color}
								/>
							);
						case "Profile":
							return (
								<Feather
									name="user"
									size={size}
									color={color}
								/>
							);
					}
				},
				tabBarLabel: () => null,
			})}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Message" component={Message} />
			<Tab.Screen name="NewPost" component={NewPost} />
			<Tab.Screen name="Tasklist" component={Tasklist} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

export default function App() {
	useEffect(() => {
		StatusBar.setBackgroundColor(colors.background.default.default());
		StatusBar.setBarStyle("dark-content");
	}, []);

	return (
		<UserProvider>
			<GlobalDataProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<SafeAreaView style={{ flex: 1 }}>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
								gestureEnabled: true,
								headerStyle: { backgroundColor: "red" },
							}}
						>
							<Stack.Screen name="Login" component={Login} />
							<Stack.Screen name="Splash" component={Splash} />
							<Stack.Screen name="NavBar" component={NavBar} />
							<Stack.Screen name="Home" component={Home} />
							<Tab.Screen name="NewPost" component={NewPost} />
							<Tab.Screen
								name="NewPostShare"
								component={NewPostShare}
							/>
							<Stack.Screen
								name="WelcomeBack"
								component={WelcomeBack}
							/>
							<Stack.Screen name="SignUp" component={SignUp} />
							<Stack.Screen
								name="Settings"
								component={Settings}
							/>
							<Stack.Screen name="Account" component={Account} />
							<Stack.Screen
								name="ResetPassword"
								component={ResetPassword}
							/>
							<Stack.Screen name="Support" component={Support} />
							<Stack.Screen
								name="CameraScreen"
								component={CameraScreen}
							/>
							<Stack.Screen
								name="PostDetails"
								component={PostDetails}
							/>
                            <Tab.Screen name="MessageTo" component={MessageTo} />
						</Stack.Navigator>
					</SafeAreaView>
				</GestureHandlerRootView>
			</GlobalDataProvider>
		</UserProvider>
	);
}
