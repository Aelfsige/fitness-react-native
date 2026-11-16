import { Pressable, StyleSheet, Text, View } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { useEffect, useState } from 'react'
import { styles } from '../../components/Styles'
import { router } from 'expo-router'

interface User {
  username: string,
  created_at: Date
}

const Home = () => {
  const [users, setUsers] = useState<User[]>()
  const [error, setError] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('username, created_at')
      
      if (error) {
        setError(error.message)
        return
      }

      if (data) {
        setUsers(data)
        console.log(data)
      }

      setError('')
    }

    getUsers()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  }

  return (
    <>
      {users && 
          <View style={styles.center}>
            <Text style={{ textAlign: 'center' }}>{users[0].username}, {users[0].created_at.toString()}</Text>
            <Text style={{ textAlign: 'center' }}>{users[1].username}, {users[1].created_at.toLocaleString()}</Text>
            <Pressable style={styles.btn} onPress={handleSignOut}>
              <Text style={{ textAlign: 'center' }}>Sign out</Text>
            </Pressable>
          </View>
        }
        {error && <Text>{error}</Text>}
    </>
  )
}

export default Home