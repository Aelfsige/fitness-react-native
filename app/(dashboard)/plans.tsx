import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { supabase } from '../../database/supabase'
import { useEffect, useState } from 'react'
import { styles } from '../../components/Styles'
import { router, Link } from 'expo-router'

enum difficulty {
  EASY,
  MEDIUM,
  HARD
}

type Plan = {
  title: string,
  difficulty: difficulty,
  duration_weeks: number,
  created_at: string,
  users: {
    username: string,
  }
}

const PlanWidget = (props: Plan) => {
  const {title, difficulty, duration_weeks, created_at, users: { username }} = props

  return (
    <Link href='/plan' style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{difficulty}</Text>
        <Text>{duration_weeks} weeks</Text>
        <Text>{created_at}</Text>
        <Text>{username}</Text>
      </View>
    </Link>
  )
}

const plans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getPlans = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('title, difficulty, duration_weeks, created_at, users!inner(username)')
        .eq('is_public', true)
        .overrideTypes<Plan[], { merge: false }>()

      if (error) {
        setMessage(error.message)
        return
      }

      setPlans(data)

      console.log(data)
    }

    getPlans()
  }, [])

  return (
    <View>
      {plans && 
        plans.map(item => {
          return (
            <PlanWidget 
              title={item.title}
              difficulty={item.difficulty}
              duration_weeks={item.duration_weeks}
              created_at={item.created_at}
              users={item.users} 
            />
          )
        })    
      }
      {message && <Text>{message}</Text>}
    </View>  
  )
}

export default plans