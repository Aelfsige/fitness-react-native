import { StyleSheet, Text, View } from 'react-native'
import { supabase } from '../../database/supabase'
import { useEffect, useState } from 'react'
import { styles } from '../../components/Styles'

const Home = () => {
  const [error, setError] = useState('')

  return (
    <View style={styles.center}>
      <Text>No activity yet.</Text>
      {error && <Text>{error}</Text>}
    </View>
  )
}

export default Home