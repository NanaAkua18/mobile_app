import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	Button,
	Alert,
	ScrollView,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import image from "./feedback.png";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmModal from "../components/ConfirmModal";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Feedback = () => {
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [error, setError] = useState("");
	const [details, setDetails] = useState({
		email: "",
		feedback: "",
		rating: 4,
	});

	const BASE_URL = "https://lost-and-found-web-51sp.onrender.com";

	const onChange = (name, value) => {
		setError("");
		setLoading(false);
		setDetails({ ...details, [name]: value });
	};

	const handleSubmit = async () => {
		if (!details.email) {
			setError("Email is required!");
			return;
		}
		if (!details.feedback) {
			setError("Feedback content is required!");
			return;
		}
		if (!details.rating) {
			setError("Star rating is required!");
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/api/feedback/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGlzdG93ZWwgQWRvbHdpbiBNb3JvIiwicmVmZXJlbmNlIjoiMDIwMDAwMDAwMCIsIl9pZCI6IjY2OTdmODdhYmYwYjEzZTdiYWFiNTk3ZiIsImlhdCI6MTcyMTkyMzM1NywiZXhwIjoxNzIyNzg3MzU3fQ.M5I4Q6Yd1IhlI6-qoY0hhb3igyPUdDIciQyxkGp22dc",
				},
				body: JSON.stringify({
					email: details.email,
					feedback: details.feedback,
					rating: details.rating,
				}),
			});

			const data = await response.json();
			console.log(data);
			if (response.status === 201) {
				setModalOpen(true);
				setDetails({ email: "", feedback: "" });
				setError("")
			} else {
				setError(data.message);
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				style={styles.container}
			>
				{modalOpen ? (
					<ConfirmModal setModalOpen={setModalOpen} />
				) : (
					<View style={styles.container}>
						<View style={styles.innerContainer}>
							<Text
								className="text-purple-950"
								style={styles.heading}
							>
								Feedback Form
							</Text>
							<Text
								className="text-gray-600 text-justify"
								style={styles.text}
							>
								Thank you for taking your time to provide
								feedback. We appreciate hearing from you and
								will review your comments carefully.
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignContent: "center",
								justifyContent: "center",
							}}
						>
							<Image
								source={image}
								resizeMode="contain"
								style={{ height: 200 }}
							/>
						</View>

						<View style={styles.form}>
							<TextInput
								style={styles.textInput}
								placeholder="Enter your email"
								onChangeText={(text) => onChange("email", text)}
								value={details.email}
							/>

							<Text style={styles.formText}>
								How would you rate us?
							</Text>
							<AirbnbRating
								count={5}
								reviews={[
									"I just hate it 😠",
									"I don't like it 😞",
									"It is Okay 😐",
									"I like it 😃",
									"I love it 😍",
								]}
								onFinishRating={(number) => {
									setDetails({ ...details, rating: number });
								}}
								defaultRating={0}
								size={40}
								selectedColor={"#9c27b0"}
								reviewColor={"#475569"}
								reviewSize={25}
								starStyle={{ margin: 10 }}
							/>

							<View style={{ paddingTop: 30 }} />
							<TextInput
								style={[styles.textInput]}
								placeholder="Share your experience or suggestions"
								multiline
								numberOfLines={5}
								onChangeText={(text) =>
									onChange("feedback", text)
								}
								value={details.feedback}
								textAlignVertical="top"
							/>
						</View>
						{error ? (
							<Text
								className="flex-row items-center text-start w-full text-gray-600"
								style={styles.errorText}
							>
								<Entypo name="dot-single" size={24} />
								{error}
							</Text>
						) : null}

						<TouchableOpacity
							style={styles.submitButton}
							onPress={handleSubmit}
							disabled={loading}
						>
							<Text style={styles.submitButtonText}>
								{loading ? "Submitting..." : "Submit"}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Feedback;

const styles = StyleSheet.create({
	scrollViewContent: {
		paddingBottom: 30,
	},
	container: {
		padding: 10,
		flexDirection: "column",
	},

	innerContainer: {
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 10,
	},

	heading: {
		fontSize: 30,
	},

	form: {
		paddingVertical: 20,
		flexDirection: "col",
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		textAlign: "center",
		paddingVertical: 10,
		paddingHorizontal: 10,
		fontSize: 16,
	},

	textInput: {
		// borderRadius: 10,
		// borderWidth: 1,
		// paddingHorizontal: 20,
		// paddingVertical: 10,
		// width: "75%",
		// overflow: "scroll",

		width: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginBottom: 16,
		fontSize: 16,
		borderWidth: 0.5,
		borderColor: "#9c27b0",
	},

	formText: {
		paddingTop: 30,
		paddingHorizontal: 10,
		paddingBottom: 5,
		fontSize: 25,
	},

	loginBtn: {
		width: "35%",
		backgroundColor: "#9c27b0",
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
	},

	loginBtnText: {
		fontSize: 18,
		color: "#F3F4F8",
	},
	errorText: {
		color: "red",
		marginBottom: 16,
	},
	submitButton: {
		padding: 10,
		backgroundColor: "#9C27B0",
		borderRadius: 20,
		alignItems: "center",
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
	},
});
