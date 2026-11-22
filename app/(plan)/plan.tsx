import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase";

const _layout = () => {

  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

export default _layout