import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { styles, COLORS } from '../../components/Styles'
import { Plan, Category, CATEGORY } from '../../utils/constants'
import { getPlans } from '../../utils/functions'
import { Ionicons } from '@expo/vector-icons'

const plans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [message, setMessage] = useState('')

  const filteredPlans =
    selectedCategory === 'All' ? plans : plans.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const init = async () => {
      const data = await getPlans()

      if (!data) {
        setMessage('Failed to retrieve data')
        return
      }

      setPlans(data)
    }

    init()
  }, [])

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.display}>Plans</Text>
      <View style={styles.horizontalSpacer}></View>
      <Text style={styles.subtitle}>
        Tap any routine to launch the interactive set tracker & rest timer.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}>
          {['All', ...CATEGORY].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.chip, active && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }]}
              >
                <Text style={{ color: active ? '#fff' : COLORS.textMuted, fontWeight: '700' }}>{cat}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={{ marginVertical: 12 }}>
        {!!plans && 
          filteredPlans.map(plan => {
            return (
              <Pressable 
                key={plan.id}
                onPress={() => router.push({ pathname: '/(plan)/plan', params: { id: plan.id } })} 
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
      </View>
      {!!message && <Text>{message}</Text>}
    </ScrollView>  
  )
}

export default plans