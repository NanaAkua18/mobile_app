import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { Link, useRouter } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const handleLogin = async () => {
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
        "https://lost-and-found-web-51sp.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference, password }),
        }
      );
      const data = await response.json();
      console.log("Login data:.....", data);
      if (response.status === 200) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(data.user));
        // await EncryptedStorage.setItem(
        // 	"currentUser",
        // 	JSON.stringify(data)
        // );
        router.push("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error " + error.message);
      console.log("Error......", error);
      Alert.alert("Error", "Could not sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <ImageBackground
    // 	source="https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg"
    // 	style={styles.backgroundImage}
    // >
    <View className="bg-slate-200" style={styles.container}>
      <Image
        className="w-72 h-72 mb-5"
        source={require("../../assets/images/lost_and_found_box.png")}
      ></Image>
      <Text className="text-purple-950" style={styles.title}>
        Welcome Back
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Reference Number"
        value={reference}
        onChangeText={(text) => {
          setReference(text);
          setLoading(false);
          setError("");
        }}
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
      <CustomButton disabled={loading} title="Login" onPress={handleLogin} />
      <View style={styles.singupText} className="text-start flex-row gap-2">
        <Text className="text-gray-600">Don't have an account?</Text>
        <Link className="text-purple-950" href="/signup">
          Register
        </Link>
      </View>
    </View>
    //</ImageBackground>
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

// // app/signin.jsx
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function signin() {
// 	const [reference, setReference] = useState("");
// 	const [password, setPassword] = useState("");
// 	const router = useRouter();

// 	const handleSignIn = async () => {
// 		try {
// 			const response = await axios.post(
// 				"https://lost-and-found-web-51sp.onrender.com/api/auth/signin",
// 				{ reference, password }
// 			);
// 			console.log(response.data);
// 			if (response.data.token) {
// 				await AsyncStorage.setItem("token", response.data.token);
// 				router.push("/");
// 			}
// 		} catch (error) {
// 			Alert.alert("Error", "Invalid credentials");
// 		}
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>Sign In</Text>
// 			<TextInput
// 				style={styles.input}
// 				placeholder="reference"
// 				value={reference}
// 				onChangeText={setReference}
// 				keyboardType="reference-address"
// 			/>
// 			<TextInput
// 				style={styles.input}
// 				placeholder="Password"
// 				value={password}
// 				onChangeText={setPassword}
// 				secureTextEntry
// 			/>
// 			<Button title="Sign In" onPress={handleSignIn} />
// 			<Button title="Sign Up" onPress={() => router.push("/signup")} />
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
