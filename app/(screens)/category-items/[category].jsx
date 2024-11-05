import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import no_image from '../../../assets/images/no_image.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PageLoader from '../../components/PageLoader'

export default function Category () {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentItemId, setCurrentItemId] = useState(false)

  const router = useRouter()
  const params = useLocalSearchParams()
  const { category } = params
  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com/api'

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
      setLoading(true)
      try {
        const response = await fetch(
          `${BASE_URL}/found-items/category/${category}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        console.log('Fetched data: ', data)
        setItems(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (loading) {
    return <PageLoader />
  }

  const cats = {
    student_card: 'Student ID Cards',
    atm_card: 'ATM Card',
    drivers_license: "Driver's License",
    e_zwich: 'E Zwich Card',
    other_card: 'Other Cards',
    notebook: 'Notebook',
    book: 'Books',
    novel: 'Novel',
    other_books: 'Any Other Book',
    phone: 'Mobile Phones',
    laptop: 'Laptops',
    smart_watch: 'Smart Watch',
    charger: 'Chargers',
    other_electronic_device: 'Electronic Devices',
    bottle: 'Bottles',
    wallet: 'Wallet',
    bag: 'Bags',
    key: 'Keys',
    money: 'Money',
    other: 'Other Items'
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cats[category]}</Text>
      <View style={styles.itemsContainer}>
        {items.length > 0 ? (
          <View style={styles.grid}>
            {items.map(item => (
              <View style={styles.cardContainer} key={item._id}>
                <View style={styles.card}>
                  {item.itemImages.length <= 0 ? (
                    <Image source={no_image} style={styles.image} />
                  ) : (
                    <Image
                      source={{ uri: item.itemImages[0] }}
                      style={styles.image}
                    />
                  )}
                  <View style={styles.overlay}>
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>
                        {new Date(item.date_found).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push(`/found-items/${item._id}`)}
                      >
                        <Text style={styles.buttonText}>See Details</Text>
                      </TouchableOpacity>
                      {item.poster != currentUser?._id && (
                        <TouchableOpacity
                          onPress={() =>
                            router.push(`/found-item-chat/${item._id}`)
                          }
                          style={styles.button}
                        >
                          <Text style={styles.buttonText}>Open Chat</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text>No items found</Text>
        )}
      </View>
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
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  itemsContainer: {
    paddingBottom: 150
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cardContainer: {
    width: '48%',
    marginBottom: 20
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  image: {
    width: '100%',
    height: 250
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'space-between',
    padding: 10
  },
  dateContainer: {
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
    borderRadius: 5,
    padding: 5
  },
  dateText: {
    color: '#fff',
    fontSize: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'rgba(128, 0, 128, 0.7);',
    borderRadius: 5,
    padding: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 12
  }
})

;[
  {
    __v: 0,
    _id: '66a28672f1c4454066832918',
    category: 'other',
    createdAt: '2024-07-25T17:08:02.019Z',
    date_found: '2024-07-24T17:06:00.000Z',
    description: 'Yellow bag',
    isFound: false,
    isIdentifiable: true,
    itemID: '646172',
    itemImages: [
      'https://res.cloudinary.com/dgn3nvrp9/image/upload/v1721927280/lost_and_found/g7mlyigptfd8kbon6ses.jpg',
      'https://res.cloudinary.com/dgn3nvrp9/image/upload/v1721927279/lost_and_found/mwu8i5hkdkxnahgrcovw.jpg'
    ],
    location_found: 'FF1',
    name: 'Bag',
    ownerName: 'Listo',
    poster: '6697f87abf0b13e7baab597f',
    subcategory: 'other',
    updatedAt: '2024-07-25T17:08:02.019Z'
  },
  {
    __v: 0,
    _id: '66c081aa695e7d47ea7c73d4',
    category: 'other',
    createdAt: '2024-08-17T10:55:38.847Z',
    date_found: '2024-08-14T10:54:00.000Z',
    description: 'Found with a girl named Diana',
    isFound: false,
    isIdentifiable: false,
    itemID: '',
    itemImages: [
      'https://res.cloudinary.com/dgn3nvrp9/image/upload/v1723892136/lost_and_found/z8wzwblohrbb28gi4yvs.jpg'
    ],
    location_found: 'Engineering gate',
    name: 'CS boy',
    ownerName: '',
    poster: '66c07b32695e7d47ea7c73c6',
    subcategory: 'other',
    updatedAt: '2024-08-17T10:55:38.847Z'
  },
  {
    __v: 0,
    _id: '66c0e3d2266c7944763aba3c',
    category: 'other',
    createdAt: '2024-08-17T17:54:26.894Z',
    date_found: '2024-08-15T17:53:00.000Z',
    description: 'Slides found',
    isFound: false,
    isIdentifiable: false,
    itemID: '',
    itemImages: [
      'https://res.cloudinary.com/dgn3nvrp9/image/upload/v1723917264/lost_and_found/yr2m5cvxg5sm4ixs27hb.jpg'
    ],
    location_found: 'White house ',
    name: 'Slides',
    ownerName: '',
    poster: '66c089ba695e7d47ea7c73f4',
    subcategory: 'other',
    updatedAt: '2024-08-17T17:54:26.894Z'
  }
]
