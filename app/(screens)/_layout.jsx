import { Stack } from 'expo-router'

export default function ScreenLayout () {
  return (
    <Stack>
      <Stack.Screen name='signin' options={{ headerShown: false }} />
      <Stack.Screen name='signup' options={{ headerShown: false }} />
      <Stack.Screen
        name='faq'
        options={{
          headerShown: true,
          title: 'Frequently Asked Questions',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />
      <Stack.Screen
        name='report-found-item'
        options={{
          headerShown: true,
          title: 'Report Found Item',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />
      <Stack.Screen
        name='report-lost-item'
        options={{
          headerShown: true,
          title: 'Report Lost Item',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />
      <Stack.Screen
        name='feedback'
        options={{
          headerShown: true,
          title: 'Feedback',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='reports'
        options={{
          headerShown: true,
          title: 'Items Reports',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='lost-items'
        options={{
          headerShown: true,
          title: 'Lost Items',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />
      <Stack.Screen
        name='found-items'
        options={{
          headerShown: true,
          title: 'Found Items',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='category-items/[category]'
        options={{
          headerShown: true,
          title: 'Category Items',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='found-items/[itemId]'
        options={{
          headerShown: true,
          title: 'Found Item Details',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='found-item-chat/[foundItemId]'
        options={{
          headerShown: true,
          title: 'Found Item Chat Page',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='found-item-chats/[chatId]'
        options={{
          headerShown: true,
          title: 'Found Item Chat Page',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='lost-item-chats/[chatId]'
        options={{
          headerShown: true,
          title: 'Lost Item Chat Page',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='lost-item-chat/[lostItemId]'
        options={{
          headerShown: true,
          title: 'Lost Item Chat Page',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />

      <Stack.Screen
        name='lost-items/[itemId]'
        options={{
          headerShown: true,
          title: 'Lost Item Details',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#9c27b0'
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F1F5F9'
          },
          headerTintColor: '#9c27b0'
        }}
      />
    </Stack>
  )
}
