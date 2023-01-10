import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RightSidebar = ({ fullName, credit, onLogoutPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.fullNameText}>{fullName}</Text>
            <Text style={styles.creditText}>{credit}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    fullNameText: {
        fontSize: 18,
        marginBottom: 8,
    },
    creditText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 16,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 4,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RightSidebar;
