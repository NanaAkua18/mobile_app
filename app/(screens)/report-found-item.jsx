import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import categories from '../data/categories'
import { AntDesign, Entypo, Fontisto } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com'
const cloudName = 'dgn3nvrp9'
const apiKey = 'R0WVDThQ1GvH6XTKc0fxuC6qlAk'
const uploadPreset = 'quick_save_images'

const UploadFoundItem = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const router = useRouter()

  const initialTheme = 'light'
  const [showDatepicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    description: '',
    date: '',
    name: '',
    category: '',
    subcategory: '',
    itemName: '',
    itemImages: [],
    place: '',
    ownerName: '',
    itemID: '',
    otherDetails: '',
    isIdentifiable: false,
    theme: initialTheme
  })

  const handleInputChange = (name, value) => {
    setLoading(false)
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate !== undefined) {
      setDate(selectedDate)
    }
  }
  const showPicker = () => {
    setShowDatePicker(true)
  }

  const handleSwitchChange = value => {
    setState(prevState => ({ ...prevState, isIdentifiable: value }))
  }

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
      quality: 1
    })

    if (!result.canceled) {
      setState(prevState => ({
        ...prevState,
        itemImages: result.assets
      }))
    }
  }

  const handleFormSubmit = async () => {
    if (!state.place) {
      setError('Place is required!')
      return
    }
    if (!state.category) {
      setError('Category is required!')
      return
    }
    if (!state.description) {
      setError('Description is required!')
      return
    }
    if (!date) {
      setError('Date is required!')
      return
    }
    if (!state.name) {
      setError('Item name is required!')
      return
    }
    if (!state.itemImages) {
      setError('Item image is required!')
      return
    }
    if (state.isIdentifiable && !state.itemID) {
      setError('Item ID is required!')
      return
    }

    setError('')
    setLoading(true)

    let urls = []
    try {
      const uploaders = state.itemImages.map(image => {
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
      description: state.description,
      date: date,
      category: state.category,
      subcategory: state.category,
      itemName: state.itemName,
      place: state.place,
      ownerName: state.ownerName,
      itemID: state.itemID,
      name: state.name,
      otherDetails: state.otherDetails,
      isIdentifiable: state.isIdentifiable,
      itemImages: urls
    }

    const data = await AsyncStorage.getItem('currentUser')
    const user = JSON.parse(data)

    try {
      const res = await fetch(`${BASE_URL}/api/found-items/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      //console.log(data);
      if (res.status === 201) {
        setLoading(false)
        setState({
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
            'There is a matched item. Click ok to proceed to the item'
          )
          router.push(`/lost-items/${matched._id}`)
        } else {
          router.push(`/found-items/${data?.item?._id}`)
        }
      } else {
        setLoading(false)
        setError(data.message)
      }
    } catch (error) {
      console.log('Error...........', error)
      setLoading(false)
      setError("Couldn't upload item. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // const getCurrentUser = async () => {
    //   try {
    //     const data = await AsyncStorage.getItem("currentUser");
    //     const user = JSON.parse(data);
    //     setCurrentUser(user);
    //     if (user) {
    //       await getItem();
    //       await fetchData(user); // Call fetchData with the user
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
    // getCurrentUser();
    // Implement theme change logic if needed
  }, [state.theme])

  return (
    <SafeAreaView className='min-h-screen pb-12 bg-slate-200'>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.container}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            value={state.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.textArea}
            editable
            multiline
            numberOfLines={3}
            maxLength={500}
            placeholder='Description'
            value={state.description}
            onChangeText={text => handleInputChange('description', text)}
          />
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

            <Text className='pb-4 pt-2 text-gray-600'>
              {date.toDateString()}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Place'
            value={state.place}
            onChangeText={text => handleInputChange('place', text)}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={state.category}
              style={styles.picker}
              onValueChange={itemValue =>
                handleInputChange('category', itemValue)
              }
            >
              <Picker.Item label='Select Category' value='' />
              {categories.map(cat => (
                <Picker.Item key={cat.name} label={cat.name} value={cat.val} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePicker}
          >
            <AntDesign name='clouduploado' size={24} color='#fff' />
            <Text style={styles.imagePickerText}>Pick Images</Text>
          </TouchableOpacity>
          {state.itemImages.length > 0 ? (
            <View style={styles.imagePreviewContainer}>
              {state.itemImages.map((image, index) => (
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
              value={state.isIdentifiable}
              onValueChange={handleSwitchChange}
            />
          </View>
          {state.isIdentifiable ? (
            <>
              <TextInput
                style={styles.input}
                placeholder='Owner Name'
                value={state.ownerName}
                onChangeText={text => handleInputChange('ownerName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder='Item ID'
                value={state.itemID}
                onChangeText={text => handleInputChange('itemID', text)}
              />
              <TextInput
                style={styles.input}
                placeholder='Any other details'
                value={state.otherDetails}
                onChangeText={text => handleInputChange('otherDetails', text)}
              />
            </>
          ) : null}
          {error ? (
            <Text
              className='flex-row items-center text-start w-full text-gray-600'
              style={styles.errorText}
            >
              <Entypo name='dot-single' size={24} />
              {error}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleFormSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 60
  },
  container: {
    padding: 16
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  form: {
    flex: 1
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ddd",
    // padding: 12,
    // marginBottom: 12,
    // borderRadius: 4,

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
    // borderRadius: 5,
    // backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#ddd",
    // padding: 12,
    // marginBottom: 12,

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
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: '#9c27b0',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  picker: {
    height: 50,
    width: '100%'
  },
  imagePicker: {
    padding: 10,
    backgroundColor: '#7a5685',
    borderRadius: 4,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
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
    padding: 10,
    borderRadius: 5
  },
  datePickerText: {
    color: '#fff',
    marginLeft: 8
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  switchLabel: {
    fontSize: 16
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
  },
  errorText: {
    color: 'red',
    marginBottom: 16
  }
})

export default UploadFoundItem
