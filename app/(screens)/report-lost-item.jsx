import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image
} from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
//import DatePicker from "react-native-date-picker";
import categories from '../data/categories'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import ConfirmModal from '../components/ConfirmModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UploadLostItem = () => {
  const [showDatepicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    description: '',
    date: new Date(),
    name: '',
    category: '',
    subcategory: '',
    itemName: '',
    itemImages: [],
    place: '',
    ownerName: '',
    itemID: '',
    contact: '',
    otherDetails: '',
    isIdentifiable: false
  })

  const router = useRouter()
  const navigation = useNavigation()

  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com'
  const cloudName = 'dgn3nvrp9'
  const apiKey = 'R0WVDThQ1GvH6XTKc0fxuC6qlAk'
  const uploadPreset = 'quick_save_images'

  const handleImageChange = async () => {
    setLoading(false)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true
    })

    if (!result.canceled) {
      setFormState(prevState => ({
        ...prevState,
        itemImages: result.assets
      }))
    }
    console.log(formState.itemImages)
  }

  const onDateChange = (event, selectedDate) => {
    setLoading(false)
    setShowDatePicker(false)
    if (selectedDate !== undefined) {
      setDate(selectedDate)
    }
  }

  const showPicker = () => {
    setShowDatePicker(true)
  }

  const handleSwitchChange = value => {
    setLoading(false)
    setFormState(prevState => ({
      ...prevState,
      isIdentifiable: value
    }))
  }

  const handleFormChange = (name, value) => {
    setLoading(false)
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFormSubmit = async () => {
    if (!formState.place) {
      setError('Place is required!')
      return
    }
    if (!formState.contact) {
      setError('Contact is required!')
      return
    }
    if (!formState.category) {
      setError('Category is required!')
      return
    }
    if (!formState.description) {
      setError('Description is required!')
      return
    }
    if (!date) {
      setError('Date is required!')
      return
    }
    if (!formState.name) {
      setError('Item name is required!')
      return
    }
    if (!formState.itemImages) {
      setError('Item image is required!')
      return
    }
    if (formState.isIdentifiable && !formState.itemID) {
      setError('Item ID is required!')
      return
    }

    setError('')
    setLoading(true)

    let urls = []
    try {
      const uploaders = formState.itemImages.map(image => {
        let base64Img = `data:${image.type};base64,${image.base64}`
        const fileData = new FormData()
        fileData.append('file', base64Img)
        fileData.append('upload_preset', uploadPreset)
        fileData.append('api_key', apiKey)
        fileData.append('timestamp', (Date.now() / 1000) | 0)
        fileData.append('folder', 'lost_and_found')

        return axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            fileData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
              }
            }
          )
          .then(response => response.data.secure_url)
      })

      urls = await axios.all(uploaders)
    } catch (error) {
      console.error(error)
      setError('Error uploading images. Please try again.')
      setLoading(false)
      return
    }

    const formData = {
      description: formState.description,
      date,
      name: formState.name,
      contact: formState.contact,
      itemID: formState.itemID,
      category: formState.category,
      subcategory: formState.category,
      itemName: formState.name,
      place: formState.place,
      ownerName: formState.ownerName,
      otherDetails: formState.otherDetails,
      itemImages: urls,
      isIdentifiable: formState.isIdentifiable
    }

    const data = await AsyncStorage.getItem('currentUser')
    const user = JSON.parse(data)

    try {
      const res = await fetch(`${BASE_URL}/api/lost-items/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 201) {
        setModalOpen(true)
        setLoading(false)
        setFormState({
          description: '',
          date: new Date(),
          name: '',
          category: '',
          subcategory: '',
          itemName: '',
          itemImages: [],
          place: '',
          ownerName: '',
          itemID: '',
          contact: '',
          otherDetails: '',
          isIdentifiable: false
        })
        const matched = data.matched
        if (matched) {
          Alert.alert(
            'You got lucky! There is a matched item. Click ok to proceed to the item'
          )
          router.push(`/lost-items/${matched._id}`)
        } else {
          router.push(`/found-items`)
        }
      } else {
        setLoading(false)
        setError(data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setLoading(false)
      setError("Couldn't upload item. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // You can add theme-related background setting here if necessary
  }, [])

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Item Name'
            className='py-2'
            value={formState.name}
            onChangeText={text => handleFormChange('name', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            editable
            multiline
            numberOfLines={3}
            maxLength={500}
            style={styles.textArea}
            placeholder='Description'
            value={formState.description}
            className=''
            onChangeText={text => handleFormChange('description', text)}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.datePicker} onPress={showPicker}>
            <Fontisto name='date' size={20} color='#fff' />
            <Text style={styles.datePickerText}>Pick date</Text>
          </TouchableOpacity>
          {showDatepicker && (
            <DateTimePicker
              value={date}
              mode='date'
              display='default'
              maximumDate={new Date()}
              minimumDate={new Date(2000, 0, 1)}
              onChange={onDateChange}
            />
          )}

          <Text className='pb-4 pt-2 text-gray-600'>{date.toDateString()}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Place you Lost the Item'
            value={formState.place}
            onChangeText={text => handleFormChange('place', text)}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formState.category}
            style={styles.picker}
            onValueChange={itemValue => handleFormChange('category', itemValue)}
          >
            <Picker.Item label='Select Category' value='' />
            {categories.map(cat => (
              <Picker.Item key={cat.name} label={cat.name} value={cat.val} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Your Contact'
            value={formState.contact}
            onChangeText={text => handleFormChange('contact', text)}
          />
        </View>

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={handleImageChange}
        >
          <AntDesign name='clouduploado' size={24} color='#fff' />
          <Text style={styles.imagePickerText}>Pick Images</Text>
        </TouchableOpacity>

        {formState?.itemImages?.length > 0 ? (
          <View style={styles.imagePreviewContainer}>
            {formState.itemImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.imagePreview}
              />
            ))}
          </View>
        ) : null}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Is item Identifiable?</Text>
          <Switch
            value={formState.isIdentifiable}
            onValueChange={handleSwitchChange}
          />
        </View>

        {formState.isIdentifiable && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Name on item'
                value={formState.ownerName}
                onChangeText={text => handleFormChange('ownerName', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Item ID'
                value={formState.itemID}
                onChangeText={text => handleFormChange('itemID', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Any other details'
                value={formState.otherDetails}
                onChangeText={text => handleFormChange('otherDetails', text)}
              />
            </View>
          </>
        )}

        {error ? (
          <Text
            className='flex-row items-center text-start w-full text-gray-600'
            style={styles.errorText}
          >
            <Entypo name='dot-single' size={24} />
            {error}
          </Text>
        ) : null}

        {/* <Button
					title={loading ? "Submitting..." : "Submit"}
					onPress={handleFormSubmit}
					disabled={loading}
					color="#9C27B0"
				/> */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFormSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 60
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#9c27b0'
  },
  textArea: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#9c27b0'
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  },
  imagePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#7a5685',
    padding: 6,
    borderRadius: 5,
    marginBottom: 16
  },
  imagePickerText: {
    color: '#fff',
    marginLeft: 8
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#7a5685',
    padding: 6,
    borderRadius: 5
  },
  datePickerText: {
    color: '#fff',
    marginLeft: 8
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  switchLabel: {
    fontSize: 16
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 12
  },
  picker: {
    height: 50,
    width: '100%'
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 4
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#9C27B0',
    borderRadius: 20,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18
  }
})

export default UploadLostItem
