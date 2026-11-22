import { Stack } from 'expo-router'

const _layout = () => {

  return (
    <Stack>
      <Stack.Screen name='plans' />
      <Stack.Screen name='plan' />
    </Stack>
  )
}

export default _layout