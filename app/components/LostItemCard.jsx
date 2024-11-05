import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from 'react-native'

const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com/api'

const LostItemCard = ({ item }) => {
  const noImage = require('../../assets/images/lost-items/no-image.png')
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
    other: 'Other Items'
  }

  const router = useRouter()

  return (
    <View style={styles.card}>
      <Image
        onPress={() => {
          console.log('Image pressseddddd')
          router.push(`/lost-items/${item._id}`)
        }}
        style={styles.image}
        source={
          item.itemImages.length > 0 ? { uri: item.itemImages[0] } : noImage
        }
      />
      {/* <Link href={`/lost-items/${item._id}`}>Details</Link> */}
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.btn}>
            <Link href={`/lost-items/${item._id}`} style={styles.btnText}>
              See Item Details
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.reportBtn]}>
            <Link
              href={`/lost-item-chat/${item._id}`}
              className='text-white'
              style={styles.btnText}
            >
              Open Item Chat
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    flexDirection: 'row',

    position: 'relative',
    overflow: 'hidden'
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  image: {
    height: 170,
    width: '50%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  cardContent: {
    width: '50%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9'
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8
  },
  cardDescription: {
    width: '100%',
    fontSize: 12,
    color: '#666',
    marginBottom: 6
  },
  btn: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  reportBtn: {
    backgroundColor: '#9C27B0'
  },
  btnText: {
    color: '#fff',
    fontSize: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  textArea: {
    height: 100
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10
  },
  error: {
    color: 'red'
  }
})

export default LostItemCard
