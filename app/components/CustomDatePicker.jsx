import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomDatePicker() {
	const [showDatepicker, setShowDatePicker] = useState(false);
	const [date, setDate] = useState(false);

	const onDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate !== undefined) {
			setDate(selectedDate);
		}
	};

	const showPicker = () => {
		setShowDatePicker(true);
	};

	return (
		<SafeAreaView>
			<View style={{ padding: 20 }}>
				<Button onPress={showPicker} title="Pick date" />
				<Text>Selected: {date.toLocaleString()}</Text>
				{showDatepicker && (
					<DateTimePicker
						value={date}
						mode="date"
						display="default"
						is24Hour={true}
						onChange={onDateChange}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
