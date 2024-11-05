import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  RefreshControl
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import PageLoader from '../components/PageLoader'
import no_image from '../../assets/images/no_image.png'

const ProfilePage = () => {
  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com'
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('found')
  const [lostItems, setLostItems] = useState([])
  const [foundItems, setFoundItems] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [foundRes, lostRes] = await Promise.all([
        fetch(`${BASE_URL}/api/found-items-chat/profile/${currentUser?._id}`, {
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch(`${BASE_URL}/api/lost-items-chat/profile/${currentUser?._id}`, {
          headers: { 'Content-Type': 'application/json' }
        })
      ])
      const foundData = await foundRes.json()
      const lostData = await lostRes.json()

      setFoundItems(foundData.foundChats)
      setLostItems(lostData.lostChats)
    } catch (error) {
      console.error('Error fetching data', error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData().finally(() => setRefreshing(false))
  }, [currentUser])

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
    if (currentUser) {
      fetchData()
    }
  }, [currentUser])

  const renderContent = () => {
    return activeTab === 'found' ? (
      <FoundItems router={router} foundItems={foundItems} />
    ) : (
      <LostItems router={router} lostItems={lostItems} />
    )
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style='auto' barStyle='dark-content' />
      {currentUser && (
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello there, <Text style={styles.username}>{currentUser.name}</Text>
          </Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              await AsyncStorage.removeItem('currentUser')
              router.push('/signin')
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
            <MaterialIcons name='logout' size={24} color='white' />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'found' && styles.activeTab]}
          onPress={() => setActiveTab('found')}
        >
          <Text style={styles.tabText}>Found Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lost' && styles.activeTab]}
          onPress={() => setActiveTab('lost')}
        >
          <Text style={styles.tabText}>Lost Items</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </ScrollView>
  )
}

const FoundItems = ({ foundItems, router }) => {
  return (
    <View>
      {foundItems.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              router.push(`/found-item-chats/${item._id}`)
            }}
          >
            <View style={styles.imageContainer}>
              {item?.item?.itemImages.length <= 0 ? (
                <Image source={no_image} style={styles.image} />
              ) : (
                <Image
                  source={{ uri: item?.item.itemImages[0] }}
                  style={styles.image}
                />
              )}
            </View>
            <View clasname='mr-5' style={styles.contentContainer}>
              <Text style={styles.itemName}>{item.item.name}</Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item?.item?.description}
              </Text>
              <Text style={styles.chatPreview} numberOfLines={1}>
                {item?.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
      {foundItems.length === 0 && <Text>No found items to display</Text>}
    </View>
  )
}

const LostItems = ({ lostItems, router }) => {
  return (
    <View>
      {lostItems.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              router.push(`/lost-item-chats/${item._id}`)
            }}
          >
            <View style={styles.imageContainer}>
              {item?.item?.itemImages.length <= 0 ? (
                <Image source={no_image} style={styles.image} />
              ) : (
                <Image
                  source={{ uri: item?.item.itemImages[0] }}
                  style={styles.image}
                />
              )}
            </View>
            <View clasname='mr-5' style={styles.contentContainer}>
              <Text style={styles.itemName}>{item.item.name}</Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item?.item?.description}
              </Text>
              <Text style={styles.chatPreview} numberOfLines={1}>
                {item?.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
      {lostItems.length === 0 && <Text>No lost items to display</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  greeting: {
    fontSize: 18,
    color: '#333'
  },
  username: {
    fontWeight: 'bold',
    color: 'purple'
  },
  logoutButton: {
    backgroundColor: 'purple',
    padding: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'purple'
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple'
  },
  tabText: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 18
  },
  content: {
    padding: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  imageContainer: {
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    width: 80,
    height: 80
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginRight: 20
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  chatPreview: {
    fontSize: 12,
    color: '#888'
  }
})

export default ProfilePage
