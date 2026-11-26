import { View, Text, Pressable, StyleSheet } from 'react-native'
import { styles, COLORS } from '../components/Styles'
import { Link } from 'expo-router'

export default function index() {
    return(
        <View style={[styles.center, {backgroundColor: COLORS.bg}]}>
            <Text style={styles.title}>Fitness App</Text>
            <Link href='/login' style={styles.primaryButton}>Login</Link>
            <Link href='/register' style={styles.primaryButton}>Register</Link>
        </View>
    )
}