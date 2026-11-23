import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase";
import { useLocalSearchParams } from 'expo-router';
import { PlanExercise, PlanExerciseRow } from '../../utils/constants';
import { getPlanExercises } from '../../utils/functions';
import { styles } from '../../components/Styles';

const plan = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      const data: PlanExercise[] = await getPlanExercises(Number.parseInt(id))

      if (!data) {
        setMessage(data)
        return
      }

      setPlanExercises(data)

      const { data: planTitle, error } = await supabase
        .from('plans')
        .select('title')
        .eq('id', id)
        .single()
      
        if (error) throw error

        setTitle(planTitle.title)
    }

    init()
  }, [])

  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      {planExercises && 
        planExercises.map(pe => {
        return (
          <>
            <Text>{pe.name}</Text>
            <Text>{pe.primary_muscle_group}</Text>
            <Text>{pe.sets}</Text>
            <Text>{pe.reps}</Text>
            <Text>{pe.day_of_week}</Text>
          </>
        )
      })}
    </View>
  )
}

export default plan