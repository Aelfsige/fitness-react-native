# Database Documentation + Supabase Integration

## Table `users`

| Column | Data Type | Description |
| -------|-----------|------------ |
| `id`     |`uuid`       | References authenticated/signed in users in Supabase `auth.users` table which contains the email and password of the user
| `username` | `text` | The name displayed in the app
| `height_cm` | `float` | The total height of the user
| `weight_kg` | `float` | The total weight of the user

```
CREATE TABLE public.users (
  id uuid NOT NULL,
  username text NOT NULL,
  height_cm double precision NOT NULL,
  weight_kg double precision NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
```

## Table `plans`

| Column | Data Type | Description |
| -------|-----------|------------ |
| `id`     | `int`       | Primary Key |
| `creator_id` | `uuid` | References `users.id`
| `title` | `text` |
| `duration_weeks` | `int` | Total number of weeks to complete the plan
| `difficulty` | `difficulty` | `EASY, MEDIUM, HARD`
| `is_public` | `bool` | Visibility option of the plan
| `created_at` | `timestampz` | 

```
CREATE TABLE public.plans (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  creator_id uuid NOT NULL DEFAULT auth.uid(),
  title text NOT NULL,
  duration_weeks bigint NOT NULL CHECK (duration_weeks > 0),
  difficulty USER-DEFINED NOT NULL,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT plans_pkey PRIMARY KEY (id),
  CONSTRAINT plans_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id)
);
```

## Table `exercises`

| Column | Data Type | Description |
| -------|-----------|------------ |
| `id`     | `int`       | Primary Key |
| `name`   | `text`      | 
| `primary_muscle_group` | `muscle` | 

```
CREATE TABLE public.exercises (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  primary_muscle_group USER-DEFINED NOT NULL,
  CONSTRAINT exercises_pkey PRIMARY KEY (id)
);
```

## Table `equipments` table:

| Column | Data Type | Description |
| -------|-----------|------------ |
| `id`     | `int`       | Primary Key |
| `name`   | `text`      | 

```
CREATE TABLE public.equipments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  CONSTRAINT equipments_pkey PRIMARY KEY (id)
);
```

## Table `user_plans`

| Column  | Data Type | Description |
|---------|-----------|-------------|
| `user_id` | `uuid`      | References `users.id`. Who saved this plan to their library? 
| `plan_id` | `int`       | References `plans.id`. What plan did they saved? 

```
CREATE TABLE public.user_plans (
  user_id uuid NOT NULL DEFAULT auth.uid(),
  plan_id bigint NOT NULL,
  CONSTRAINT user_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_plans_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);
```

## Table `plan_exercises`

| Column  | Data Type | Description |
|---------|-----------|-------------|
| `id` | `int` | Primary Key
| `plan_id` | `int` | References `plans.id`. Which plan have this exercise?
| `exercise_id` | `int` | References `exercises.id`. Which exercise belongs to this plan? 
| `day_of_week` | `int` | Starts at Sunday, starting from 1 to 7
| `sort_order` | `int` | Which exercise should be done first?
| `sets` | `int` | How many cycles for the user to do the exercise?
| `reps` | `int` | How many times for the user to do the exercise per set?

```
CREATE TABLE public.plan_exercises (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  plan_id bigint NOT NULL,
  exercise_id bigint NOT NULL,
  day_of_week bigint NOT NULL CHECK (day_of_week > 0 AND day_of_week < 8),
  sort_order bigint NOT NULL,
  sets bigint NOT NULL CHECK (sets > 0),
  reps bigint NOT NULL CHECK (reps > 0),
  CONSTRAINT plan_exercises_pkey PRIMARY KEY (id),
  CONSTRAINT plan_exercises_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id),
  CONSTRAINT plan_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id)
);
```

## Table `wourkout_logs`

| Column  | Data Type | Description |
|---------|-----------|-------------|
| `id`      | `int`       | Primary Key
| `user_id` | `uuid`      | Who did the exercise?
| `plan_exercise_id` | `int` | Which plan did they do and what exercise in that plan?
| `exercise_id` | `int` | For freestyle exercise, can be NULL if you followed a plan
| `equipment_id` | `int` | What equipment were used? 
| `logged_at` | `timestampz` | When did they did the exercise?
| `total_sets_done` | `int` |
| `total_reps_done` | `int` | Sum of all the reps done per set
| `total_weight_lifted_kg` | `float` | 

<!-- Update this schema -->

```
CREATE TABLE public.workout_logs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  plan_exercise_id bigint NOT NULL,
  equipment_id bigint NOT NULL,
  logged_at timestamp with time zone NOT NULL DEFAULT now(),
  total_sets_done bigint NOT NULL,
  total_reps_done bigint NOT NULL,
  CONSTRAINT workout_logs_pkey PRIMARY KEY (id),
  CONSTRAINT workout_logs_user_plan_id_fkey FOREIGN KEY (user_plan_id) REFERENCES public.user_plans(id),
  CONSTRAINT workout_logs_plan_exercise_id_fkey FOREIGN KEY (plan_exercise_id) REFERENCES public.plan_exercises(id),
  CONSTRAINT workout_logs_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipments(id)
);
```

## Custom Types / Enums

### `difficulty`

`EASY` | `MEDIUM` | `HARD`

### `muscles`

`Chest` | `Back` | `Shoulders` | `Biceps` | `Triceps` | `Quads` | `Hamstrings` | `Glutes` | `Calves` | `Abs` | `Full Body`

## Row Level Security (RLS) Policies

### `equipments`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `All users can view equipments` | SELECT | public | PERMISSIVE | `true` | — |

### `plans`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `A user, based on id, can insert to plans` | INSERT | public | PERMISSIVE | — | `(( SELECT auth.uid() AS uid) = creator_id)` |
| `All users can view the plans` | SELECT | public | PERMISSIVE | `true` | — |

### `exercises`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `All users can view exercises` | SELECT | public | PERMISSIVE | `true` | — |

### `users`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Enable insert for users based on user_id` | INSERT | public | PERMISSIVE | — | `(( SELECT auth.uid() AS uid) = id)` |
| `Enable read access for all users` | SELECT | public | PERMISSIVE | `true` | — |

### `user_plans`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Enable insert for users based on user_id` | INSERT | public | PERMISSIVE | — | `(( SELECT auth.uid() AS uid) = user_id)` |
| `Enable users to view their own data only` | SELECT | authenticated | PERMISSIVE | `(( SELECT auth.uid() AS uid) = user_id)` | — |





