import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

const DateFilterComponent = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [filterOption, setFilterOption] = useState('consolidated')

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartPicker(false)
    if (selectedDate) {
      setStartDate(selectedDate)
    }
  }

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndPicker(false)
    if (selectedDate) {
      setEndDate(selectedDate)
    }
  }

  const formattedDate = date => {
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short'
    })} ${date.getFullYear()}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <FontAwesome5 name='calendar-alt' size={24} color='purple' />
          <TextInput
            style={styles.dateText}
            editable={false}
            value={formattedDate(startDate)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={styles.dateInput}
        >
          <FontAwesome5 name='calendar-alt' size={24} color='purple' />
          <View className='flex-col items-center'>
            <Text>To date</Text>
            <TextInput
              style={styles.dateText}
              editable={false}
              value={formattedDate(endDate)}
            />
          </View>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode='date'
          display='default'
          onChange={onChangeStartDate}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode='date'
          display='default'
          onChange={onChangeEndDate}
        />
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name='filter-outline' size={24} color='white' />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E8F0FE',
    borderRadius: 10
  },
  filterOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  option: {
    fontSize: 18,
    color: '#777'
  },
  selectedOption: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    width: '45%'
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  filterButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16
  },
  goButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default DateFilterComponent
