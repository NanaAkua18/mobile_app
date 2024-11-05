// // ReportsScreen.js

// import React, { useState, useEffect } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity
// } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import { LineChart, BarChart } from 'react-native-chart-kit'
// import axios from 'axios'
// import { Button, IconButton, Modal, Portal, Provider } from 'react-native-paper'

// const screenWidth = Dimensions.get('window').width

// const ReportsScreen = () => {
//   const [timeRange, setTimeRange] = useState('lastMonth')
//   const [customRange, setCustomRange] = useState({
//     startDate: new Date(),
//     endDate: new Date()
//   })
//   const [showStartPicker, setShowStartPicker] = useState(false)
//   const [showEndPicker, setShowEndPicker] = useState(false)
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const fetchReportData = async () => {
//     setLoading(true)
//     try {
//       let payload = {}
//       if (timeRange === 'custom') {
//         payload = {
//           startDate: customRange.startDate,
//           endDate: customRange.endDate
//         }
//       }
//       const response = await axios.post(
//         'https://your-backend-api.com/api/reports',
//         payload
//       )
//       setData(response.data)
//     } catch (error) {
//       console.error('Error fetching report data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchReportData()
//   }, [timeRange, customRange])

//   const renderChart = () => {
//     if (!data) return null

//     const categories = data.categories
//     const counts = data.counts

//     return (
//       <BarChart
//         data={{
//           labels: categories,
//           datasets: [
//             {
//               data: counts
//             }
//           ]
//         }}
//         width={screenWidth - 32}
//         height={220}
//         yAxisLabel=''
//         yAxisSuffix=''
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: '6',
//             strokeWidth: '2',
//             stroke: '#ffa726'
//           }
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16
//         }}
//       />
//     )
//   }

//   const onChangeStartDate = (event, selectedDate) => {
//     setShowStartPicker(false)
//     if (selectedDate) {
//       setCustomRange({ ...customRange, startDate: selectedDate })
//     }
//   }

//   const onChangeEndDate = (event, selectedDate) => {
//     setShowEndPicker(false)
//     if (selectedDate) {
//       setCustomRange({ ...customRange, endDate: selectedDate })
//     }
//   }

//   return (
//     <Provider>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Reports</Text>

//         <View style={styles.pickerContainer}>
//           <Text style={styles.label}>Select Time Range:</Text>
//           <Picker
//             selectedValue={timeRange}
//             style={styles.picker}
//             onValueChange={itemValue => setTimeRange(itemValue)}
//           >
//             <Picker.Item label='Last Week' value='lastWeek' />
//             <Picker.Item label='Last Month' value='lastMonth' />
//             <Picker.Item label='Last Year' value='lastYear' />
//             <Picker.Item label='Custom Range' value='custom' />
//           </Picker>
//         </View>

//         {timeRange === 'custom' && (
//           <View style={styles.customRangeContainer}>
//             <TouchableOpacity
//               onPress={() => setShowStartPicker(true)}
//               style={styles.dateButton}
//             >
//               <Text style={styles.dateText}>
//                 Start Date: {customRange.startDate.toDateString()}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => setShowEndPicker(true)}
//               style={styles.dateButton}
//             >
//               <Text style={styles.dateText}>
//                 End Date: {customRange.endDate.toDateString()}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {showStartPicker && (
//           <DateTimePicker
//             value={customRange.startDate}
//             mode='date'
//             display='default'
//             onChange={onChangeStartDate}
//             maximumDate={new Date()}
//           />
//         )}

//         {showEndPicker && (
//           <DateTimePicker
//             value={customRange.endDate}
//             mode='date'
//             display='default'
//             onChange={onChangeEndDate}
//             maximumDate={new Date()}
//           />
//         )}

//         <View style={styles.chartContainer}>
//           {loading ? <Text>Loading...</Text> : renderChart()}
//         </View>
//       </ScrollView>
//     </Provider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f2f2f2',
//     flexGrow: 1
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//     color: '#007bff'
//   },
//   pickerContainer: {
//     marginBottom: 16
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#333'
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     backgroundColor: '#fff'
//   },
//   customRangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16
//   },
//   dateButton: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     width: '48%',
//     alignItems: 'center'
//   },
//   dateText: {
//     color: '#333'
//   },
//   chartContainer: {
//     marginTop: 16,
//     alignItems: 'center'
//   }
// })

// export default ReportsScreen

// ReportsScreen.js

import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { BarChart } from 'react-native-chart-kit'
import PageLoader from '../components/PageLoader'
import { useRouter } from 'expo-router'

const screenWidth = Dimensions.get('window').width

const ReportsScreen = () => {
  const [timeRange, setTimeRange] = useState('allTime')
  const [fetchCustomDate, setFetchCustomDate] = useState(0)
  const [catCounts, setCatCounts] = useState([0, 0, 0, 0, 0, 0, 0])
  const [loading, setLoading] = useState(true)
  const [customRange, setCustomRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const BASE_URL = 'https://lost-and-found-web-51sp.onrender.com/api'
  const router = useRouter()

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await fetch(`${BASE_URL}/found-items/reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        })

        const data = await response.json()
        setCatCounts(data.report)
        setLoading(false)
      } catch (error) {
        console.log('Error retrieving reports')
        setLoading(false)
      }
    }

    getReports()
  }, [])

  useEffect(() => {
    if (fetchCustomDate != 0) {
      getFoundReports(customRange.startDate, customRange.endDate)
    }
  }, [fetchCustomDate])

  const getFoundReports = async (start, end) => {
    try {
      const response = await fetch(`${BASE_URL}/found-items/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate: start, endDate: end })
      })

      const data = await response.json()
      setCatCounts(data.report)
      setLoading(false)
    } catch (error) {
      console.log('Error retrieving reports')
      setLoading(false)
    }
  }

  const catData = {
    categories: [
      'Phones',
      'Laptops',
      'Money',
      'Cards',
      'Books',
      'Electronics',
      'Others'
    ],
    counts: catCounts
  }
  const renderChart = () => {
    const categories = catData.categories
    const counts = catData.counts

    return (
      <BarChart
        data={{
          labels: categories,
          datasets: [
            {
              data: counts
            }
          ]
        }}
        width={screenWidth - 20}
        height={450}
        yAxisLabel=''
        yAxisSuffix=''
        fromZero={true}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundColor: '#f4f4f4',
          backgroundGradientFrom: '#f4f4f4',
          backgroundGradientTo: '#fffff4',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          },
          xLabelsOffset: -10 // Adjust this value if needed
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        verticalLabelRotation={90} // Rotate labels by 90 degrees
      />
    )
  }

  const onChangeStartDate = (event, selectedDate) => {
    setFetchCustomDate(fetchCustomDate + 1)
    setShowStartPicker(false)
    if (selectedDate) {
      setCustomRange({ ...customRange, startDate: selectedDate })
    }
  }

  const onChangeEndDate = (event, selectedDate) => {
    setFetchCustomDate(fetchCustomDate + 1)
    setShowEndPicker(false)
    if (selectedDate) {
      setCustomRange({ ...customRange, endDate: selectedDate })
    }
  }

  console.log(customRange)

  if (loading) {
    return <PageLoader />
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Time Range:</Text>
        <TouchableOpacity
          onPress={() => {
            router.push('/report-test')
          }}
        ></TouchableOpacity>
        <Picker
          selectedValue={timeRange}
          style={styles.picker}
          onValueChange={itemValue => {
            setTimeRange(itemValue)
            let startDate
            let endDate
            if (itemValue === 'lastMonth') {
              startDate = new Date()
              startDate.setMonth(startDate.getMonth() - 1)

              endDate = new Date()
            } else if (itemValue === 'lastYear') {
              startDate = new Date()
              startDate.setFullYear(startDate.getFullYear() - 1)

              endDate = new Date()
            } else if (itemValue === 'allTime') {
              startDate = {}
              endDate = {}
            } else if (itemValue === 'lastWeek') {
              startDate = new Date()
              startDate.setDate(startDate.getDate() - 2)

              endDate = new Date()
            }

            getFoundReports(startDate, endDate)
          }}
        >
          <Picker.Item label='Last Week' value='lastWeek' />
          <Picker.Item label='Last Month' value='lastMonth' />
          <Picker.Item label='Last Year' value='lastYear' />
          <Picker.Item label='All Time' value='allTime' />
          {/* <Picker.Item label='Custom Range' value='custom' /> */}
        </Picker>
      </View>

      {timeRange === 'custom' && (
        <View style={styles.customRangeContainer}>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              Start Date: {customRange.startDate.toDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              End Date: {customRange.endDate.toDateString()}
            </Text>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={customRange.startDate}
              mode='date'
              display='default'
              onChange={onChangeStartDate}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={customRange.endDate}
              mode='date'
              display='default'
              onChange={onChangeEndDate}
            />
          )}
        </View>
      )}

      <View style={styles.chartContainer}>{renderChart()}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  pickerContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  customRangeContainer: {
    marginBottom: 16
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8
  },
  dateText: {
    fontSize: 16
  },
  chartContainer: {
    marginTop: 24,
    alignItems: 'center'
  }
})

export default ReportsScreen
