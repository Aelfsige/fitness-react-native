import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { styles } from '../components/Styles'
import { supabase } from '../database/supabase'
import { signUp } from '../utils/functions'

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        setMessage('')
        
        if (!email || !password) {
            setMessage('Please fill up the missing fields.')
            return
        }

        const { data, error } = await signUp(email, password)

        if (error) {
            setMessage(error.message)
            setEmail('')
            setPassword('')
            return
        }

        if (data) {
            setMessage('User account confirmed')
            router.push('/home')
        }
    }

    return (
        <View style={styles.center}>
            <Text style={styles.title}>Register</Text>
            <View style={{ width: '100%', paddingBottom: 12 }}>
                <Text>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder='johndoe@email.com'
                    style={{ borderWidth: 1 }}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>
            <View style={{ width: '100%' }}>
                <Text>Password</Text>
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    style={{ borderWidth: 1 }}
                    secureTextEntry={true}
                />
            </View>
            <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={{ textAlign: 'center', color: '#fff' }}>Submit</Text>
            </Pressable>
            <View  style={{ width: '100%', flexDirection: 'row' }}>
                <Text>Already have an account? </Text>
                <Link href="/login" style={styles.link}>Login here</Link>
            </View>
            {message && <Text>{message}</Text>}
        </View>
    )
}

export default register