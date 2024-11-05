import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import no_image from '../../../assets/images/no_image.png'
import { Ionicons } from '@expo/vector-icons'
import PageLoader from '../../components/PageLoader'

const LostItemChatPage = () => {
  const params = useLocalSearchParams()
  const { lostItemId } = params
  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com'

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [chatId, setChatId] = useState(null)
  const [item, setItem] = useState({})
  const [fetched, setFetched] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/lost-items/${lostItemId}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        setItem(data)
        setFetched(true)
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchData = async user => {
      setFetched(false)
      try {
        const response = await fetch(`${BASE_URL}/api/lost-items-chat/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user?.accessToken
          },
          body: JSON.stringify({
            founderId: user._id,
            itemId: lostItemId
          })
        })
        const data = await response.json()
        console.log('Fetched data: ', data)
        setChatId(data.lostItemChat._id)
        setChatMessages(data.chatMessages)
        setFetched(true)
      } catch (error) {
        console.log(error)
      }
    }

    const getCurrentUser = async () => {
      try {
        const data = await AsyncStorage.getItem('currentUser')
        const user = JSON.parse(data)
        setCurrentUser(user)
        if (user) {
          await getItem()
          await fetchData(user) // Call fetchData with the user
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCurrentUser()
  }, [lostItemId])

  // console.log("Item: ", item);
  // console.log("User: ", currentUser);

  const sendMessage = async () => {
    if (!message) {
      Alert.alert("Can't send empty message!")
      return
    }

    setLoading(true)

    const payload = {
      message,
      chatId,
      senderId: currentUser?._id
    }
    console.log('Payload: ', payload)
    const res = await fetch(
      `${BASE_URL}/api/lost-items-chat-message/new-message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + currentUser?.accessToken
        },

        body: JSON.stringify(payload)
      }
    )
    const data = await res.json()

    console.log('Response....... ', data)
    if (res.status === 201) {
      setChatMessages([data.newMessage, ...chatMessages])
      setMessage('')
    }
  }

  const renderMessage = ({ item }) => {
    const date = new Date(item.createdAt)
    const dayOfWeek = date.toLocaleDateString([], { weekday: 'long' })

    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const formattedDateTime = `${dayOfWeek}, ${formattedTime}`
    return (
      <View className='mb-5'>
        <View
          style={[
            styles.messageBubble,
            item.sender.reference === currentUser?.reference
              ? styles.ownerMessage
              : styles.posterMessage
          ]}
        >
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
        <Text style={styles.timestamp}>{formattedDateTime}</Text>
      </View>
    )
  }

  if (!fetched) {
    return <PageLoader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemPreview}>
        <Image
          source={
            item?.itemImages?.length > 0
              ? { uri: item.itemImages[0] }
              : no_image
          }
          style={styles.itemImage}
        />

        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
      {chatMessages.length === 0 ? (
        <Text className='px-2 text-gray-600 italic'>
          This is the start of your conversation. This chat is meant to help
          facilate the item collection process
        </Text>
      ) : null}
      <FlatList
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        style={styles.chatList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder='Type a message...'
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>
            <Ionicons name='send' size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  itemPreview: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  itemInfo: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 14,
    color: '#888'
  },
  chatList: {
    flex: 1,
    padding: 10
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 0
  },
  ownerMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6'
  },
  posterMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff'
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 1,
    alignSelf: 'flex-end'
  }
})

export default LostItemChatPage