import { Text, TextInput, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../components/Styles'
import Dropdown from '../../components/Dropdown'
import {
  CATEGORY, DAYS, DIFFICULTY, MUSCLES,
  Category, Difficulty, Muscle, NewPlanExercise
} from '../../utils/constants'
import { createPlan } from '../../utils/functions'

const DIFFICULTY_OPTIONS = DIFFICULTY.map(value => ({ label: value, value }))
const CATEGORY_OPTIONS = CATEGORY.map(value => ({ label: value, value }))
const MUSCLE_OPTIONS = MUSCLES.map(value => ({ label: value, value }))

const toPositiveInt = (value: string) => {
  const n = Number(value)
  return Number.isInteger(n) && n > 0 ? n : null
}

const getDayLabel = (day: number) => DAYS.find(d => d.value === day)?.label ?? ''

const create = () => {
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1: basic details
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [duration, setDuration] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [isPublic, setIsPublic] = useState(false)

  // Step 2: exercises
  const [exercises, setExercises] = useState<NewPlanExercise[]>([])
  const [exerciseName, setExerciseName] = useState('')
  const [muscle, setMuscle] = useState<Muscle | null>(null)
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [day, setDay] = useState<number | null>(null)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const resetForm = () => {
    setStep(1)
    setTitle('')
    setDifficulty(null)
    setDuration('')
    setCategory(null)
    setIsPublic(false)
    setExercises([])
    setExerciseName('')
    setMuscle(null)
    setSets('')
    setReps('')
    setDay(null)
    setMessage('')
  }

  const handleNext = () => {
    setMessage('')

    if (!title.trim() || !difficulty || !duration || !category) {
      setMessage('Please fill up the missing fields.')
      return
    }

    if (!toPositiveInt(duration)) {
      setMessage('Duration must be a whole number of weeks, greater than 0.')
      return
    }

    setStep(2)
  }

  const handleAddExercise = () => {
    setMessage('')

    if (!exerciseName.trim() || !muscle || !sets || !reps || day === null) {
      setMessage('Please fill up the missing exercise fields.')
      return
    }

    const setsNumber = toPositiveInt(sets)
    const repsNumber = toPositiveInt(reps)

    if (!setsNumber || !repsNumber) {
      setMessage('Sets and reps must be whole numbers greater than 0.')
      return
    }

    setExercises(prev => [
      ...prev,
      {
        name: exerciseName.trim(),
        muscle,
        sets: setsNumber,
        reps: repsNumber,
        day_of_week: day,
      },
    ])

    // keep the muscle group and day selected, since exercises are often added in batches
    setExerciseName('')
    setSets('')
    setReps('')
  }

  const handleRemoveExercise = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setMessage('')

    const durationWeeks = toPositiveInt(duration)

    if (!difficulty || !category || !durationWeeks) {
      setMessage('Please complete the basic details first.')
      setStep(1)
      return
    }

    if (exercises.length === 0) {
      setMessage('Add at least one exercise to your plan.')
      return
    }

    setSaving(true)

    try {
      const planId = await createPlan(
        {
          title: title.trim(),
          difficulty,
          duration_weeks: durationWeeks,
          category,
          is_public: isPublic,
        },
        exercises
      )

      resetForm()
      router.push(`/plan?id=${planId}`)
    } catch (error) {
      setMessage((error as { message?: string })?.message ?? 'Failed to save the plan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView
        contentContainerStyle={local.container}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.title}>Create a Plan</Text>
        <Text style={local.subtitle}>
          {step === 1 ? 'Step 1 of 2 · Basic details' : 'Step 2 of 2 · Exercises'}
        </Text>

        {step === 1 ? (
          <>
            <View style={local.field}>
              <Text>Title</Text>
              <TextInput
                onChangeText={setTitle}
                value={title}
                placeholder='Push Pull Legs'
                placeholderTextColor={'#aaa'}
                style={local.input}
              />
            </View>

            <Dropdown
              label='Difficulty'
              value={difficulty}
              options={DIFFICULTY_OPTIONS}
              onChange={setDifficulty}
            />

            <View style={local.field}>
              <Text>Duration (weeks)</Text>
              <TextInput
                onChangeText={setDuration}
                value={duration}
                placeholder='8'
                placeholderTextColor={'#aaa'}
                style={local.input}
                keyboardType='number-pad'
              />
            </View>

            <Dropdown
              label='Category'
              value={category}
              options={CATEGORY_OPTIONS}
              onChange={setCategory}
            />

            <View style={local.field}>
              <Text>Visibility</Text>
              <View style={local.row}>
                <Pressable
                  style={[local.toggle, !isPublic && local.toggleActive]}
                  onPress={() => setIsPublic(false)}
                >
                  <Text style={!isPublic ? local.toggleTextActive : undefined}>Private</Text>
                </Pressable>
                <Pressable
                  style={[local.toggle, isPublic && local.toggleActive]}
                  onPress={() => setIsPublic(true)}
                >
                  <Text style={isPublic ? local.toggleTextActive : undefined}>Public</Text>
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.btn} onPress={handleNext}>
              <Text style={{ textAlign: 'center', color: '#fff' }}>Next</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={local.planSummary}>
              {title.trim()} · {difficulty} · {duration} weeks · {category} · {isPublic ? 'Public' : 'Private'}
            </Text>

            <Text style={local.sectionTitle}>Exercises ({exercises.length})</Text>
            {exercises.length === 0 && <Text style={local.empty}>No exercises added yet.</Text>}
            {exercises.map((exercise, index) => (
              <View key={`${exercise.name}-${index}`} style={[styles.card, local.exerciseCard]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{exercise.name}</Text>
                  <Text>
                    {exercise.muscle} · {exercise.sets} sets × {exercise.reps} reps · {getDayLabel(exercise.day_of_week)}
                  </Text>
                </View>
                <Pressable onPress={() => handleRemoveExercise(index)} hitSlop={10}>
                  <Ionicons name='trash-outline' size={20} color='#ce1126' />
                </Pressable>
              </View>
            ))}

            <Text style={local.sectionTitle}>Add an exercise</Text>

            <View style={local.field}>
              <Text>Exercise name</Text>
              <TextInput
                onChangeText={setExerciseName}
                value={exerciseName}
                placeholder='Bench Press'
                placeholderTextColor={'#aaa'}
                style={local.input}
              />
            </View>

            <Dropdown
              label='Muscle group'
              value={muscle}
              options={MUSCLE_OPTIONS}
              onChange={setMuscle}
            />

            <View style={local.row}>
              <View style={[local.field, { flex: 1 }]}>
                <Text>Sets</Text>
                <TextInput
                  onChangeText={setSets}
                  value={sets}
                  placeholder='3'
                  placeholderTextColor={'#aaa'}
                  style={local.input}
                  keyboardType='number-pad'
                />
              </View>
              <View style={[local.field, { flex: 1 }]}>
                <Text>Reps</Text>
                <TextInput
                  onChangeText={setReps}
                  value={reps}
                  placeholder='10'
                  placeholderTextColor={'#aaa'}
                  style={local.input}
                  keyboardType='number-pad'
                />
              </View>
            </View>

            <Dropdown
              label='Day of week'
              value={day}
              options={DAYS}
              onChange={setDay}
            />

            <Pressable style={[styles.btn, local.btnOutline]} onPress={handleAddExercise}>
              <Text style={{ textAlign: 'center', color: '#ce1126' }}>Add exercise</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, saving && local.btnDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={{ textAlign: 'center', color: '#fff' }}>
                {saving ? 'Saving...' : 'Save plan'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.btn, local.btnOutline]}
              onPress={() => { setMessage(''); setStep(1) }}
              disabled={saving}
            >
              <Text style={{ textAlign: 'center', color: '#ce1126' }}>Back</Text>
            </Pressable>
          </>
        )}

        {message ? <Text style={local.error}>{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  )
}

const local = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  field: {
    width: '100%',
    paddingBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  toggle: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingVertical: 12,
  },
  toggleActive: {
    backgroundColor: '#ce1126',
    borderColor: '#ce1126',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  planSummary: {
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  empty: {
    color: '#888',
    marginBottom: 8,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 0,
    borderRadius: 8,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ce1126',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  error: {
    color: '#ce1126',
    marginTop: 8,
  },
})

export default create
