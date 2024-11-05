import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from "react-native";
import LostItemCard from "../components/LostItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import PageLoader from "../components/PageLoader";

const BASE_URL = "https://lost-and-found-web-51sp.onrender.com/api";

const LostItems = () => {
	const [fetched, setFetched] = useState(false);
	const [lostItems, setItems] = useState([]);
	const [spinner, setSpinner] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`${BASE_URL}/lost-items/`, {
					headers: {
						"Content-Type": "application/json",
					},
				});
				const json = await response.json();
				setItems(json);
				setFetched(true);
			} catch (error) {
				console.log(error.message);
			} finally {
				setSpinner(false);
			}
		}
		fetchData();
	}, []);

	const renderHeader = () => (
		<Text className="text-purple-950" style={styles.header}>
			Help Us Find
		</Text>
	);

	if (spinner) {
    return <PageLoader />
  }

	return (
		<View style={styles.container}>
			{fetched && (
				<FlatList
					className="p-5"
					data={lostItems}
					ListHeaderComponent={renderHeader}
					renderItem={({ item }) => <LostItemCard item={item} />}
					keyExtractor={(item) => item._id}
				/>
			)}
			{!spinner && fetched && lostItems.length === 0 && (
				<View style={styles.emptyContainer}>
					<Text>No items to display ...</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		fontSize: 30,
		textAlign: "center",
		marginBottom: 20,
	},
	spinnerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LostItems;
