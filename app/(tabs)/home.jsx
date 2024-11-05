import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import lost from './images/lost.png'
import found from './images/found.png'
import itemsgallery from './images/itemsgallery.png'
import helpusfind from './images/helpusfind.png'
import feedback from './images/feedback.png'
import faq from './images/faq.png'
import bg from '../../assets/images/bg.png'
import reports from './images/reports.jpg'

import { Link, Redirect, SplashScreen, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import EncryptedStorage from "react-native-encrypted-storage";

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('currentUser')
        const currentUser = JSON.parse(data)
        console.log('User data retrieved: ', currentUser)
        if (!currentUser) {
          router.push('/signup')
        }
      } catch (error) {
        console.error('Error retrieving user data', error)
      }
    }

    getUserData()
  }, [])
  const routes = [
    {
      id: 1,
      name: 'Report Lost Item',
      image: lost,
      routeLink: '/report-lost-item'
    },
    {
      id: 2,
      name: 'Report Found Item',
      image: found,
      routeLink: '/report-found-item'
    },
    {
      id: 3,
      name: 'Found Items',
      image: itemsgallery,
      routeLink: '/found-items'
    },
    {
      id: 4,
      name: 'Lost Items',
      image: helpusfind,
      routeLink: '/lost-items'
    },
    {
      id: 5,
      name: 'Feedback',
      image: feedback,
      routeLink: '/feedback'
    },
    { id: 6, name: 'FAQs', image: faq, routeLink: '/faq' }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={{ flex: 1 }}>
        <StatusBar style='auto' barStyle='dark-content' />
        <View className='flex justify-center items-center'>
          {/* <Image
						className="w-56 h-40 mb-5"
						source={require("../../assets/images/logo.png")}
					></Image> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontSize: 64,
              color: 'white'
            }}
          >
            FoundIt
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* <Text className='text-gray-200 font-Ubuntu-Bold' style={styles.desc}>
            We help you find lost items and reunite them with their owners.
          </Text> */}
          {/* <View className="flex-row gap-5 justify-around">
						<Link
							className="text-purple-950 text-center p-3 bg-white w-36"
							href="/signin"
						>
							Sigin
						</Link>
						<Link
							className="text-purple-950 text-center p-3 bg-white w-36"
							href="/signup"
						>
							Sigup
						</Link>
					</View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 30,
            flexWrap: 'wrap'
          }}
        >
          {routes?.map(route => (
            <View key={route.id} style={styles.mapItem}>
              <TouchableOpacity
                style={styles.mapContainer}
                onPress={() => router.push(route.routeLink)}
              >
                <View style={styles.logoContainer}>
                  <Image
                    source={route.image}
                    resizeMode='contain'
                    style={styles.image}
                  />
                </View>
                <Text style={styles.categoryText}>{route.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View className='w-full flex items-center justify-center'>
          <TouchableOpacity
            onPress={() => {
              router.push('/reports')
            }}
            className=''
            style={styles.reportsContainer}
          >
            {/* <View style={styles.logoContainer}>
              <Image
                source={reports}
                resizeMode='contain'
                style={styles.image}
              />
            </View> */}
            <Text className='text-lg text-purple-950'>View Reports</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  mapContainer: {
    width: 140,
    padding: 24,
    height: 130,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 6
  },

  reportsContainer: {
    width: 320,
    padding: 24,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 6
  },

  logoContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },

  mapItem: {
    marginHorizontal: 20,
    marginVertical: 20
  },

  categoryText: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
    paddingHorizontal: -10,
    textAlign: 'center'
  },

  desc: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center'
  }
})

const d = {
  chatMessages: [],
  foundItemChat: {
    __v: 0,
    _id: '66ad15e77378d7cb4414df0a',
    createdAt: '2024-08-02T17:22:47.178Z',
    isClosed: false,
    item: {
      _id: '66a27ccef1c44540668328db',
      description: 'kljdhkjghkjkhljf',
      itemImages: [Array],
      name: 'ksdhfjkndf'
    },
    owner: {
      _id: '66abafe35fccaf5a17cecfce',
      name: 'Listowel ado',
      reference: '0311111111'
    },
    poster: {
      _id: '6697f87abf0b13e7baab597f',
      name: 'Listowel Adolwin Moro',
      reference: '0200000000'
    },
    updatedAt: '2024-08-02T17:22:47.178Z'
  }
}
