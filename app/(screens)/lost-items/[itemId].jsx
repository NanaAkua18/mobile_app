import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import no_image from '../../../assets/images/no_image.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PageLoader from '../../components/PageLoader'

const LostItemDetails = () => {
  const [fetched, setFetched] = useState(false)
  const [item, setItem] = useState(null)
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const params = useLocalSearchParams()
  const { itemId } = params
  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com'

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('currentUser')
        if (data) {
          const parsedUser = JSON.parse(data)
          setCurrentUser(parsedUser)
        }
      } catch (error) {
        console.error('Error retrieving user data', error)
      }
    }

    getUserData()
  }, [])

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`${BASE_URL}/api/lost-items/${itemId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setItem(data)
        console.log('Individual item: ', data)
        setFetched(true)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [itemId])

  if (!fetched) {
    return <PageLoader />
  }

  // if (item?.itemImages?.length > 0) {
  //   url = item.itemImages[0]
  // } else {
  //   url = no_image
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item && (
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              {item?.itemImages?.length <= 0 ? (
                <Image source={no_image} style={styles.image} />
              ) : (
                <Image
                  source={{ uri: item.itemImages[0] }}
                  style={styles.image}
                />
              )}
            </View>
            <View style={styles.content}>
              <Text className='text-purple-950' style={styles.title}>
                {item.name}
              </Text>
              <View style={styles.detail}>
                <View style={styles.detailRow}>
                  <Text className='text-purple-950' style={styles.detailLabel}>
                    Place Lost:{' '}
                  </Text>
                  <Text className='text-gray-700' style={styles.detailText}>
                    {item.location_lost}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text className='text-purple-950' style={styles.detailLabel}>
                    Date Lost:{' '}
                  </Text>
                  <Text className='text-gray-700' style={styles.detailText}>
                    {new Date(item.date_lost).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.description}>
                  <Text className='text-purple-950' style={styles.detailLabel}>
                    Description:{' '}
                  </Text>
                  <Text className='text-gray-700' style={styles.detailText}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text className='text-purple-950' style={styles.detailLabel}>
                    Owner Contact:{' '}
                  </Text>
                  <Text className='text-gray-700' style={styles.detailText}>
                    {item.contact}
                  </Text>
                  <Link
                    href={`tel:${item.contact}`}
                    className='text-gray-700 underline'
                    style={styles.buttonText}
                  >
                    Call
                  </Link>
                </View>
              </View>

              {item.owner != currentUser?._id && (
                <View>
                  <TouchableOpacity
                    className='bg-purple-900'
                    style={styles.button}
                    onPress={() => setOpen(true)}
                  >
                    <Link
                      href={`/lost-item-chat/${item._id}`}
                      className='text-white'
                      style={styles.buttonText}
                    >
                      Open Chat
                    </Link>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  cardWrapper: {
    marginBottom: 50
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20
  },
  imageContainer: {
    width: '100%',
    height: 400
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  content: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  detail: {
    marginBottom: 16
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  description: {
    alignItems: '',
    marginBottom: 8
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: 16,
    paddingRight: 10,
    marginTop: 5
  },
  info: {
    marginTop: 16
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 3,
    backgroundColor: '#9C27B0'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default LostItemDetails
