import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { COLORS, styles } from '../../components/Styles'
import { SavedPlan } from '../../utils/constants'
import { getAuthUser, getSavedPlan, getUser } from '../../utils/functions'
import { Ionicons } from '@expo/vector-icons'

const Home = () => {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([])
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      const data = await getSavedPlan()
      const { userId } = await getAuthUser()
      const { data: user, error } = await getUser(userId)

      if (error) {
        setMessage(error.message)
        return
      }

      setUsername(user?.username)

      if (!data) {
        setMessage('Failed to retrieve data')
        return
      }

      setSavedPlans(data)
    }

    init()
  }, [])

  return (
    <ScrollView style={styles.screen}>
      <View>
        <Text style={styles.subtitle}>WELCOME BACK</Text>
        <Text style={styles.display}>{username}</Text>
      </View>
      <View style={styles.horizontalSpacer}></View>
      <View>
        <Text style={{ color: COLORS.textMuted }}>Recent Activity</Text>
        <Text>No activity yet.</Text>

        <Text style={{ color: COLORS.textMuted }}>Saved Plans</Text>
        {!!savedPlans && 
              savedPlans.map(plan => {
                return (
                  <Pressable 
                    key={plan.planId}
                    onPress={() => router.push({ pathname: '/(plan)/plan', params: { id: plan.planId } })} 
                    style={styles.card} 
                  >
                    <View style={styles.topRow}>
                      <Text style={styles.category}>{plan.category}</Text>
                      <Text style={styles.difficulty}>{plan.difficulty}</Text>
                    </View>

                    <Text style={styles.title}>{plan.title}</Text>

                    <View style={styles.metaRow}>
                      <Ionicons name='time-outline' size={14} color={COLORS.textMuted} />
                      <Text style={styles.metaText}>{plan.duration_weeks} weeks</Text>
                    </View>

                    <View style={styles.metaRow}>
                      <Ionicons name='person-outline' size={14} color={COLORS.textMuted} />
                      <Text style={styles.metaText}>{plan.creator}</Text>
                    </View>
                    {/* <Text>{plan.created_at}</Text> */}
                  </Pressable>
                )
              })    
            }

        {!!message && <Text>{message}</Text>}
      </View>
    </ScrollView>
  )
}

export default Home