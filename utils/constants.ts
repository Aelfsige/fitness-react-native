// Enums
export const DIFFICULTY = ['EASY', 'MEDIUM', 'HARD'] as const
export const MUSCLES = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
  'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Abs', 'Full Body',
] as const
export const CATEGORY = ['Strength', 'Hypertrophy', 'Fat Loss', 'Endurance', 'General Fitness'] as const

// Types
export type Difficulty = (typeof DIFFICULTY)[number]
export type Muscle = (typeof MUSCLES)[number]
export type Category = (typeof CATEGORY)[number]

// Interface
export interface Plan {
  id: number,
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
  day_of_week: number
  sets: number
  reps: number
  plans: { title: string }
  exercises: { name: string; primary_muscle_group: string }
}

export interface PlanExercise {
  title: string
  name: string
  primary_muscle_group: string
  sets: number
  reps: number
  day_of_week: number
}

export interface User {
  username: string,
  height_cm: number,
  weight_kg: number,
  created_at: Date
}

