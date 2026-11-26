import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { COLORS } from '../../components/Styles'

const _layout = () => {
  return (
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                paddingTop: 10,
                height: 80,
                backgroundColor: COLORS.surfaceElevated
            },
        }}
    >
        <Tabs.Screen 
            name='home' 
            options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        size={24}
                        color={focused ? COLORS.primary : COLORS.textMuted}
                        name={focused ? 'flame' : 'flame-outline'}
                    />
                )
            }} 
        />
        <Tabs.Screen 
            name='plans'
            options={{
                title: 'Plans',
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        size={24}
                        color={focused ? COLORS.primary : COLORS.textMuted}
                        name={focused ? 'barbell' : 'barbell-outline'}
                    />
                )
            }}     
        />
        <Tabs.Screen 
            name='create' 
            options={{
                title: 'Create',
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        size={24}
                        color={focused ? COLORS.primary : COLORS.textMuted}
                        name={focused ? 'create' : 'create-outline'}
                    />
                )
            }}   
        />
        <Tabs.Screen 
            name='profile' 
            options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        size={24}
                        color={focused ? COLORS.primary : COLORS.textMuted}
                        name={focused ? 'person' : 'person-outline'}
                    />
                )
            }}   
        />
    </Tabs>
  )
}

export default _layout