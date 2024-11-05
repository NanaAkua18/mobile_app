import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, disabled }) => {
	return (
		<TouchableOpacity
			className={`${disabled ? "bg-gray-300" : "bg-purple-950"}`}
			style={styles.button}
			onPress={onPress}
			disabled={disabled}
		>
			<Text className="text-white" style={styles.buttonText}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		elevation: 3,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default CustomButton;
