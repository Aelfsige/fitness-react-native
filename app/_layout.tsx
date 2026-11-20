import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";

const _layout = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession()
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuthenticated(!!session)
          })

          setAuthenticated(!!session)
          setLoading(false)

          return () => subscription.unsubscribe()
      }

      getSession()
  }, [])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={authenticated} redirectTo='/login'>
          <Stack.Screen name='(dashboard)' />
        </Stack.Protected>
    </Stack>
  )
}

export default _layout