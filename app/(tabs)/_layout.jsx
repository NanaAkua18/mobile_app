import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const TabLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
		"Ubuntu-Medium": require("../../assets/fonts/Ubuntu-Medium.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	return (
		<Tabs screenOptions={{}}>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
					tabBarActiveTintColor: "#9c27b0",
				}}
			/>
			<Tabs.Screen
				name="found-items"
				options={{
					tabBarLabel: "Found Items",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-circle"
							size={24}
							color={color}
						/>
					),
					tabBarActiveTintColor: "#9c27b0", // Color when the tab is active
					tabBarInactiveTintColor: "#8e8e8e", // Color when the tab is inactive

					title: "Found Item Categories",
					headerTitleStyle: {
						fontSize: 28,
						fontWeight: "bold",
						color: "#9c27b0",
					},
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: "#F1F5F9",
					},
					headerTintColor: "#9c27b0",
				}}
			/>
			<Tabs.Screen
				name="lost-items"
				options={{
					headerShown: false,
					tabBarLabel: "Lost Items",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="search" size={24} color={color} />
					),
					tabBarActiveTintColor: "#9c27b0",
				}}
			/>
			{/* <Tabs.Screen
				name="found-items"
				options={{
					tabBarLabel: "Found Items",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-circle"
							size={24}
							color={color}
						/>
					),

					title: "Found Item Categories",
					headerTitleStyle: {
						fontSize: 28,
						fontWeight: "bold",
						color: "#9c27b0",
					},
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: "#F1F5F9",
					},
					headerTintColor: "#9c27b0",
				}}
			/> */}

			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-circle"
							size={24}
							color={color}
						/>
					),
					tabBarActiveTintColor: "#9c27b0", // Color when the tab is active
					tabBarInactiveTintColor: "#8e8e8e", // Color when the tab is inactive

					title: "User Profile",
					headerTitleStyle: {
						fontSize: 28,
						fontWeight: "bold",
						color: "#9c27b0",
					},
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: "#F1F5F9",
					},
					headerTintColor: "#9c27b0",
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
