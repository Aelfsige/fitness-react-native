import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function Hello() {
    const [greetings, setGreetings] = useState(true)

    return(
        <View style={styles.center}>
            <Text style={styles.title}>{greetings ? 'Hello world' : 'Bye world'}</Text>
            <Pressable 
                style={styles.btn}
                onPress={() => setGreetings(!greetings)}
            >
                <Text style={{ color: '#fff' }}>Press Me!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: '#ce1126',
    }
})