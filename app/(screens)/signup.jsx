import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign, Entypo } from "@expo/vector-icons";

const LoginPage = () => {
  const router = useRouter();

  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const handleSignup = async () => {
    if (!name) {
      setError("Name is required!");
      return;
    }
    if (!reference) {
      setError("Reference Number is required!");
      return;
    }
    if (!password) {
      setError("Password is required!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://lost-and-found-web-51sp.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, reference, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        //await AsyncStorage.setItem("token", data.token);
        router.push("/signin");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Error " + error.message);
      console.log("Error......", error);
      Alert.alert("Error", "Could not sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    //<ScrollView>
    <View className="bg-slate-200" style={styles.container}>
      <Image
        className="w-64 h-64 mb-5"
        source={require("../../assets/images/lost_and_found_box.png")}
      ></Image>
      <Text className="text-purple-950" style={styles.title}>
        Welcome To FoundIt
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setLoading(false);
          setError("");
        }}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Reference Number"
        value={reference}
        onChangeText={setReference}
        keyboardType="default"
        autoCapitalize="none"
      />
      <View
        className="flex flex-row items-center justify-between"
        style={styles.passwordInputContainer}
      >
        <TextInput
          className="w-10/12 h-full"
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setLoading(false);
            setError("");
          }}
          secureTextEntry={securePassword}
        />
        <AntDesign
          onPress={() => {
            setSecurePassword(!securePassword);
          }}
          name="eyeo"
          size={24}
          color="black"
        />
      </View>
      {error && (
        <Text className="flex-row items-center text-start w-full text-gray-600">
          <Entypo name="dot-single" size={24} />
          <Text>{error}</Text>
        </Text>
      )}
      <CustomButton
        disabled={loading}
        title="Register"
        onPress={handleSignup}
      />
      <View style={styles.singupText} className="text-start flex-row gap-2">
        <Text className="text-gray-600">Already have an account?</Text>
        <Link className="text-purple-950" href="/signin">
          Login
        </Link>
      </View>
    </View>
    //</ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#9c27b0",
  },
  passwordInputContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#9c27b0",
  },
  singupText: {
    alignItems: "left",
    marginTop: 5,
  },
});

export default LoginPage;

// // app/signup.jsx
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function signup() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const router = useRouter();

// 	const handleSignUp = async () => {
// 		try {
// 			const response = await axios.post(
// 				"https://lost-and-found-web-51sp.onrender.com/api/auth/signup",
// 				{ email, password }
// 			);
// 			if (response.data.token) {
// 				await AsyncStorage.setItem("token", response.data.token);
// 				router.push("/");
// 			}
// 		} catch (error) {
// 			Alert.alert("Error", "Could not sign up");
// 		}
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>Sign Up</Text>
// 			<TextInput
// 				style={styles.input}
// 				placeholder="Email"
// 				value={email}
// 				onChangeText={setEmail}
// 				keyboardType="email-address"
// 			/>
// 			<TextInput
// 				style={styles.input}
// 				placeholder="Password"
// 				value={password}
// 				onChangeText={setPassword}
// 				secureTextEntry
// 			/>
// 			<Button title="Sign Up" onPress={handleSignUp} />
// 			<Button title="Sign In" onPress={() => router.push("/signin")} />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		padding: 16,
// 	},
// 	title: {
// 		fontSize: 24,
// 		marginBottom: 16,
// 		textAlign: "center",
// 	},
// 	input: {
// 		height: 40,
// 		borderColor: "gray",
// 		borderWidth: 1,
// 		marginBottom: 12,
// 		paddingHorizontal: 8,
// 	},
// });
