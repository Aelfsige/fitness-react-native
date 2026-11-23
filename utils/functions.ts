import { supabase } from "../database/supabase";
import { Plan, PlanExercise, PlanExerciseRow } from "./constants";

// Authentication
export const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
    })
}

export const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
        email: email.trim(),
        password
    })
}

// Plans
export const getPlans = async () => {
    return await supabase
    .from('plans')
    .select(`
        id, 
        title, 
        difficulty, 
        duration_weeks, 
        created_at, 
        category, 
        users!inner( username )
    `)
    .eq('is_public', true)
    .overrideTypes<Plan[], { merge: false }>()
}

export const getPlanExercises = async (planId?: number): Promise<PlanExercise[]> => {
    let query = supabase
        .from('plan_exercises')
        .select(`
            sets,
            reps,
            day_of_week,
            plans!inner ( title ),
            exercises!inner ( name, primary_muscle_group )
        `)
        .order('day_of_week', { ascending: true })
        .order('sort_order', { ascending: true })
    
    if (planId !== undefined) {
        query = query.eq('plan_id', planId)
    }

    const { data, error } = await query.overrideTypes<PlanExerciseRow[], { merge: false }>()

    if (error) throw error

    return data.map(row => ({
        title: row.plans.title,
        name: row.exercises.name,
        primary_muscle_group: row.exercises.primary_muscle_group,
        sets: row.sets,
        reps: row.reps,
        day_of_week: row.day_of_week,
    }))
}

// User
export const getAuthUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    return { userEmail: data.user?.email, userId: data.user?.id }
}

export const getUser = async (userId: string) => {
    // !IMPORTANT!
    // Use getUser() first to retrieve the id of the current logged user

    return await supabase
        .from('users')
        .select('username, height_cm, weight_kg, created_at')
        .eq('id', userId)
        .single()
}