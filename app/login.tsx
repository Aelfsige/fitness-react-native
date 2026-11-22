import { View, Text, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { styles } from '../components/Styles'
import { supabase } from '../database/supabase'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        setMessage('')
        const {data, error} = await supabase.auth.signInWithPassword({
            email: 'johndoe@gmail.com', // email.trim(),
            password: '12345678' // password
        })

        if (error) {
            setMessage(error.message)
            console.log(error.code, error.status)
            setEmail('')
            setPassword('')
            return
        }

        if (data) {
            setMessage('User account confirmed')
            router.push('/home')
        }
    }

    // for testing only
    useEffect(() => {
        handleSubmit()
    }, [])

    return (
        <View style={styles.center}>
            <Text style={styles.title}>Login</Text>
            <View style={{ width: '100%', paddingBottom: 12 }}>
                <Text>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder='johndoe@email.com'
                    placeholderTextColor={'#aaa'}
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
                <Text>No account yet? </Text>
                <Link href="/register" style={styles.link}>Register now</Link>
            </View>
            {message && <Text>{message}</Text>}
        </View>
    )
}

export default login