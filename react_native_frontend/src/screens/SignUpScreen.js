import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import app from '../configs/firebaseConfig';
import {getAuth, createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { StackActions } from '@react-navigation/native';
const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(app), email, password );
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`,
            });
            navigation.dispatch(StackActions.replace('Home'));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First name"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last name"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    Login
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
    errorText: {
        color: 'red',
        marginTop: 8,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    loginText: {
        marginTop: 10,
    },
    loginButton: {
        color: 'blue',
    }


});

export default SignUpScreen;
