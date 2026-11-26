import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { COLORS } from '../../components/Styles'

const _layout = () => {
  return (
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textMuted,
        }}
    >
        <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'flame' : 'flame-outline'} size={size} color={color?.toString()} />,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'barbell' : 'barbell-outline'} size={size} color={color?.toString()} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'create' : 'create-outline'} size={size} color={color?.toString()} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color?.toString()} />,
        }}
      />
    </Tabs>
  )
}

export default _layout