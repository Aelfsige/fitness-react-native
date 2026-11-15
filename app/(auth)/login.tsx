import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { styles } from '../../components/Styles'
import { supabase } from '../../supabase/supabase'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        setMessage('')
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
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

    return (
        <View style={styles.center}>
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
            {message && <Text>{message}</Text>}
        </View>
    )
}

export default login