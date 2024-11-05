// import React, { useEffect, useState } from "react";
// import {
// 	View,
// 	Text,
// 	Image,
// 	ScrollView,
// 	ActivityIndicator,
// 	StyleSheet,
// 	Button,
// 	TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import no_image from "../../../assets/images/no_image.png";

// const ItemDetails = () => {
// 	const [fetched, setFetched] = useState(false);
// 	const [item, setItem] = useState(null);

// 	const params = useLocalSearchParams();
// 	const { itemId } = params;
// 	const BASE_URL = "https://lost-and-found-web-51sp.onrender.com";

// 	useEffect(() => {
// 		// async function fetchData() {
// 		// 	try {
// 		// 		const response = await fetch(
// 		// 			`${BASE_URL}/api/found-items/${itemId}`,
// 		// 			{
// 		// 				headers: {
// 		// 					"Content-Type": "application/json",
// 		// 				},
// 		// 			}
// 		// 		);
// 		// 		const data = await response.json();
// 		// 		setItem(data);
// 		// 		setFetched(true);
// 		// 	} catch (error) {
// 		// 		console.log(error.message);
// 		// 	}
// 		// }
// 		// fetchData();
// 	}, [itemId]);

// 	if (!fetched) {
// 		return (
// 			<View style={styles.spinnerContainer}>
// 				<ActivityIndicator size="large" color="#007bff" />
// 			</View>
// 		);
// 	}

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>

// 		</ScrollView>
// 	);
// };

// export default ItemDetails;

import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import no_image from "../../../assets/images/no_image.png";

const ChatPage = () => {
	const params = useLocalSearchParams();
	const { itemId } = params;
	const BASE_URL = "https://lost-and-found-web-51sp.onrender.com";

	const [message, setMessage] = useState("");
	const [item, setItem] = useState({});
	const [fetched, setFetched] = useState(false);
	const [chatMessages, setChatMessages] = useState([
		{
			id: "1",
			sender: "poster",
			text: "Hi, is this item still available?",
		},
		{ id: "2", sender: "owner", text: "Yes, it is! Are you interested?" },
		{
			id: "3",
			sender: "poster",
			text: "Definitely! Can you tell me more about its condition?",
		},
		{
			id: "4",
			sender: "owner",
			text: "It's in great condition, barely used. No scratches or dents.",
		},
		{
			id: "5",
			sender: "poster",
			text: "That sounds perfect. Would you be willing to negotiate on the price?",
		},
		{
			id: "6",
			sender: "owner",
			text: "I might be open to a reasonable offer. What did you have in mind?",
		},
		{
			id: "7",
			sender: "owner",
			text: "I might be open to a reasonable offer. What did you have in mind?",
		},
		{
			id: "30",
			sender: "poster",
			text: "Definitely! Can you tell me more about its condition?",
		},
		{
			id: "8",
			sender: "owner",
			text: "I might be open to a reasonable offer. What did you have in mind?",
		},
		{
			id: "9",
			sender: "owner",
			text: "I might be open to a reasonable offer. What did you have in mind?",
		},
		{
			id: "13",
			sender: "poster",
			text: "Definitely! Can you tell me more about its condition?",
		},
		{
			id: "10",
			sender: "owner",
			text: "I might not be open to a reasonable offer. What did you have in mind?",
		},
	]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(
					`${BASE_URL}/api/found-items/${itemId}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();
				console.log("Chat item: ", data);
				setItem(data);
				setFetched(true);
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchData();
	}, [itemId]);

	const renderMessage = ({ item }) => (
		<View
			style={[
				styles.messageBubble,
				item.sender === "owner"
					? styles.ownerMessage
					: styles.posterMessage,
			]}
		>
			<Text style={styles.messageText}>{item.text}</Text>
		</View>
	);

	const sendMessage = () => {
		if (message.trim()) {
			setChatMessages([
				...chatMessages,
				{
					id: String(chatMessages.length + 1),
					sender: "poster",
					text: message,
				},
			]);
			setMessage("");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.itemPreview}>
				<Image source={no_image} style={styles.itemImage} />
				<View style={styles.itemInfo}>
					<Text style={styles.itemName}>Vintage Chair</Text>
					<Text style={styles.itemPrice}>$150</Text>
				</View>
			</View>
			<FlatList
				data={chatMessages}
				renderItem={renderMessage}
				keyExtractor={(item) => item.id}
				style={styles.chatList}
				inverted
			/>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={message}
					onChangeText={setMessage}
					placeholder="Type a message..."
				/>
				<TouchableOpacity
					style={styles.sendButton}
					onPress={sendMessage}
				>
					<Text style={styles.sendButtonText}>Send</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	itemPreview: {
		flexDirection: "row",
		padding: 10,
		marginBottom: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	itemImage: {
		width: 50,
		height: 50,
		borderRadius: 5,
	},
	itemInfo: {
		marginLeft: 10,
		justifyContent: "center",
	},
	itemName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	itemPrice: {
		fontSize: 14,
		color: "#888",
	},
	chatList: {
		flex: 1,
		padding: 10,
	},
	messageBubble: {
		maxWidth: "80%",
		padding: 10,
		borderRadius: 15,
		marginBottom: 10,
	},
	ownerMessage: {
		alignSelf: "flex-end",
		backgroundColor: "#dcf8c6",
	},
	posterMessage: {
		alignSelf: "flex-start",
		backgroundColor: "#fff",
	},
	messageText: {
		fontSize: 16,
	},
	inputContainer: {
		flexDirection: "row",
		padding: 10,
		backgroundColor: "#fff",
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
		fontSize: 16,
	},
	sendButton: {
		marginLeft: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	sendButtonText: {
		color: "#007AFF",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default ChatPage;
