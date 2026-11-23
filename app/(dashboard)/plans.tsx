import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { styles } from '../../components/Styles'
import { Plan } from '../../utils/constants'
import { getPlans } from '../../utils/functions'

const plans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [message, setMessage] = useState('')

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
    <View>
      <Text style={styles.title}>Plans</Text>
      <Text>Tap any routine to launch the interactive set tracker & rest timer.</Text>
      {plans && 
        plans.map(plan => {
          return (
            <Link href={`/plan?id=${plan.id}`} style={styles.card} id={plan.id}>
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

export default plans