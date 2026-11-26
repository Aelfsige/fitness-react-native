// Enums
export const DIFFICULTY = ['EASY', 'MEDIUM', 'HARD'] as const
export const MUSCLES = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
  'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Abs', 'Full Body',
] as const
export const CATEGORY = ['Strength', 'Hypertrophy', 'Fat Loss', 'Endurance', 'General Fitness'] as const
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Types
export type Difficulty = (typeof DIFFICULTY)[number]
export type Muscle = (typeof MUSCLES)[number]
export type Category = (typeof CATEGORY)[number]
export type Day = (typeof DAYS)[number]

// Interface
export interface Plan {
  id: string,
  title: string,
  difficulty: Difficulty,
  duration_weeks: number,
  created_at: string,
  category: Category,
  creator: string
}

export interface PlanRow {
  id: string,
  title: string,
  difficulty: Difficulty,
  duration_weeks: number,
  created_at: string,
  category: Category,
  users: {
    username: string,
  }
}

export interface PlanExerciseRow {
  id: string,
  day_of_week: number
  sets: number
  reps: number,
  rest: number
  exercises: { name: string; primary_muscle_group: string }
}

export interface PlanExercise {
  id: string,
  exercise_name: string
  primary_muscle_group: string
  sets: number
  reps: number,
  rest: number,
  day_of_week: number
}

export interface User {
  username: string,
  created_at: Date
}

export interface SavedPlanRow {
  plans: {
    id: string,
    users: { username: string }
    title: string,
    difficulty: Difficulty,
    duration_weeks: number,
    created_at: string,
    category: Category,
  },
}

export interface SavedPlan {
  planId: string,
  creator: string,
  title: string,
  difficulty: Difficulty,
  duration_weeks: number,
  created_at: string,
  category: Category,
}

export interface Exercise {
  id: string
  name: string,
  sets: string,
  reps: string,
  rest: string,
  day: string
}