import { View, Text, ScrollView, Pressable } from 'react-native'
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase";
import { useLocalSearchParams } from 'expo-router';
import { PlanExercise } from '../../utils/constants';
import { getPlanExercises } from '../../utils/functions';
import { styles, COLORS } from '../../components/Styles';
import { Ionicons } from '@expo/vector-icons';

const plan = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      const data: PlanExercise[] = await getPlanExercises(Number.parseInt(id))

      if (!data) {
        setMessage('Failed to retrieve data')
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

  useEffect(() => {
    if (restSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setRestSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [restSecondsLeft]);

  const toggleSet = (key: string, restDuration: number) => {
    setCompletedSets((prev) => {
      const nextState = !prev[key];
      if (nextState) {
        setRestSecondsLeft(restDuration);
      }
      return { ...prev, [key]: nextState };
    });
  };

  const totalSets = planExercises.reduce((acc, ex) => acc + ex.sets, 0);
  const doneSets = Object.values(completedSets).filter(Boolean).length;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg,}}>
      {restSecondsLeft > 0 && (
        <View style={styles.timerBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="timer" size={22} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>
              Rest Timer: {restSecondsLeft}s
            </Text>
          </View>
          <Pressable onPress={() => setRestSecondsLeft(0)}>
            <Text style={{ color: '#fff', fontWeight: '700', textDecorationLine: 'underline' }}>Skip</Text>
          </Pressable>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, { marginBottom: 16 }]}>
          Progress: {doneSets} / {totalSets} sets completed
        </Text>

        {planExercises.map((exercise) => (
          <View key={exercise.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>{exercise.exercise_name}</Text>
              <Text style={styles.muscleTag}>{exercise.primary_muscle_group}</Text>
            </View>
            <Text style={[styles.subtitle, { marginBottom: 12 }]}>
              Target: {exercise.sets} sets × {exercise.reps} • Rest {exercise.rest}s
            </Text>

            <View style={styles.setsRow}>
              {Array.from({ length: exercise.sets }).map((_, idx) => {
                const key = `${exercise.id}-${idx}`;
                const checked = !!completedSets[key];
                return (
                  <Pressable
                    key={key}
                    onPress={() => toggleSet(key, exercise.rest)}
                    style={[styles.setPill, checked && styles.setPillDone]}
                  >
                    <Ionicons
                      name={checked ? 'checkmark-circle' : 'ellipse-outline'}
                      size={18}
                      color={checked ? '#fff' : COLORS.textMuted}
                    />
                    <Text style={{ color: checked ? '#fff' : COLORS.text, fontWeight: '700' }}>
                      Set {idx + 1}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Pressable style={[styles.primaryButton, { marginTop: 8 }]} onPress={() => {}}>
          <Ionicons name="trophy" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Finish & Log Workout</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default plan