import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                paddingTop: 10,
                height: 80
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
                        name={focused ? 'home' : 'home-outline'}
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
                        name={focused ? 'list' : 'list-outline'}
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
                        name={focused ? 'person' : 'person-outline'}
                    />
                )
            }}   
        />
    </Tabs>
  )
}

export default _layout