import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My App</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={() => console.log('Login button pressed')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupButton} onPress={() => console.log('Signup button pressed')}>
                    Sign up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    logo: {
        width: 128,
        height: 128,
        marginBottom: 32,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signupText: {
        marginTop: 10,
    },
    signupButton: {
        color: 'blue',
    },
});

export default LoginScreen;
