import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '../../database/supabase'
import { styles } from '../../components/Styles'
import { getAuthUser, getUser } from '../../utils/functions'
import { User } from '../../utils/constants'

const profile = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<User>()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      // get user authenticated email and auth id
      const { userEmail, userId } = await getAuthUser()

      if (!userEmail || !userId) {
        setMessage('Failed to retrieve user information')
        return
      }

      setEmail(userEmail)

      // get user profile
      const { data, error } = await getUser(userId)

      if (error) {
        setMessage(error.message)
        return
      }

      setUser(data)
    }

    init()
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