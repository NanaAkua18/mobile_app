import React from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import categories from "../data/categories";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FoundItems = () => {
	const navigation = useNavigation();
	const router = useRouter();

	const navigateToCategory = (category) => {
		router.push({
			pathname: `category-items/${category.val}`,
		});
	};

	return (
		<ScrollView className="flex-1 bg-slate-200">
			<View className="py-8 sm:bg-inherit min-h-screen">
				<View className="w-full mx-auto px-2">
					<View className="flex-row flex-wrap  justify-around">
						{categories.map((category) => (
							<TouchableOpacity
								style={styles.category}
								key={category.val}
								className="group flex flex-col items-center justify-between text-center transition-transform transform hover:scale-105"
								onPress={() => navigateToCategory(category)}
							>
								<View className="relative">
									<Image
										source={{ uri: category.imageUrl }}
										alt={category.name}
										className="h-24 w-24 md:w-32 md:h-32 rounded-full object-center object-cover shadow-lg transition-opacity duration-300 hover:opacity-90"
									/>
									<View className="absolute bottom-0 right-0 bg-purple-800 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
										<Text className="text-white">{category.quantity}</Text>
									</View>
								</View>
								<View className="mt-2 font-bold">
									<Text className="text-md md:text-lg text-purple-800">
										{category.name}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		color: "#3r3433",
	},
	category: {
		marginTop: 60,
	},
});

export default FoundItems;
