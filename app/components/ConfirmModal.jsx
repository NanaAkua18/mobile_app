import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function ConfirmModal ({ setModalOpen }) {
  return (
    <View>
      <View className='fixed z-10 inset-0 overflow-y-auto'>
        <View className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <View className='hidden sm:inline-block sm:align-middle sm:h-screen'></View>
          <View className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
            <View className='sm:flex sm:items-start'>
              <View className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <Text className='text-21xl leading-6 font-medium text-gray-900'>
                  Feedback Received!
                </Text>
                <View className='mt-2'>
                  <View className='text-sm leading-5 text-gray-500'>
                    <Text className='text-sm leading-5 text-gray-500'>
                      Thank you for taking time to leave us a feedback. This
                      will help us to improve and make the application even
                      better for use by all students
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className='mt-6'>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  setModalOpen(false)
                }}
              >
                <Text style={styles.submitButtonText}>You are welcome</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
