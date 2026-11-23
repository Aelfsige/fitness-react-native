import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { styles } from '../../components/Styles'
import { SavedPlan } from '../../utils/constants'
import { getSavedPlan } from '../../utils/functions'

const Home = () => {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      const data = await getSavedPlan()

      if (!data) {
        setMessage('Failed to retrieve data')
        return
      }

      setSavedPlans(data)
    }

    init()
  }, [])

  return (
    <View>
      <Text style={styles.title}>Home</Text>
      <Text>Recent Activity</Text>
      <Text>No activity yet.</Text>

      <Text>Saved Plans</Text>
      {savedPlans && 
            savedPlans.map(plan => {
              return (
                <Link href={`/plan?id=${plan.planId}`} style={styles.card} id={plan.planId}>
                  <View>
                    <Text>{plan.category}</Text>
                    <Text style={styles.title}>{plan.title}</Text>
                    <Text>{plan.difficulty}</Text>
                    <Text>{plan.duration_weeks} weeks</Text>
                    <Text>{plan.created_at}</Text>
                    <Text>{plan.creator}</Text>
                  </View>
                </Link>
              )
            })    
          }

      {message && <Text>{message}</Text>}
    </View>
  )
}

export default Home