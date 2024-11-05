import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const FaqData = [
  {
    id: 1,
    question: "How does the Lost and Found mobile app work?",
    answer:
      "Our Lost and Found mobile app provides a platform for users to report lost items and search for their missing possessions. Users can create an account, submit details about their lost item, and browse through the found items listed on our platform. The app uses the entered details to identify potential matches and connect the owners with the finders.",
  },
  {
    id: 2,
    question: "What should I do if I have lost something?",
    answer:
      "If you have lost something, log in to your account on our mobile app and report the lost item with as many details as possible. This helps increase the chances of a successful match. We recommend regularly checking our platform for updates on items gallery that match your description.",
  },
  {
    id: 3,
    question: "Can I search for a lost item without creating an account?",
    answer:
      "No you cannot. Since this app is for KNUST students only, we need to log you in to verify you. Having an account also allows you to communicate with the finder of a potential match.",
  },
  {
    id: 4,
    question: "What should I do if I find a lost item?",
    answer:
      "If you find a lost item, please create an account on our mobile app and report the found item with accurate details. You have to upload a photo of the item to help with identification. This will help the owner find their lost item.",
  },
  {
    id: 5,
    question: "How long does it usually take to find a lost item?",
    answer:
      "The time it takes to find a lost item can vary depending on various factors such as the uniqueness of the item, the accuracy of the description, and the availability of potential matches. We encourage users to regularly check our platform and update their lost item reports with any additional details.",
  },
  {
    id: 6,
    question: "Is my personal information secure?",
    answer:
      "We take user privacy and data security seriously. We have implemented measures to safeguard your personal information. Only registered users with verified accounts have access to specific details of lost and found items.",
  },
  {
    id: 7,
    question: "What if I have further questions or need assistance?",
    answer:
      "If you have any additional questions, need assistance, or encounter any issues with our mobile app, please reach out to our support team. You can contact us through the provided channels, such as email",
  },
];

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQItem = ({ item, expanded, toggleExpand }) => {
  return (
    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
      <View style={{ marginHorizontal: 24, marginVertical: 10 }}>
        <Text
          className="text-gray-600 flex-row items-center"
          style={{
            fontWeight: "600",
            fontSize: 17,
            backgroundColor: "#F2F2F2",
            padding: 16,
            borderRadius: 16,
          }}
        >
          {item.question}
          {expanded ? (
            <Entypo name="chevron-up" size={24} />
          ) : (
            <Entypo name="chevron-down" size={24} />
          )}
        </Text>
        {expanded && (
          <Text
          className='text-gray-700 text-justify'
            style={{
              paddingHorizontal: 16,
              marginTop: -10,
              backgroundColor: "#f3f3f355",
              paddingVertical: 10,
              borderRadius: 16,
            }}
          >
            {item.answer}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Faqs = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={FaqData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FAQItem
            item={item}
            expanded={expanded === item.id}
            toggleExpand={toggleExpand}
          />
        )}
      />
    </View>
  );
};

export default Faqs;
