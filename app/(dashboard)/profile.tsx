import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '../../database/supabase'
import { styles } from '../../components/Styles'

interface User {
  username: string,
  height_cm: number,
  weight_kg: number,
  created_at: Date
}

const profile = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<User>()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getUsername = async (id: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('username, height_cm, weight_kg, created_at')
        .eq('id', id)
        .single()
      
      if (error) {
        setMessage(error.message)
        return
      }

      setUser(data)
    }

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        setMessage(error.message)
        return
      }

      setEmail(data.user.email!)
      getUsername(data.user.id)
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{user?.username}</Text>
      <Text>{email}</Text>
      <Pressable style={styles.btn} onPress={handleSignOut}>
        <Text style={{ textAlign: 'center' }}>Sign out</Text>
      </Pressable>
      {message && <Text>{message}</Text>}
    </View>
  )
}

export default profile