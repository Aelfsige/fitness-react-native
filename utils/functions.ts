import { supabase } from "../database/supabase";
import { 
    Plan, PlanExercise,
    PlanRow, PlanExerciseRow, 
    SavedPlan, SavedPlanRow, 
    Difficulty,
    Category
} from "./constants";

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

// Home
export const getSavedPlan = async (): Promise<SavedPlan[]> => {
    const { userId } = await getAuthUser()
    
    const { data, error } = await supabase
        .from('saved_plans')
        .select(`
            plans!inner (
                users!creator_id ( username ),
                title, 
                difficulty, 
                duration_weeks, 
                created_at, 
                category
            )
        `)
        .eq('user_id', userId)
        .overrideTypes<SavedPlanRow[], { merge: false }>()

    if (error) throw error

    console.log(data)

    return data.map(row => ({
        planId: row.plans.id,
        creator: row.plans.users.username,
        title: row.plans.title,
        difficulty: row.plans.difficulty,
        duration_weeks: row.plans.duration_weeks,
        created_at: row.plans.created_at,
        category: row.plans.category
    }))
}

// Plans
export const getPlans = async (): Promise<Plan[]> => {
    const { data, error } = await supabase
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
    .overrideTypes<PlanRow[], { merge: false }>()

    if (error) throw error

    return data.map(row => ({
        id: row.id,
        title: row.title,
        difficulty: row.difficulty,
        duration_weeks: row.duration_weeks,
        created_at: row.created_at,
        category: row.category,
        creator: row.users.username
    }))
}

export const getPlanExercises = async (planId?: number): Promise<PlanExercise[]> => {
    let query = supabase
        .from('plan_exercises')
        .select(`
            id,
            sets,
            reps,
            rest,
            day_of_week,
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
        id: row.id,
        exercise_name: row.exercises.name,
        primary_muscle_group: row.exercises.primary_muscle_group,
        sets: row.sets,
        reps: row.reps,
        rest: row.rest,
        day_of_week: row.day_of_week,
    }))
}

// Create
export const createPlan = async (plan: Plan) => {
    return await supabase
        .from('plans')
        .insert([
            plan
        ])
}

export const createPlanExercises = async (planExercise: PlanExercise[]) => {
    return await supabase
        .from('plan_exericses')
        .insert(planExercise)
}

// User
export const getAuthUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw error

    return { userEmail: data.user?.email, userId: data.user?.id }
}

export const getUser = async (userId: string) => {
    // !IMPORTANT!
    // Use getAuthUser() first to retrieve the id of the current logged user

    return await supabase
        .from('users')
        .select('username, created_at')
        .eq('id', userId)
        .single()
}