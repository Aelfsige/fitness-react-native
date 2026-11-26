import { useState, useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, styles } from '../../components/Styles';
import { 
    CATEGORY, Category, 
    DIFFICULTY, Difficulty, 
    Exercise, 
    DAYS, Day 
} from '../../utils/constants';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../database/supabase';

const create = () => {
    const [isFocus, setIsFocus] = useState(false)
    const [title, setTitle] = useState('');
    const [durationWeeks, setDurationWeeks] = useState('12');
    const [difficulty, setDifficulty] = useState<Difficulty>('EASY')
    const [category, setCategory] = useState<Category>('General Fitness')
    const [isPublic, setIsPublic] = useState(true)

    const [exercises, setExercises] = useState<{ label: string, value: string }[]>([])
    const [exerciseList, setExerciseList] = useState<Exercise[]>([])

    const [exerciseId, setExerciseId] = useState('')
    const [exerciseName, setExerciseName] = useState('')
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [rest, setRest] = useState('60')
    const [day, setDay] = useState<Day>()
    const [dayOption, setDayOption] = useState('')

    const categoryOption = CATEGORY.map(c => ({ label: c, value: c }))
    const difficultyOption = DIFFICULTY.map(d => ({ label: d, value: d }))
    const daysOption = DAYS.map((d, idx) => ({ label: d, value: idx + 1 }))

    useEffect(() => {
        const init = async () => {
            const { data, error } = await supabase
                .from('exercises')
                .select('*')
            
                
            if (data) {
                setExercises(data.map(d => ({ label: d.name, value: d.id })))
            }
        }

        init()
    }, [])

    const handleAddExercise = async () => {
        if (!exerciseName || !sets || !reps || !rest || !day) return
        setExerciseList((prev) => [
            ...prev,
            {
                id: exerciseId,
                name: exerciseName,
                sets,
                reps,
                rest,
                day
            }
        ])
    }
    const handleSaveRoutine = () => {}

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <Text style={styles.display}>Build Custom Workout</Text>
            <Text style={[styles.subtitle, { marginBottom: 16 }]}>
                Create your own routine and run it with the live timer.
            </Text>

            <Text style={styles.label}>Routine Name</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Upper Body Power"
                placeholderTextColor={COLORS.textMuted}
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Estimated Duration (weeks)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={durationWeeks}
                onChangeText={(text) => setDurationWeeks(text.replace(/[^0-9]+/, ''))}
            />

            <Text style={styles.label}>Category</Text>
            <Dropdown 
                style={styles.input}
                selectedTextStyle={{ color: COLORS.text }}
                data={categoryOption}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategory(item);
                    setIsFocus(false);
                }}
            />

            <Text style={styles.label}>Difficulty</Text>
            <Dropdown 
                style={styles.input}
                selectedTextStyle={{ color: COLORS.text }}
                data={difficultyOption}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={difficulty}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setDifficulty(item);
                    setIsFocus(false);
                }}
            />

            <Text style={styles.label}>Visibility</Text>
            <Pressable
                style={[
                    localStyles.radioButton, 
                    {backgroundColor: isPublic ? COLORS.surfaceElevated : ''}
                ]}
                onPress={() => setIsPublic(true)}
            >
                <Ionicons name='eye' size={24} color={isPublic ? COLORS.primary : COLORS.text} />
                <View>
                    <Text style={[styles.subtitle, { color: COLORS.text }]}>Public</Text>
                    <Text style={{ color: COLORS.textMuted }}>Everyone can view and save your plans</Text>
                </View>
            </Pressable>
            <Pressable
                style={[
                    localStyles.radioButton, 
                    {backgroundColor: !isPublic ? COLORS.surfaceElevated : ''}
                ]}
                onPress={() => setIsPublic(false)}
            >
                <Ionicons name='eye-off' size={24} color={!isPublic ? COLORS.primary : COLORS.text} />
                <View>
                    <Text style={[styles.subtitle, { color: COLORS.text }]}>Private</Text>
                    <Text style={{ color: COLORS.textMuted }}>Only you can view your plans</Text>
                </View>
            </Pressable>

            <View style={styles.card}>
                <Dropdown 
                    style={styles.input}
                    selectedTextStyle={{ color: COLORS.text }}
                    placeholderStyle={{ color: COLORS.textMuted }}
                    data={exercises}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Choose an exercise' : '...'}
                    searchPlaceholder="Search..."
                    value={exerciseId}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setExerciseId(item.value);
                        setExerciseName(item.label)
                        setIsFocus(false);
                    }}
                />
                <Dropdown 
                    style={styles.input}
                    selectedTextStyle={{ color: COLORS.text }}
                    placeholderStyle={{ color: COLORS.textMuted }}
                    data={daysOption}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Day' : '...'}
                    searchPlaceholder="Search..."
                    value={dayOption}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setDay(item.label);
                        setDayOption(item)
                        setIsFocus(false);
                    }}
                />

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {['Sets', 'Reps', 'Rest (in seconds)'].map((t, i) => (
                        <Text key={i} style={[styles.label, { width: '100%' }]}>{t}</Text>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="numeric"
                        value={sets}
                        onChangeText={(text) => setSets(text.replace(/[^0-9]+/, ''))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="numeric"
                        value={reps}
                        onChangeText={(text) => setReps(text.replace(/[^0-9]+/, ''))}
                    />
                    <TextInput
                        style={[styles.input, {width: '100%'}]}
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="numeric"
                        value={rest}
                        onChangeText={(text) => setRest(text.replace(/[^0-9]+/, ''))}
                    />
                </View>
                
                <Pressable style={styles.secondaryButton} onPress={handleAddExercise}>
                <Text style={styles.secondaryButtonText}>+ Add Exercise to List</Text>
                </Pressable>
            </View>

            {exerciseList.map((ex, idx) => (
                <View key={idx} style={[styles.card, styles.rowBetween]}>
                    <View style={{ gap: 8 }}>
                        <Text style={{ color: COLORS.text, fontWeight: '700' }}>
                            {idx + 1}. {ex.name}
                        </Text>
                        <View style={styles.metaRow}>
                            <Ionicons name='barbell' size={14} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>
                                {ex.sets} sets x {ex.reps} reps
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Ionicons name='timer' size={14} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>
                                {ex.rest}s rest
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Ionicons name='calendar' size={14} color={COLORS.textMuted} />
                            <Text style={styles.metaText}>
                                Every {ex.day}
                            </Text>
                        </View>
                    </View>
                    <Pressable onPress={() => setExerciseList((prev) => prev.filter((_, prevIdx) => prevIdx !== idx))}>
                        <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
                    </Pressable>
                </View>
            ))}

            <Pressable style={[styles.primaryButton, { marginTop: 8 }]} onPress={handleSaveRoutine}>
                <Ionicons name="checkmark-done" size={20} color="#fff" />
                <Text style={styles.primaryButtonText}>Save Workout Plan</Text>
            </Pressable>
            </ScrollView>
    )
}

export default create

const localStyles = StyleSheet.create({
    radioButton: {
        paddingHorizontal: 8,
        paddingVertical: 12, 
        borderColor: COLORS.surface, 
        flexDirection: 'row',
        gap: 8,
        marginVertical: 4,
        borderRadius: 4
    }
})