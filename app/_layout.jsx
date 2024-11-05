import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
	useFonts({
		ubuntu: require("../assets/fonts/Ubuntu-Light.ttf"),
		"ubuntu-medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
		"ubuntu-bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
	});
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="(screens)" options={{ headerShown: false }} />
		</Stack>
	);
}
